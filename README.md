# README Final - NestJS Backend + HBS Frontend

## 1. Giới thiệu dự án

Dự án này là hệ thống mẫu xây dựng bằng **NestJS + MySQL + TypeORM + HBS + Tailwind CSS + Flowbite**.

Hệ thống kết hợp hai phần chính:

- **Backend REST API**: xử lý xác thực, phân quyền, quản lý người dùng, danh mục và sản phẩm.
- **Frontend server-side rendering bằng HBS**: chia giao diện thành 3 khu vực rõ ràng gồm `auth`, `client`, `admin`, đồng thời có các partial dùng chung.

Mục tiêu của dự án là tạo một nền tảng backend + frontend nhỏ gọn, dễ mở rộng, phù hợp cho bài tập lớn, đồ án, demo hoặc MVP quản lý sản phẩm.

---

## 2. Công nghệ sử dụng

### Backend

- NestJS
- MySQL
- TypeORM
- REST API
- JWT Authentication
- Role-based Authorization
- Swagger API Docs
- Winston Logger
- Throttler Rate Limit
- Multer Upload File
- Soft Delete / Restore
- Helmet
- CORS
- Cookie Parser

### Frontend

- HBS / Handlebars
- Server-side rendering trong NestJS
- Tailwind CSS CDN
- Flowbite CDN
- Font Awesome CDN
- JavaScript Fetch API
- Responsive layout
- Toast notification dùng chung

---

## 3. Kiến trúc tổng quan

```text
src/
├── common/
│   ├── constants/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── logger/
│   ├── middleware/
│   └── utils/
│
├── config/
│
├── database/
│   ├── migrations/
│   └── data-source.ts
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── categories/
│   └── products/
│
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── auth/
│   ├── client/
│   ├── admin/
│   └── errors/
│
├── web/
│   ├── auth.controller.ts
│   ├── client.controller.ts
│   ├── admin.controller.ts
│   └── web.module.ts
│
└── main.ts

public/
└── uploads/
    └── products/
```

---

## 4. Backend hiện có

### 4.1. Auth

Các chức năng xác thực:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

Chức năng đã có:

- Đăng ký tài khoản
- Đăng nhập bằng email và password
- Hash password bằng bcrypt
- Sinh JWT access token
- Lưu JWT vào cookie `access_token` khi login từ HBS
- Đọc JWT từ cookie hoặc Authorization Bearer token
- Quên mật khẩu
- Đặt lại mật khẩu
- Rate limit cho auth

### 4.2. Users

```text
GET    /api/users/me
PATCH  /api/users/me
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
POST   /api/users/:id/restore
```

Ghi chú:

- `GET /api/users/me` dùng cho trang profile client.
- `PATCH /api/users/me` cho phép người dùng cập nhật thông tin cá nhân.
- Admin có quyền xem, sửa, xóa mềm và khôi phục người dùng.
- Admin không được tự xóa hoặc tự khóa chính mình.

### 4.3. Categories

```text
GET    /api/categories
GET    /api/categories/:id
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
POST   /api/categories/:id/restore
```

Ghi chú:

- Danh mục có hỗ trợ soft delete.
- Có route restore.
- Category có quan hệ 1 - n với Product.

### 4.4. Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
POST   /api/products/:id/restore
```

Products hỗ trợ:

- Pagination
- Sort
- Search keyword
- Filter `isActive`
- Filter `categoryId`
- Upload ảnh bằng Multer
- Lưu file vào `public/uploads/products`
- Có thể dùng ảnh dạng URL string nếu không upload file
- Soft delete và restore

---

## 5. Frontend HBS hiện có

Frontend được chia thành 3 khu vực chính:

```text
auth
client
admin
```

Ngoài ra có khu dùng chung:

```text
layouts
partials/shared
errors
```

---

## 6. Cấu trúc views

```text
src/views/
├── layouts/
│   ├── auth.hbs
│   ├── client.hbs
│   └── admin.hbs
│
├── partials/
│   ├── shared/
│   │   ├── head.hbs
│   │   ├── scripts.hbs
│   │   ├── toast.hbs
│   │   ├── flash.hbs
│   │   └── empty-state.hbs
│   │
│   ├── auth/
│   │   └── auth-brand.hbs
│   │
│   ├── client/
│   │   ├── client-header.hbs
│   │   └── client-footer.hbs
│   │
│   └── admin/
│       ├── admin-sidebar.hbs
│       ├── admin-topbar.hbs
│       └── admin-footer.hbs
│
├── auth/
│   ├── login.hbs
│   ├── register.hbs
│   ├── forgot-password.hbs
│   └── reset-password.hbs
│
├── client/
│   ├── home.hbs
│   ├── products.hbs
│   ├── product-detail.hbs
│   └── profile.hbs
│
├── admin/
│   ├── dashboard.hbs
│   ├── users/
│   │   └── index.hbs
│   ├── categories/
│   │   └── index.hbs
│   └── products/
│       └── index.hbs
│
└── errors/
    ├── 404.hbs
    └── 500.hbs
