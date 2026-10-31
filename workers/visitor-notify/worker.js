// Cloudflare Worker: nhận ping từ portfolio và gửi thông báo Telegram.
// Secrets cần set: BOT_TOKEN, CHAT_ID (wrangler secret put ...)
// Thêm cho thiệp cưới: /wishes lưu lời chúc vào D1 (binding DB) để mọi khách cùng thấy.

const ALLOWED_ORIGINS = [
  "https://robert-nvt.github.io",
];

// Trang được gửi lời chúc (đọc thì ai cũng đọc được, lời chúc vốn công khai)
const WISH_ORIGIN = /^(https:\/\/(www\.)?trixoan-wedding\.online|https:\/\/trixoan-wedding\.vercel\.app|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/;
const WISH_LIMIT = 300;        // số lời chúc mới nhất trả về
const WISH_RATE = 10;          // mỗi IP tối đa 10 lời chúc trong 10 phút (không thấp hơn: khách cùng Wi-Fi/nhà mạng dùng chung IP)
const WISH_RATE_MS = 10 * 60 * 1000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/wishes") return handleWishes(request, env, ctx);
    if (url.pathname === "/wishes/del") return handleWishDelete(request, env, url);

    const origin = request.headers.get("Origin") || "";
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return new Response("visitor-notify up", { headers: corsHeaders });
    }

    const data = await request.json().catch(() => ({}));
    const { time, where, net } = visitorInfo(request);

    // Thiệp cưới Trí & Xoan (wedding_web trên Vercel) dùng chung bot này
    if (data.site === "wedding") {
      const text = weddingMessage(data, time, where, net);
      if (!text) return new Response("unknown type", { status: 400, headers: corsHeaders });
      await sendTelegram(env, text);
      return new Response("ok", { headers: corsHeaders });
    }

    const lines = [
      "👀 Có người đang xem portfolio!",
      `🕒 ${time}`,
      where,
      net,
      `📄 Trang: ${data.path || "/"}`,
      `🔗 Nguồn: ${data.referrer || "trực tiếp"}`,
      `🖥 ${data.screen || "?"} · ${data.lang || "?"}`,
      `📱 ${shortUa(data.ua || "")}`,
    ];

    await sendTelegram(env, lines.join("\n"));

    return new Response("ok", { headers: corsHeaders });
  },
};

function visitorInfo(request) {
  const cf = request.cf || {};
  const time = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  // IP thật của người xem (Cloudflare gắn sẵn) + nhà mạng, vd "Viettel", "Amazon" (máy chủ/bot)
  const ip = request.headers.get("CF-Connecting-IP") || "?";
  const net = `🌐 IP: ${ip}${cf.asOrganization ? " · " + cf.asOrganization : ""}`;
  const where = `🌍 ${[cf.city, cf.region].filter(Boolean).join(", ") || "?"}, ${cf.country || "?"}`;
  return { time, where, net, ip };
}

function sendTelegram(env, text) {
  return fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.CHAT_ID, text, link_preview_options: { is_disabled: true } }),
  });
}

// GET: danh sách lời chúc mới nhất trước. POST: treo lời chúc mới, báo Telegram kèm link xoá.
async function handleWishes(request, env, ctx) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
  const json = (body, status = 200) => Response.json(body, { status, headers });

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method === "GET") {
    const { results } = await env.DB
      .prepare("SELECT id, name, msg FROM wishes ORDER BY id DESC LIMIT ?")
      .bind(WISH_LIMIT).all();
    return json(results);
  }
  if (request.method !== "POST") return json({ error: "method" }, 405);
  if (!WISH_ORIGIN.test(request.headers.get("Origin") || "")) return json({ error: "origin" }, 403);

  const data = await request.json().catch(() => ({}));
  const clip = (v, n) => String(v || "").trim().slice(0, n);
  const name = clip(data.name, 60), msg = clip(data.msg, 1000);
  if (!name || !msg) return json({ error: "empty" }, 400);

  const info = visitorInfo(request);
  const now = Date.now();
  const recent = await env.DB
    .prepare("SELECT COUNT(*) AS n FROM wishes WHERE ip = ? AND created_at > ?")
    .bind(info.ip, now - WISH_RATE_MS).first("n");
  if (recent >= WISH_RATE) return json({ error: "rate" }, 429);

  // Trùng tên + nội dung (bấm 2 lần, gửi lại từ máy khách) thì bỏ qua
  const row = await env.DB
    .prepare("INSERT INTO wishes (name, msg, ip, created_at) VALUES (?, ?, ?, ?) ON CONFLICT (name, msg) DO NOTHING RETURNING id")
    .bind(name, msg, info.ip, now).first();
  if (!row) return json({ ok: true, duplicate: true });

  const link = `${new URL(request.url).origin}/wishes/del?id=${row.id}&sig=${await signWish(env, row.id)}`;
  const text = weddingMessage({ ...data, type: "wish", name, msg }, info.time, info.where, info.net);
  ctx.waitUntil(sendTelegram(env, `${text}\n🗑 Xoá lời chúc này: ${link}`));
  return json({ ok: true, id: row.id }, 201);
}

