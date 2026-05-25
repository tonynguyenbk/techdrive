# TechDrive — Quy trình sản xuất nội dung

Quy trình từ ý tưởng → xuất bản → phân phối. Mục tiêu: tốn ít thời gian nhất, chất lượng cao nhất.

---

## Tổng quan hệ thống

```
Ý tưởng bài viết
      │
      ▼
Chọn prompt template (tools/prompts/)
      │
      ▼
Điền thông tin → Claude AI tạo draft
      │
      ▼
Paste vào Google Doc
      │
      ▼
TechDrive Publisher (Apps Script) → Strapi Draft
      │
      ▼
Thêm ảnh + review trong Strapi
      │
      ▼
Publish → Make.com tự động phân phối
      │
   ┌──┴──────────────────────────┐
   ▼                             ▼                       ▼
Facebook Page              X (Twitter)           Telegram Channel
```

---

## Bước 1: Chọn loại bài viết

| Loại bài | Template | Thời gian viết | Khi nào dùng |
|----------|----------|----------------|--------------|
| Tin tức | `prompts/tin-tuc.md` | 15-20 phút | Ra mắt xe mới, sự kiện, chính sách |
| Đánh giá xe | `prompts/danh-gia.md` | 30-45 phút | Sau khi lái thử hoặc nhận xe press |
| So sánh xe | `prompts/so-sanh.md` | 25-35 phút | Khi 2-3 xe cùng phân khúc cạnh tranh |
| Tư vấn mua xe | `prompts/tu-van.md` | 20-30 phút | Đáp ứng câu hỏi từ độc giả hoặc trend |

---

## Bước 2: Viết bài với AI

### 2a. Tin tức (phổ biến nhất)

1. Mở `tools/prompts/tin-tuc.md`
2. Copy phần PROMPT
3. Điền:
   - **CHỦ ĐỀ BÀI VIẾT**: tiêu đề/mô tả ngắn
   - **THÔNG TIN THAM KHẢO**: paste link bài gốc (nếu có)
4. Gửi cho Claude → đợi khoảng 30 giây
5. Kết quả sẽ có: TITLE_VI, EXCERPT_VI, TAGS, CONTENT_VI

### 2b. Đánh giá xe (cần trải nghiệm thực tế)

1. Mở `tools/prompts/danh-gia.md`
2. Copy phần PROMPT
3. Điền **bắt buộc**:
   - Tên xe + phiên bản + giá
   - Km lái test + điều kiện test
   - Ghi chú trải nghiệm thực tế (càng chi tiết càng tốt)
   - Điểm số của bạn (1-10 mỗi tiêu chí)
4. AI sẽ tạo bài dựa trên dữ liệu của bạn

### 2c. So sánh xe

1. Mở `tools/prompts/so-sanh.md`
2. Điền: 2-3 xe cần so sánh + phân khúc giá + đối tượng đọc
3. AI tạo bảng thông số + phân tích 6 tiêu chí + kết luận rõ ràng

### 2d. Tư vấn mua xe

1. Mở `tools/prompts/tu-van.md`
2. Điền: ngân sách, nhu cầu, đối tượng, ưu tiên
3. AI tạo top 3 xe phù hợp + bảng chi phí sở hữu + khuyến nghị

---

## Bước 3: Publish lên Strapi

### Cách 1: Google Docs Publisher (khuyến nghị)

1. Mở Google Doc "TechDrive Publisher" (bookmark link này)
2. Paste toàn bộ output của AI vào Doc
3. **TechDrive → Preview Parsed Fields** (kiểm tra trước)
4. **TechDrive → Publish to Strapi (Draft)**
5. Hệ thống tự tạo bài draft trong Strapi

### Cách 2: Nhập tay vào Strapi (khi cần chỉnh nhiều)

1. Vào `https://techdrive-strapi.onrender.com/dashboard`
2. Content Manager → Articles → Create new entry
3. Điền từng field từ output của AI