```

---

## 7. Layout frontend

### 7.1. Auth layout

File:

```text
src/views/layouts/auth.hbs
```

Dùng cho:

```text
/auth/login
/auth/register
/auth/forgot-password
/auth/reset-password
```

Đặc điểm:

- Layout riêng cho khu xác thực.
- Có phần branding bên trái trên desktop.
- Có form ở bên phải.
- Dùng chung toast, scripts, head.
- Responsive trên mobile.

### 7.2. Client layout

File:

```text
src/views/layouts/client.hbs
```

Dùng cho:

```text
/
/products
/products/:id
/profile
/errors/404
/errors/500
```

Đặc điểm:

- Có client header.
- Có client footer.
- Main content dùng `flex-1` để footer nằm cuối trang.
- Có script toggle mobile menu.
- Có hàm logout client dùng chung.

### 7.3. Admin layout

File:

```text
src/views/layouts/admin.hbs
```

Dùng cho:

```text
/admin
/admin/users
/admin/categories
/admin/products
```

Đặc điểm:

- Có sidebar cố định.
- Có topbar.
- Có footer admin.
- Có overlay cho mobile sidebar.
- Nội dung admin có max width lớn, phù hợp dashboard.
- Route admin được bảo vệ bằng JWT guard và Roles guard.

---

## 8. Route HBS hiện có

### Auth views

```text
GET /auth/login
GET /auth/register
GET /auth/forgot-password
GET /auth/reset-password
```

### Client views

```text
GET /
GET /products
GET /products/:id
GET /profile
```

### Admin views

```text
GET /admin
GET /admin/users
GET /admin/categories
GET /admin/products
```

### Error views

```text
GET /errors/404
GET /errors/500
```

---

## 9. Luồng đăng nhập HBS

Luồng đăng nhập hiện tại:

```text
Người dùng mở /auth/login
        ↓
Form login gọi POST /api/auth/login
        ↓
Backend kiểm tra email/password
        ↓
Backend tạo JWT accessToken
        ↓
Backend set cookie access_token
        ↓
Frontend kiểm tra role
        ↓
Nếu role = admin → chuyển sang /admin
Nếu role = user  → chuyển sang /
```

Cookie được set:

```text
access_token
```

Cấu hình cookie:

```text
httpOnly: true
sameSite: lax
secure: false trong development
path: /
maxAge: 1 ngày
```

JWT Strategy đọc token từ hai nguồn:

```text
1. Cookie access_token
2. Authorization: Bearer <token>
```

Vì vậy:

- Trình duyệt HBS dùng cookie.
- Swagger/Postman vẫn có thể dùng Bearer token.

---

## 10. API prefix và route render

API dùng prefix:

```text
/api
```

Ví dụ:

```text
/api/auth/login
/api/products
/api/categories
/api/users/me
```

Route HBS không dùng prefix `/api`:

```text
/auth/login
/products
/admin
```

Trong `main.ts`, cần cấu hình `setGlobalPrefix` chỉ exclude các route GET render view, không exclude POST API.

Ví dụ:

```ts
app.setGlobalPrefix(apiPrefix, {
  exclude: [
    { path: '/', method: RequestMethod.GET },
    { path: 'auth/login', method: RequestMethod.GET },
    { path: 'auth/register', method: RequestMethod.GET },
    { path: 'auth/forgot-password', method: RequestMethod.GET },
    { path: 'auth/reset-password', method: RequestMethod.GET },
    { path: 'admin', method: RequestMethod.GET },
    { path: 'admin/(.*)', method: RequestMethod.GET },
    { path: 'health', method: RequestMethod.GET },
    { path: 'docs', method: RequestMethod.GET },
    { path: 'docs-json', method: RequestMethod.GET },
    { path: 'favicon.ico', method: RequestMethod.GET },
  ],
});
```

Lưu ý quan trọng:

Không exclude rộng kiểu:

```text
/auth/(.*)
```

vì sẽ làm `POST /api/auth/login` bị lệch thành `POST /auth/login`.

---

## 11. Cấu hình HBS trong main.ts

Các phần quan trọng trong `main.ts`:

```ts
app.useStaticAssets(join(process.cwd(), 'public'), {
  prefix: '/public/',
});

