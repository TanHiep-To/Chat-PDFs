# Chat-PDFs

## Giới thiệu

Chat-PDFs là một ứng dụng kết hợp công nghệ chat và xử lý PDF, giúp người dùng tương tác với tài liệu PDF một cách dễ dàng và hiệu quả. Bạn có thể thực hiện các thao tác truy vấn, trích xuất dữ liệu và quản lý tài liệu PDF bằng cách sử dụng giao diện dựa trên ngôn ngữ tự nhiên.

## Hướng dẫn cài đặt và chạy

Để khởi chạy ứng dụng Chat-PDFs, bạn cần làm theo các bước sau:

### Terminal 1 (frontend)

```bash
cd frontend
npm install
npm run dev
```

### Terminal 2 (backend)

_Đảm bảo bạn đã tạo cơ sở dữ liệu có tên 'chat_pdf' trên PostgreSQL Server trước khi tiếp tục._

```bash
cd backend
npm install
npm run typeorm:generate
npm run typeorm:run
npm run dev
```

### Hướng dẫn đơn giản

1. **Cài đặt Frontend:**
   - Di chuyển vào thư mục frontend.
   - Cài đặt các dependency bằng lệnh `npm install`.
   - Chạy ứng dụng trong môi trường phát triển bằng lệnh `npm run dev`.

2. **Cài đặt Backend:**
   - Di chuyển vào thư mục backend.
   - Cài đặt các dependency bằng lệnh `npm install`.
   - Tạo migration cho cơ sở dữ liệu bằng lệnh `npm run typeorm:generate`.
   - Chạy migration để tạo cấu trúc bảng trong cơ sở dữ liệu bằng lệnh `npm run typeorm:run`.
   - Chạy server backend trong môi trường phát triển bằng lệnh `npm run dev`.

**Lưu ý:** Đảm bảo rằng PostgreSQL Server đã được cài đặt và cấu hình đúng, và có cơ sở dữ liệu có tên 'chat_pdf' trước khi chạy backend.
