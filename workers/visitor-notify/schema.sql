-- Lời chúc trên cây lưu bút. Tạo bảng: npx wrangler d1 execute wedding-wishes --remote --file schema.sql
CREATE TABLE IF NOT EXISTS wishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  msg TEXT NOT NULL,
  ip TEXT,
  created_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS wishes_unique ON wishes (name, msg);
CREATE INDEX IF NOT EXISTS wishes_ip ON wishes (ip, created_at);