const viewsDir = join(process.cwd(), 'src', 'views');

app.setBaseViewsDir(viewsDir);
app.setViewEngine('hbs');

hbs.registerPartials(join(viewsDir, 'partials', 'shared'));
hbs.registerPartials(join(viewsDir, 'partials', 'auth'));
hbs.registerPartials(join(viewsDir, 'partials', 'client'));
hbs.registerPartials(join(viewsDir, 'partials', 'admin'));
```

Nếu dùng package `hbs`, import an toàn nhất:

```ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hbs = require('hbs');
```

---

## 12. Shared partials

### `head.hbs`

Chứa:

- Meta charset
- Viewport
- Title
- Google Font Inter
- Tailwind CDN
- Tailwind config
- Flowbite CSS
- Font Awesome CSS
- Một số CSS helper như `line-clamp-1`, `line-clamp-2`, `line-clamp-3`

### `scripts.hbs`

Chứa:

- Flowbite JS
- Hàm `showToast(message, type)` dùng chung

### `toast.hbs`

Chứa container:

```html
<div id="toast-container"></div>
```

### `empty-state.hbs`

Partial dùng cho các trạng thái không có dữ liệu.

---

## 13. Các trang auth

### 13.1. Login

File:

```text
src/views/auth/login.hbs
```

Chức năng:

- Nhập email và password.
- Gọi `POST /api/auth/login`.
- Nhận response dạng chuẩn.
- Backend tự set cookie `access_token`.
- Nếu role là `admin`, chuyển sang `/admin`.
- Nếu role là `user`, chuyển sang `/`.

Tài khoản test admin:

```text
email: admin1@example.com
password: 123456
```

### 13.2. Register

File:

```text
src/views/auth/register.hbs
```

Chức năng:

- Nhập username, email, password, confirm password.
- Kiểm tra password nhập lại ở client.
- Gọi `POST /api/auth/register`.
- Đăng ký thành công thì chuyển về `/auth/login`.

### 13.3. Forgot Password

File:

```text
src/views/auth/forgot-password.hbs
```

Chức năng:

- Nhập email.
- Gọi `POST /api/auth/forgot-password`.
- Nếu development bật `SHOW_RESET_TOKEN_IN_RESPONSE=true`, có thể hiển thị token để test.
- Có nút copy token.
- Có link chuyển sang `/auth/reset-password?token=...`.

### 13.4. Reset Password

File:

```text
src/views/auth/reset-password.hbs
```

Chức năng:

- Nhận token từ query string nếu có.
- Nhập mật khẩu mới.
- Nhập lại mật khẩu mới.
- Gọi `POST /api/auth/reset-password`.
- Thành công thì chuyển về `/auth/login`.

---

## 14. Các trang client

### 14.1. Home

File:

```text
src/views/client/home.hbs
```

Nội dung:

- Hero section giới thiệu hệ thống.
- Nút xem sản phẩm.
- Nút đăng nhập.
- Các card giới thiệu module.
- Preview giao diện sản phẩm.

### 14.2. Products

File:

```text
src/views/client/products.hbs
```

Chức năng:

- Gọi `GET /api/products`.
- Gọi `GET /api/categories`.
- Render danh sách sản phẩm dạng card.
- Search sản phẩm phía client.
- Filter theo category.
- Hiển thị skeleton loading.
- Hiển thị empty state nếu không có sản phẩm.
- Click sản phẩm chuyển sang `/products/:id`.

### 14.3. Product Detail

File:

```text
src/views/client/product-detail.hbs
```

Chức năng:

- Nhận `productId` từ controller.
- Gọi `GET /api/products/:id`.
- Render ảnh, tên, giá, mô tả, danh mục, trạng thái.
- Có skeleton loading.
- Có error state nếu sản phẩm không tồn tại.

### 14.4. Profile

File:

```text
src/views/client/profile.hbs
```

Chức năng:

- Gọi `GET /api/users/me`.
- Hiển thị thông tin tài khoản.
- Gọi `PATCH /api/users/me` để cập nhật username/email.
- Gọi `POST /api/auth/logout` để đăng xuất.
- Nếu chưa đăng nhập hoặc token hết hạn thì hiện error state.

---

## 15. Các trang admin

Admin routes yêu cầu:

```text
JwtAuthGuard
RolesGuard
@Roles(UserRole.ADMIN)
```

### 15.1. Dashboard

File:

```text
src/views/admin/dashboard.hbs
```

Nội dung:

- Card thống kê tổng quan.
- Khu vực dashboard admin.
- Có thể mở rộng để gọi API thống kê.

### 15.2. Users

File:

```text
src/views/admin/users/index.hbs
```

UI hiện có:

- Header quản lý người dùng.
- Card thống kê tổng người dùng, admin, active, locked/deleted.
- Filter theo keyword, role, status.
- Bảng user mẫu.
- Nút xem, sửa, khóa, xóa.

API dự kiến dùng:

```text
GET /api/users
PATCH /api/users/:id
DELETE /api/users/:id
POST /api/users/:id/restore
```

### 15.3. Categories

File:

```text
src/views/admin/categories/index.hbs
```

UI hiện có:

- Header quản lý danh mục.
- Card thống kê tổng danh mục, active, deleted.
- Search và filter trạng thái.
- Bảng category mẫu.
- Nút thêm danh mục.
- Nút sửa/xóa.

API dự kiến dùng:

```text
GET /api/categories
POST /api/categories
PATCH /api/categories/:id
DELETE /api/categories/:id
POST /api/categories/:id/restore
```

### 15.4. Products

File:

```text
src/views/admin/products/index.hbs
```

UI hiện có:

- Header quản lý sản phẩm.
- Card thống kê tổng sản phẩm, đang bán, tạm ẩn, deleted.
- Search.
- Filter category.
- Filter status.
- Bảng product mẫu.
- Nút thêm sản phẩm.
- Nút xem/sửa/xóa.

API dự kiến dùng:

```text
GET /api/products
POST /api/products
PATCH /api/products/:id
DELETE /api/products/:id
POST /api/products/:id/restore
```

---

## 16. Upload ảnh sản phẩm

Thư mục lưu ảnh:

```text
public/uploads/products
```

Đường dẫn truy cập public:

```text
/public/uploads/products/<filename>
```

Khi gọi API tạo hoặc sửa sản phẩm bằng Postman:

```text
Body -> form-data
```

Field upload file:

```text
file
```

Nếu không upload file, có thể truyền field:

```text
image
```

với giá trị là URL ảnh.

---

## 17. Response format chuẩn

### Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Đăng nhập thành công",
  "data": {
    "user": {},
    "accessToken": "jwt-token"
  },
  "meta": {
    "timestamp": "2026-04-24T00:00:00.000Z",
    "path": "/api/auth/login"
  }
}
```

