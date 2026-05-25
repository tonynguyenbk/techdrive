# TechDrive Publisher — Google Docs → Strapi

Script tự động đẩy bài viết từ Google Docs lên Strapi CMS với một click.

## Cài đặt một lần

### Bước 1: Tạo Google Doc template

Tạo một Google Doc mới → đặt tên "TechDrive Publisher" → giữ link lại.
Đây sẽ là doc bạn paste kết quả từ AI vào mỗi lần viết bài.

### Bước 2: Gắn Apps Script vào Google Doc

1. Mở Google Doc → **Extensions → Apps Script**
2. Xoá code mặc định, paste toàn bộ nội dung file `Code.gs`
3. Đặt tên project: "TechDrive Publisher"
4. Nhấn **Save** (Ctrl+S)

### Bước 3: Tạo Strapi API Token

1. Vào `https://techdrive-strapi.onrender.com/dashboard`
2. **Settings → API Tokens → Create new API Token**
3. Name: "Google Docs Publisher"
4. Token type: **Custom**
5. Permissions: Articles → **create**, **update**
6. Copy token (chỉ hiện một lần)

### Bước 4: Cấu hình Script Properties

1. Trong Apps Script → **Project Settings** (bánh răng bên trái)
2. Cuộn xuống **Script Properties → Add script property**
3. Thêm:
   - Property: `STRAPI_TOKEN`
   - Value: [paste API token vừa tạo]
4. **Save script properties**

### Bước 5: Chạy setup lần đầu

1. Trong Apps Script → chọn function `onOpen` → **Run**
2. Cấp quyền khi được hỏi (Google account của bạn)
3. Quay lại Google Doc → reload → thấy menu **TechDrive** xuất hiện ✅

---

## Cách dùng hàng ngày

### Workflow viết bài tin tức

```
1. Mở prompt template: tools/prompts/tin-tuc.md
2. Điền thông tin bài viết → copy prompt vào Claude
3. Copy toàn bộ output của Claude → paste vào Google Doc
4. Google Doc → TechDrive → Preview Parsed Fields (kiểm tra)
5. TechDrive → Publish to Strapi (Draft)
6. Mở Strapi dashboard → thêm ảnh bìa → Review → Publish
```

### Workflow viết đánh giá xe

```
1. Mở prompt template: tools/prompts/danh-gia.md
2. Điền thông số xe + cảm nhận thực tế → copy vào Claude
3. Copy output → Google Doc → TechDrive → Publish
4. Trong Strapi: thêm ảnh gallery + xe liên quan (related_cars)
```

---

## Format output của AI

Script đọc các field theo format:

```
**TITLE_VI:** Tiêu đề bài viết ở đây

**EXCERPT_VI:** Tóm tắt ngắn 150-160 ký tự

**TAGS:** tag1, tag2, tag3

**CATEGORY:** news

**CONTENT_VI:**
## Heading 1

Nội dung đoạn đầu...

## Heading 2

Nội dung tiếp theo...
```

Các field hỗ trợ:

| Field | Mô tả | Bắt buộc |
|-------|-------|----------|
| TITLE_VI | Tiêu đề tiếng Việt (max 200 ký tự) | ✅ |
| EXCERPT_VI | Mô tả ngắn (max 500 ký tự) | Nên có |
| TAGS | Tags phân cách bằng dấu phẩy | Nên có |
| CATEGORY | news / review / comparison / advice / video | Nên có |
| CONTENT_VI | Nội dung bài (markdown → HTML tự động) | ✅ |
| META_TITLE | SEO title (max 60 ký tự) | |
| META_DESCRIPTION | SEO description (max 160 ký tự) | |
| READING_TIME | Thời gian đọc (phút) | |
| VERDICT_VI | Kết luận ngắn (chỉ cho review) | |
| PROS | Điểm mạnh, mỗi dòng 1 điểm | |
| CONS | Điểm yếu, mỗi dòng 1 điểm | |
| SCORE | Điểm tổng (0-10) | |
| SCORE_DESIGN | Điểm thiết kế | |
| SCORE_PERFORMANCE | Điểm vận hành | |
| SCORE_COMFORT | Điểm thoải mái | |
| SCORE_TECH | Điểm công nghệ | |
| SCORE_VALUE | Điểm giá trị | |
| REVIEW_BADGE | first_drive / detailed_review / long_term / comparison | |

---

## Sau khi publish lên Strapi

Bài viết được tạo dưới dạng **Draft**. Còn thiếu:

- [ ] **Ảnh bìa** (featured_image): upload trong Strapi
- [ ] **Xe liên quan** (related_cars): chọn car-model trong Strapi
- [ ] **Kiểm tra slug_vi**: phải là URL-friendly (ví dụ: `so-sanh-toyota-camry-vs-mazda6-2026`)
- [ ] **Review bài**: đọc lại lần cuối trước khi Publish

---

## Troubleshooting

**Lỗi "Chưa cấu hình STRAPI_TOKEN"**
→ Kiểm tra Script Properties đã có `STRAPI_TOKEN` chưa

**Lỗi "Strapi 401"**
→ API token hết hạn hoặc sai → tạo token mới trong Strapi dashboard

**Lỗi "Strapi 403"**
→ API token thiếu quyền → vào Strapi → Settings → API Tokens → sửa quyền

**Không thấy menu TechDrive**
→ Reload Google Doc hoặc chạy lại function `onOpen` trong Apps Script

**Lỗi parse "Không thể đọc nội dung"**
→ Dùng "Preview Parsed Fields" để xem field nào bị lỗi → kiểm tra format output của AI
