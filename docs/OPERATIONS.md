# TechDrive — Hướng dẫn vận hành

## 1. Thay đổi ảnh bài viết

### Cách 1: Nhanh nhất — sửa trong `article-images.ts`

File: `frontend/src/lib/utils/article-images.ts`

Đây là map slug → URL ảnh. Ưu tiên cao nhất, ghi đè mọi thứ khác.

```typescript
const ARTICLE_IMAGES: Record<string, string> = {
  'vinfast-vf9-2026-danh-gia': 'https://...',
  'mazda-cx5-2024-danh-gia':   'https://...',
  // ...
};
```

**Quy trình:**
1. Tìm slug bài viết (xem trong URL: `techdrive.vn/danh-gia/[slug]`)
2. Tìm hoặc thêm dòng tương ứng trong file trên
3. Dán URL ảnh mới vào
4. Commit + push → Vercel tự deploy (~2 phút)

**Nguồn ảnh tốt (cho phép hotlink):**
- Wikimedia Commons: `https://upload.wikimedia.org/wikipedia/commons/thumb/...`
- Cloudinary (đã upload): `https://res.cloudinary.com/dhiykqhrp/...`
- Unsplash CDN: `https://images.unsplash.com/photo-[ID]?w=800&h=450&fit=crop&q=80`

**Thêm domain ảnh mới** vào `frontend/next.config.ts`:
```typescript
{ protocol: "https", hostname: "domain-moi.com" },
```

---

### Cách 2: Upload ảnh qua Strapi Admin

Dùng khi muốn upload ảnh riêng (không hotlink từ bên ngoài).

1. Vào Strapi admin → **Content Manager → Articles**
2. Chọn bài viết → field **Featured Image** → upload file
3. Ảnh lưu vào Cloudinary (tự động) và gắn vào bài

> **Lưu ý:** `article-images.ts` có ưu tiên cao hơn. Nếu slug bài đã có trong map đó, ảnh upload qua Strapi sẽ không hiển thị. Cần xóa dòng slug đó khỏi map trước.

---

### Thứ tự ưu tiên ảnh (từ cao đến thấp)

```
1. article-images.ts (static map)       ← nhanh nhất, không cần deploy backend
2. cover_url trong DB (Strapi field)     ← cập nhật qua Strapi Admin hoặc SQL
3. featured_image (Strapi media upload)  ← upload file thật
4. Fallback: picsum.photos (random)      ← chỉ khi không có gì cả
```

---

## 2. Cập nhật tên tác giả

### Cách 1: SQL trực tiếp trên Neon.tech (nhanh nhất)

1. Vào [console.neon.tech](https://console.neon.tech) → project **TechDrive** → **SQL Editor**
2. Chạy query:

```sql
UPDATE authors SET name = 'Tên Mới', slug = 'ten-moi' WHERE slug = 'slug-cu';
```

Ví dụ đổi tên đã thực hiện:
```sql
UPDATE authors SET name = 'Trường Nguyễn', slug = 'truong-nguyen' WHERE slug = 'nguyen-minh-duc';
UPDATE authors SET name = 'Thu Hồng',      slug = 'thu-hong'      WHERE slug = 'tran-quoc-bao';
UPDATE authors SET name = 'Hải Minh',      slug = 'hai-minh'      WHERE slug = 'le-hoang-nam';
```

Website tự cập nhật sau 60 giây (ISR cache).

---

### Cách 2: Strapi Admin

1. Vào Strapi Admin → **Content Manager → Authors**
2. Chọn tác giả → sửa **Name** → Save

---

### Cách 3: Sửa seed-data.js (lưu vĩnh viễn cho lần deploy tiếp theo)

File: `backend/src/seeds/seed-data.js` → phần `seedAuthors`

Bootstrap tự đổi tên trong DB nếu tìm thấy slug cũ (logic trong `backend/src/index.js`).

```javascript
const authorRenames = {
  'slug-cu': 'Tên Mới',
};
```

---

## 3. Thêm bài viết mới

### Qua Strapi Admin (khuyến nghị)

1. Vào Strapi Admin → **Content Manager → Articles → Create new**
2. Điền đầy đủ các field: `title_vi`, `slug_vi`, `content_vi`, `category`, `author`
3. Upload ảnh vào field **Featured Image** (hoặc để field `cover_url`)
4. **Publish** bài viết

Bài sẽ xuất hiện trên website sau 60 giây.

### Qua seed-data.js (cho bài viết mẫu/demo)

Thêm vào mảng `seedArticles` trong `backend/src/seeds/seed-data.js`.  
Mỗi lần Strapi khởi động, bootstrap sẽ tự tạo bài nếu chưa tồn tại.

---

## 4. Domain & Deployment

| Service | URL | Dùng để |
|---------|-----|---------|
| Frontend | [techdrive.vn](https://techdrive.vn) | Website chính |
| Frontend | [techdrive-mu.vercel.app](https://techdrive-mu.vercel.app) | Vercel URL dự phòng |
| Backend | Render.com (xem dashboard) | Strapi CMS + API |
| Database | [console.neon.tech](https://console.neon.tech) | PostgreSQL production |
| Media | Cloudinary | Lưu ảnh upload |

**Auto-deploy:** Push code lên `main` → Vercel tự build frontend (~2 phút), Render tự build backend (~5 phút).

**Render free tier:** Service ngủ sau 15 phút không có request. Lần đầu vào sẽ chờ ~50 giây.