### Error

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized",
  "errors": null,
  "path": "/api/example",
  "timestamp": "2026-04-24T00:00:00.000Z",
  "requestId": "uuid"
}
```

---

## 18. Environment

Tạo file:

```text
.env.development
```

Ví dụ:

```env
APP_NAME=nest-mvc
NODE_ENV=development
APP_HOST=0.0.0.0
APP_PORT=8080
APP_URL=http://localhost:8080
API_PREFIX=api

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=nest_mvc_dev
DB_LOGGING=false

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
COOKIE_SECRET=your_cookie_secret
CSRF_SECRET=your_csrf_secret

ENABLE_SWAGGER=true
ENABLE_HELMET=true
ENABLE_CORS=true
ENABLE_CSRF=false

CORS_ORIGIN=http://localhost:8080,http://localhost:3001

THROTTLE_TTL=60
THROTTLE_LIMIT=20

SHOW_RESET_TOKEN_IN_RESPONSE=true
```

---

## 19. Cài đặt và chạy project

### 19.1. Cài package

```bash
npm install
```

### 19.2. Tạo database

```sql
CREATE DATABASE nest_mvc_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 19.3. Chạy migration

```bash
npm run migration:run
```

### 19.4. Chạy project development

```bash
npm run start:dev
```

Nếu `package.json` có script `dev`, có thể chạy:

```bash
npm run dev
```

Tuy nhiên với NestJS, lệnh thường dùng là:

```bash
npm run start:dev
```

---

## 20. Các URL kiểm tra nhanh

### Frontend HBS

```text
http://localhost:8080/
http://localhost:8080/auth/login
http://localhost:8080/auth/register
http://localhost:8080/auth/forgot-password
http://localhost:8080/auth/reset-password
http://localhost:8080/products
http://localhost:8080/profile
http://localhost:8080/admin
http://localhost:8080/admin/users
http://localhost:8080/admin/categories
http://localhost:8080/admin/products
http://localhost:8080/errors/404
http://localhost:8080/errors/500
```

### Swagger

```text
http://localhost:8080/docs
```

### API

```text
http://localhost:8080/api/auth/login
http://localhost:8080/api/users/me
http://localhost:8080/api/categories
http://localhost:8080/api/products
```

---

## 21. Tài khoản test

### Admin

