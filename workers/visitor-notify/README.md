# Visitor Notify — thông báo Telegram khi có người xem portfolio

Web (GitHub Pages) gửi 1 ping → Cloudflare Worker → bot Telegram nhắn cho bạn.
Bot token nằm trong secret của Worker, KHÔNG nằm trong repo (repo public).

## 1. Tạo bot Telegram (2 phút)

1. Mở Telegram, chat với **@BotFather** → gửi `/newbot` → đặt tên → nhận **BOT_TOKEN** (dạng `123456:ABC-xyz...`).
2. Bấm vào link bot vừa tạo, gửi cho nó 1 tin nhắn bất kỳ (vd "hi").
3. Lấy **CHAT_ID**: mở trình duyệt
   `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
   → tìm `"chat":{"id":123456789,...}` — số đó là CHAT_ID.

## 2. Deploy Worker (miễn phí)

Cần tài khoản Cloudflare (free): https://dash.cloudflare.com/sign-up

```bash
cd workers/visitor-notify
npx wrangler login                 # mở trình duyệt xác thực
npx wrangler secret put BOT_TOKEN  # dán token của bot
npx wrangler secret put CHAT_ID    # dán chat id
npx wrangler deploy
```

Deploy xong sẽ in ra URL dạng:
`https://visitor-notify.<tên-account>.workers.dev`

## 3. Nối vào web

1. Mở `src/lib/visitor-ping.ts`, điền URL trên vào `WORKER_URL`.
2. Commit + push → GitHub Pages tự deploy.

## 4. Loại chính mình khỏi thông báo

Trên máy tính & điện thoại của bạn, mở trang 1 lần với:
`https://robert-nvt.github.io/?owner=1`
→ từ đó về sau bạn tự xem sẽ không bị báo nữa.

## Kiểm tra nhanh

- Test Worker trực tiếp:
  ```bash
  curl -X POST https://visitor-notify.<account>.workers.dev \
    -d '{"path":"/test","referrer":"curl"}'
  ```
  → Telegram phải nhận được tin nhắn.
- Mỗi khách chỉ báo 1 lần/phiên (sessionStorage), kèm: thời gian, thành phố/quốc gia (Cloudflare tự cung cấp), trang xem, nguồn truy cập, thiết bị.
