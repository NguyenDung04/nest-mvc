# PROJECT_HANDOFF.md

## 1. Mục tiêu dự án
Backend mẫu cho hệ thống quản lý người dùng, danh mục và sản phẩm.

Tech stack:
- NestJS
- MySQL
- TypeORM
- HBS
- REST API
- JWT auth
- Role-based authorization
- Swagger
- Winston logger
- Rate limit
- Soft delete + restore
- Upload ảnh sản phẩm

## 2. Kiến trúc chính
Các module hiện có:
- AuthModule
- UsersModule
- CategoriesModule
- ProductsModule

Common/core:
- GlobalExceptionFilter
- TransformResponseInterceptor
- RequestLoggerMiddleware
- Winston config
- Response util chuẩn success/error
- DTO validation bằng ValidationPipe global

## 3. Database/domain
Các bảng chính:
- users
- categories
- products

Quan hệ:
- Category 1 - n Product

Role:
- enum trong users: admin, user

User có thêm:
- reset_password_token
- reset_password_expires_at
- deleted_at

Category có:
- deleted_at

Product có:
- deleted_at

## 4. Tính năng backend đã xong
### Auth
- register
- login
- forgot-password
- reset-password
- bcrypt hash password
- JWT sign access token

### Authorization
- JwtStrategy
- JwtAuthGuard
- @Roles()
- RolesGuard
- @Public()

### Users
- GET /api/users/me
- PATCH /api/users/me
- GET /api/users
- GET /api/users/:id
- PATCH /api/users/:id
- DELETE /api/users/:id
- POST /api/users/:id/restore

### Categories
- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PATCH /api/categories/:id
- DELETE /api/categories/:id
- POST /api/categories/:id/restore

### Products
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PATCH /api/products/:id
- DELETE /api/products/:id
- POST /api/products/:id/restore

### Products nâng cao
- pagination
- sort
- search keyword
- filter isActive
- filter categoryId
- upload ảnh bằng multer
- lưu file vào /public/uploads/products
- nếu không upload file thì có thể dùng image string/url

## 5. Business rules đã áp dụng
- email normalize lowercase
- slug normalize bằng util
- user không được đổi role qua update profile
- admin update user dùng DTO riêng
- admin không được tự xóa chính mình
- admin không được tự deactivate chính mình
- auth có rate limit:
  - register
  - login
  - forgot-password
  - reset-password
- soft delete cho users/categories/products
- có route restore cho users/categories/products

## 6. Common utils hiện có
- slug.util.ts
- string.util.ts
- query.util.ts
- file.util.ts

## 7. Logging / response / security
- Winston đã cấu hình
- Request logger middleware
- Global exception filter
- Response interceptor chuẩn hóa response
- RequestId / X-Request-Id nếu đã bật phần logging nâng cao
- Helmet
- CORS
- cookie-parser
- Throttler/rate limit
- SHOW_RESET_TOKEN_IN_RESPONSE dùng để ẩn token ở production

## 8. Swagger
Đã có Swagger và đã thêm decorator khá đầy đủ cho:
- AuthController
- UsersController
- CategoriesController
- ProductsController

DTO chính đã có @ApiProperty / @ApiPropertyOptional ở các phần quan trọng.

## 9. Upload ảnh product
Field file upload:
- key: file

Nếu gửi file:
- image sẽ lưu dạng /public/uploads/products/<filename>

Nếu không gửi file:
- có thể truyền image dạng string/url

Postman phải dùng:
- Body -> form-data
- file = File
- các field còn lại = Text

## 10. Soft delete
Đã định hướng:
- DELETE = soft delete
- POST :id/restore = restore

Repository dùng:
- softRemove / restore
- withDeleted khi cần restore

## 11. Những việc có thể làm tiếp
Ưu tiên tiếp theo:
1. Admin HBS views
   - /admin/users
   - /admin/categories
   - /admin/products

2. README / .env.example hoàn chỉnh

3. Health check
   - /health
   - db
   - redis

4. Redis thật sự
   - cache
   - otp/reset token
   - blacklist token nếu cần

5. Test tự động
   - unit test
   - e2e test

6. Refresh token / logout strategy nếu muốn auth nâng cao hơn

## 12. Lưu ý khi tiếp tục code ở chat mới
Khi mở chat mới, hãy nói:
- đây là project NestJS hiện tại
- đọc file PROJECT_HANDOFF.md này trước
- giữ nguyên kiến trúc hiện tại
- code tiếp theo style module/service/controller hiện có

## 13. Gợi ý prompt dùng ở chat mới
"Dưới đây là file handoff của project NestJS hiện tại. Hãy đọc kỹ và tiếp tục code đúng theo kiến trúc cũ, không phá cấu trúc hiện tại."