```text
email: admin1@example.com
password: 123456
```

### User

```text
email: user1@example.com
password: 123456
```

Lưu ý: nếu đã test reset password thì mật khẩu thực tế có thể đã thay đổi.

---

## 22. Một số lỗi thường gặp

### 22.1. `Cannot POST /api/auth/login`

Nguyên nhân thường do exclude route trong `setGlobalPrefix` quá rộng.

Không nên exclude:

```text
/auth/(.*)
```

Chỉ nên exclude các route GET render view.

### 22.2. `/` bị trả JSON 401

Nguyên nhân thường do `AppController` đang chiếm route `/` và bị guard chặn.

Cách xử lý:

- Tắt route `/` trong `AppController`.
- Hoặc chuyển `AppController` sang `/ping`.
- Để `WebClientController` quản lý `/`.

### 22.3. `/admin` vẫn 401 sau khi login

Kiểm tra:

```text
1. Cookie access_token đã được set chưa?
2. JwtStrategy đã đọc token từ cookie chưa?
3. User có role admin không?
4. Token có hết hạn không?
```

### 22.4. `hbs.registerPartials is not a function`

Dùng import CommonJS:

```ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hbs = require('hbs');
```

### 22.5. Icon hoặc Tailwind không hiển thị

Kiểm tra file:

```text
src/views/partials/shared/head.hbs
```

Cần có:

```html
<script src="https://cdn.tailwindcss.com"></script>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.2/flowbite.min.css"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
/>
```

---

## 23. Quy tắc bảo mật đã áp dụng

- JWT authentication
- Role-based authorization
- Guard cho route admin
- `@Public()` cho route public
- Helmet
- CORS
- Rate limit cho auth
- ValidationPipe global
- DTO validation
- Cookie httpOnly cho JWT khi dùng HBS
- Soft delete thay vì xóa cứng
- Admin không được tự khóa hoặc tự xóa chính mình

---

## 24. Gợi ý phát triển tiếp

### Frontend

- Nối API thật cho admin categories.
- Nối API thật cho admin products.
- Nối API thật cho admin users.
- Thêm modal tạo/sửa/xóa bằng Flowbite.
- Thêm phân trang cho bảng admin.
- Thêm confirm dialog khi xóa.
- Thêm loading skeleton khi gọi API.
- Thêm active menu theo route hiện tại.

### Backend

- Thêm refresh token.
- Thêm logout strategy nâng cao.
- Thêm Redis blacklist token.
- Thêm Health check DB/Redis.
- Thêm unit test.
- Thêm e2e test.
- Thêm audit log cho admin.
- Thêm upload cloud storage.

---

## 25. Trạng thái hiện tại

Dự án hiện tại đã có nền tảng đầy đủ:

- Backend REST API hoạt động.
- Auth JWT hoạt động.
- Role admin/user hoạt động.
- Swagger hoạt động.
- Upload ảnh sản phẩm hoạt động.
- FE HBS đã chia khu rõ ràng: `auth`, `client`, `admin`.
- Layout riêng cho từng khu.
- Shared partials dùng chung.
- Login HBS đã nối API thật và lưu JWT bằng cookie.
- Client products/profile/product detail đã có UI và gọi API.
- Admin users/categories/products đã có UI khung để nối API tiếp.

Dự án phù hợp để tiếp tục hoàn thiện thành một hệ thống quản lý sản phẩm hoàn chỉnh.

## Tác giả

- Họ và tên: Nguyễn Trí Dũng
- Vai trò: Sinh viên / Backend Developer
- Phụ trách: Phân tích, thiết kế và xây dựng hệ thống NestJS MVC kết hợp REST API
- Công nghệ chính: NestJS, MySQL, TypeORM, HBS, Tailwind CSS, Flowbite, JWT

## Thông tin dự án

- Tên dự án: NestJS MVC Management System
- Mục đích: Xây dựng hệ thống quản lý người dùng, danh mục và sản phẩm
- Kiến trúc: MVC kết hợp REST API
- Giao diện: Server-side rendering bằng HBS
- Backend: NestJS
- Database: MySQL
- ORM: TypeORM
- Authentication: JWT
- Authorization: Role-based access control

## Bản quyền

Dự án được xây dựng phục vụ mục đích học tập, thực hành và làm đồ án.

Copyright © 2026 Dũng Nguyễn. All rights reserved.

## Ghi chú

Dự án hiện đang ở mức demo/MVP, phù hợp cho học tập, bài tập lớn hoặc làm nền tảng mở rộng thêm các chức năng thực tế như refresh token, Redis, health check, test tự động và dashboard thống kê nâng cao.
