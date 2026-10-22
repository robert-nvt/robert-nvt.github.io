// Cloudflare Worker: nhận ping từ portfolio và gửi thông báo Telegram.
// Secrets cần set: BOT_TOKEN, CHAT_ID (wrangler secret put ...)

const ALLOWED_ORIGINS = [
  "https://robert-nvt.github.io",
];

export default {
  async fetch(request, env) {
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
    const cf = request.cf || {};

    const time = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    // IP thật của người xem (Cloudflare gắn sẵn) + nhà mạng, vd "Viettel", "Amazon" (máy chủ/bot)
    const ip = request.headers.get("CF-Connecting-IP") || "?";
    const net = `🌐 IP: ${ip}${cf.asOrganization ? " · " + cf.asOrganization : ""}`;
    const where = `🌍 ${[cf.city, cf.region].filter(Boolean).join(", ") || "?"}, ${cf.country || "?"}`;

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

function sendTelegram(env, text) {
  return fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.CHAT_ID, text }),
  });
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
