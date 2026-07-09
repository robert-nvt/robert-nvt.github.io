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
    const lines = [
      "👀 Có người đang xem portfolio!",
      `🕒 ${time}`,
      `🌍 ${cf.city || "?"}, ${cf.country || "?"}`,
      `📄 Trang: ${data.path || "/"}`,
      `🔗 Nguồn: ${data.referrer || "trực tiếp"}`,
      `🖥 ${data.screen || "?"} · ${data.lang || "?"}`,
      `📱 ${shortUa(data.ua || "")}`,
    ];

    await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text: lines.join("\n") }),
    });

    return new Response("ok", { headers: corsHeaders });
  },
};

function shortUa(ua) {
  const os = /Android/i.test(ua) ? "Android"
    : /iPhone|iPad/i.test(ua) ? "iOS"
    : /Windows/i.test(ua) ? "Windows"
    : /Mac OS/i.test(ua) ? "macOS"
    : /Linux/i.test(ua) ? "Linux" : "?";
  const browser = /Edg\//.test(ua) ? "Edge"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Safari\//.test(ua) ? "Safari"
    : /Firefox\//.test(ua) ? "Firefox" : "?";
  return `${os} · ${browser}`;
}