// Link xoá trong Telegram: GET chỉ hiện trang xác nhận (bot xem trước link không xoá nhầm), POST mới xoá
async function handleWishDelete(request, env, url) {
  const id = parseInt(url.searchParams.get("id"), 10);
  const page = (body, status = 200) => new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Xoá lời chúc</title>` +
    `<body style="font:17px/1.5 system-ui;max-width:420px;margin:40px auto;padding:0 20px">${body}`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
  if (!id || !sameText(url.searchParams.get("sig") || "", await signWish(env, id))) return page("Link không hợp lệ.", 403);

  if (request.method === "POST") {
    await env.DB.prepare("DELETE FROM wishes WHERE id = ?").bind(id).run();
    return page("Đã xoá lời chúc khỏi cây lưu bút.");
  }
  const wish = await env.DB.prepare("SELECT name, msg FROM wishes WHERE id = ?").bind(id).first();
  if (!wish) return page("Lời chúc này đã được xoá rồi.");
  return page(
    `<p><b>${escapeHtml(wish.name)}</b></p><p>${escapeHtml(wish.msg)}</p>` +
    `<form method="post"><button style="font:inherit;padding:10px 20px">Xoá lời chúc này</button></form>`,
  );
}

async function signWish(env, id) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(env.BOT_TOKEN), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(`wish-del:${id}`));
  return [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function sameText(a, b) {
  const encoder = new TextEncoder();
  const x = encoder.encode(a), y = encoder.encode(b);
  return x.length === y.length && crypto.subtle.timingSafeEqual(x, y);
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
}

// Tin nhắn cho thiệp cưới: type "visit" (có người mở thiệp), "rsvp" (xác nhận tham dự + số người), "wish" (lời chúc mới)
function weddingMessage(data, time, where, net) {
  const clip = (v, n) => String(v || "").trim().slice(0, n);
  const invited = clip(data.invited, 80);
  const device = `📱 ${shortUa(clip(data.ua, 400))}`;
  if (data.type === "visit") {
    return [
      "👀 Có người mở thiệp cưới!",
      `🕒 ${time}`,
      invited && `💌 Link của: ${invited}`,
      where,
      net,
      `🔗 Nguồn: ${clip(data.referrer, 200) || "trực tiếp"}`,
      `🖥 ${clip(data.screen, 20) || "?"} · ${clip(data.lang, 20) || "?"}`,
      device,
    ].filter(Boolean).join("\n");
  }
  if (data.type === "rsvp") {
    const going = data.attend === "yes";
    const guests = Math.max(0, Math.min(99, parseInt(data.guests, 10) || 0));
    return [
      going ? "✅ Xác nhận sẽ tham dự!" : "❌ Báo không tham dự được",
      `👤 ${clip(data.name, 80) || "?"}`,
      going && `👥 Số người: ${guests || 1}`,
      invited && `🔗 Link của: ${invited}`,
      `🕒 ${time}`,
      where,
      net,
      device,
    ].filter(Boolean).join("\n");
  }
  if (data.type === "wish") {
    return [
      "💌 Lời chúc mới trên cây lưu bút!",
      `👤 ${clip(data.name, 80) || "?"}`,
      `💬 ${clip(data.msg, 1000) || "?"}`,
      invited && `🔗 Link của: ${invited}`,
      `🕒 ${time}`,
      where,
      net,
      device,
    ].filter(Boolean).join("\n");
  }
  return "";
}

function shortUa(ua) {
  const os = /Android/i.test(ua) ? "Android"
    : /iPhone|iPad/i.test(ua) ? "iOS"
    : /Windows/i.test(ua) ? "Windows"
    : /Mac OS/i.test(ua) ? "macOS"
    : /Linux/i.test(ua) ? "Linux" : "?";
  // Mở trong ứng dụng (Zalo, Messenger…) thì ghi tên ứng dụng thay cho trình duyệt
  const app = /Zalo/i.test(ua) ? "Zalo"
    : /Messenger|FB_IAB\/MESSENGER/i.test(ua) ? "Messenger"
    : /FBAN|FBAV|FB_IAB/i.test(ua) ? "Facebook"
    : /Instagram/i.test(ua) ? "Instagram"
    : /TikTok|musical_ly/i.test(ua) ? "TikTok" : "";
  const browser = /Edg\//.test(ua) ? "Edge"
    : /CriOS|Chrome\//.test(ua) ? "Chrome"
    : /Safari\//.test(ua) ? "Safari"
    : /Firefox\//.test(ua) ? "Firefox" : "?";
  return `${os} · ${app || browser}`;
}