### Sau khi tạo draft — checklist bắt buộc:

- [ ] **Kiểm tra slug_vi**: phải là URL-friendly, không có chữ hoa
  - Đúng: `so-sanh-honda-city-vs-toyota-vios-2026`
  - Sai: `article`, `Untitled`, để mặc định
- [ ] **Upload ảnh bìa** (featured_image): 1200×630px tối thiểu
- [ ] **Chọn category** đúng: news / review / comparison / advice / video
- [ ] **Liên kết xe** (related_cars): chọn xe liên quan trong danh sách
- [ ] **Đọc lại bài** ít nhất 1 lần trước khi Publish

---

## Bước 4: Publish & Phân phối tự động

1. Trong Strapi: nhấn nút **Publish**
2. Strapi tự gọi webhook → Make.com kích hoạt
3. Make.com tự động đăng:
   - Facebook Page của TechDrive
   - X (Twitter) @TechDrive_vn
   - Telegram Channel

**Thời gian từ Publish → xuất hiện trên mạng xã hội: 1-2 phút**

---

## Lịch sản xuất nội dung gợi ý

| Ngày | Loại bài | Ví dụ chủ đề |
|------|----------|-------------|
| Thứ 2 | Tin tức | Xe mới ra mắt tuần này |
| Thứ 3 | Tư vấn | "Nên mua xe gì với 700 triệu?" |
| Thứ 4 | Tin tức | Chính sách phí trước bạ, giá xăng |
| Thứ 5 | So sánh | 2 xe cùng phân khúc đang được hỏi nhiều |
| Thứ 6 | Đánh giá | Xe vừa lái test |
| Thứ 7-CN | Tin tổng hợp / sự kiện | Motor show, lái xe thực tế |

**Mục tiêu ban đầu: 5 bài/tuần**

---

## Cấu trúc thư mục công cụ

```
tools/
├── prompts/
│   ├── tin-tuc.md        # Prompt viết tin tức
│   ├── danh-gia.md       # Prompt đánh giá xe
│   ├── so-sanh.md        # Prompt so sánh xe
│   └── tu-van.md         # Prompt tư vấn mua xe
├── publisher/
│   ├── Code.gs           # Google Apps Script — tự động đẩy Docs → Strapi
│   └── README.md         # Hướng dẫn cài đặt Google Apps Script
├── make-blueprint.json   # Blueprint Make.com — tự động phân phối social
└── WORKFLOW.md           # File này
```

---

## Thiết lập một lần (nếu chưa làm)

### Google Apps Script Publisher

Xem hướng dẫn chi tiết tại: `tools/publisher/README.md`

Tóm tắt:
1. Tạo Google Doc mới
2. Extensions → Apps Script → paste `Code.gs`
3. Thêm Script Property `STRAPI_TOKEN`
4. Chạy `onOpen()` một lần để tạo menu TechDrive

### Make.com Auto Distribution

1. Đăng ký Make.com (free plan: 1000 ops/tháng, đủ cho ~100 bài)
2. Create New Scenario → Import Blueprint → chọn `make-blueprint.json`
3. Kết nối Facebook Page, X (Twitter), Telegram Bot
4. Cài webhook URL vào Strapi Settings → Webhooks

---

## Mẹo tiết kiệm thời gian

**Viết nhiều bài cùng lúc:**
- Buổi sáng: điền 3-4 prompt khác nhau cho Claude
- Buổi chiều: review và publish từng bài
- Lên lịch publish cho các ngày khác nhau trong Strapi

**Tái sử dụng thông tin:**
- Lưu thông số kỹ thuật xe thường xuyên viết vào Google Sheets
- Paste vào prompt thay vì tìm lại mỗi lần

**Nội dung từ độc giả:**
- Khi có câu hỏi trên Facebook/Zalo → dùng template tư vấn
- Reply comment + đăng bài → tạo engagement tự nhiên
