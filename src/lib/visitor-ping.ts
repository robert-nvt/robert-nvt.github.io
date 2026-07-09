// Gửi 1 ping đến Cloudflare Worker khi có khách mở trang,
// Worker sẽ bắn thông báo Telegram. Xem workers/visitor-notify/README.md
// Điền URL worker sau khi deploy (vd: https://visitor-notify.<account>.workers.dev)
const WORKER_URL = "https://visitor-notify.robert-nvt.workers.dev";
// cho public vì ko cần bảo mật, ai cũng có thể ping worker này. Worker sẽ tự lọc spam.
export function pingVisitor() {
  if (!WORKER_URL) return;
  if (import.meta.env.DEV) return;

  // Mở trang 1 lần với ?owner=1 trên máy/điện thoại của bạn để
  // tự loại mình khỏi thông báo vĩnh viễn (lưu localStorage).
  if (new URLSearchParams(location.search).has("owner")) {
    localStorage.setItem("nvt-owner", "1");
  }
  if (localStorage.getItem("nvt-owner") === "1") return;

  // Chỉ báo 1 lần cho mỗi phiên xem, tránh spam khi khách chuyển trang.
  if (sessionStorage.getItem("nvt-pinged")) return;
  sessionStorage.setItem("nvt-pinged", "1");

  const payload = JSON.stringify({
    path: location.pathname + location.hash,
    referrer: document.referrer || "",
    ua: navigator.userAgent,
    screen: `${screen.width}x${screen.height}`,
    lang: navigator.language,
  });

  // Body dạng string -> request "simple", không cần CORS preflight.
  fetch(WORKER_URL, { method: "POST", body: payload, keepalive: true }).catch(() => {});
}
