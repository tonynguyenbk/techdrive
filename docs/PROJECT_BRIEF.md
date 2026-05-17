# PROJECT BRIEF — Automotive Media Website Vietnam

> **Tài liệu này tổng hợp toàn bộ trao đổi giữa Project Owner và AI Assistant.**
> Mục đích: Cung cấp đầy đủ context cho bất kỳ ai (hoặc AI) tham gia dự án sau này.
> Cập nhật lần cuối: 16/05/2026

---

## 1. BỐI CẢNH DỰ ÁN

### 1.1. Ý tưởng ban đầu

Owner muốn xây dựng một website ô tô tương tự **TopGear.com** (Anh) và **MotorTrend.com** (Mỹ) — hai trang automotive media lớn nhất thế giới. Không phải website bán xe (như Chợ Tốt, Oto.com.vn), mà là **trang tin tức, đánh giá, và tư vấn ô tô** — mô hình media/magazine.

### 1.2. Phân tích 2 website tham khảo

#### TopGear.com (BBC, Anh Quốc)
- **Loại**: Tạp chí ô tô giải trí + review
- **Điểm mạnh được chọn lấy**:
  - Hero Image cực lớn trên trang chủ, ảnh full-width chất lượng cao
  - Hệ thống chấm điểm trực quan (score /10) cho mỗi bài review
  - Badge phân loại bài viết rõ ràng: "First Drive", "Long-term Review", "Electric"
  - Magazine-style layout: grid bất đối xứng, xen kẽ bài lớn–nhỏ
  - Giọng văn có cá tính, không khô khan
  - Author profiles nổi bật
  - Chuyên mục đa dạng: Retro, Gaming, Watches, Big Reads
- **Công nghệ**: Next.js (React), SSR

#### MotorTrend.com (Mỹ)
- **Loại**: Tạp chí ô tô thiên dữ liệu + công cụ
- **Điểm mạnh được chọn lấy**:
  - Car Database đồ sộ: Hãng → Dòng → Đời → Phiên bản
  - Ultimate Car Rankings: hệ thống xếp hạng xe đa tiêu chí
  - Compare Tool: so sánh 2-3 xe song song
  - Buyer's Guide với bộ lọc mạnh
  - Trade-in Value Calculator: ước tính giá xe cũ
  - Awards Program: "Car of the Year"
  - SEO-optimized pages cho từng dòng xe
- **Traffic**: ~4.4M visits/tháng, Domain Rating 84

### 1.3. Quyết định của Owner

| Câu hỏi | Trả lời |
|----------|---------|
| Thị trường mục tiêu | **Việt Nam là chính**, English phụ |
| Loại nội dung tập trung | **Tin tức & Review xe** |
| Quy mô đội ngũ | **5-10 người, ngân sách tốt** |

---

## 2. CHIẾN LƯỢC SẢN PHẨM

### 2.1. Tầm nhìn (Vision)

> Trở thành **trang tin tức & đánh giá ô tô đáng tin cậy nhất Việt Nam**, kết hợp phong cách editorial hấp dẫn với công cụ dữ liệu xe thực dụng, phục vụ cả người mua xe lần đầu và người đam mê ô tô.

### 2.2. Đối tượng người dùng (Target Audience)

- **Người mua xe tiềm năng**: tìm thông tin, so sánh, tư vấn trước khi quyết định
- **Người đam mê ô tô**: theo dõi tin tức, đọc review, xem video
- **Chủ xe hiện tại**: tìm kinh nghiệm sử dụng, bảo dưỡng, định giá xe cũ
- **Đối tượng phụ**: độc giả quốc tế quan tâm thị trường xe VN (phiên bản English)

### 2.3. Lợi thế cạnh tranh so với các trang xe VN hiện có

| Đối thủ VN hiện tại | Hạn chế | Mình sẽ làm tốt hơn |
|---------------------|---------|---------------------|
| Autodaily, Xe-Hay, Đánh giá xe | Thiết kế cũ, UX kém | Thiết kế hiện đại, magazine-style |
| Oto.com.vn, Bonbanh | Trang mua bán, không phải media | Tập trung nội dung chất lượng |
| VnExpress Ô tô | Mục phụ của báo lớn | Chuyên biệt, có công cụ riêng |
| Tất cả | Không có hệ thống chấm điểm, không có compare tool mạnh, không có bảng xếp hạng | Đầy đủ công cụ như MotorTrend |

### 2.4. Song ngữ Việt–Anh

**Chiến lược URL:**
```
Tiếng Việt (mặc định):
  domain.vn/tin-tuc/vinfast-vf9-2026
  domain.vn/danh-gia/toyota-camry-2026
  domain.vn/tim-xe?hang=toyota&gia=500-800

English:
  domain.vn/en/news/vinfast-vf9-2026
  domain.vn/en/reviews/toyota-camry-2026
  domain.vn/en/cars?brand=toyota&price=500-800
```

**Quy tắc:**
- Tiếng Việt là ngôn ngữ mặc định (không cần prefix `/vi`)
- English dùng prefix `/en`
- Nội dung bài viết: viết tiếng Việt trước → viết/dịch English sau (không dùng dịch máy cho bài chính)
- UI labels: file JSON riêng cho mỗi ngôn ngữ (vi.json, en.json)
- SEO: thẻ `hreflang` cho mỗi trang, sitemap riêng theo ngôn ngữ
- Auto-detect ngôn ngữ theo location, nhưng cho phép user chuyển đổi

---

## 3. SITEMAP & TÍNH NĂNG CHI TIẾT

### 3.1. Cấu trúc trang

```
🏠 Trang chủ (/)
│
├── 📰 Tin tức (/tin-tuc | /en/news)
│   ├── Xe mới ra mắt
│   ├── Thị trường ô tô VN
│   ├── Xe điện & Công nghệ
│   ├── Chính sách & Thuế
│   ├── Quốc tế
│   └── Motorsport
│
├── ⭐ Đánh giá xe (/danh-gia | /en/reviews)
│   ├── First Drive (Lái thử lần đầu)
│   ├── Đánh giá chi tiết
│   ├── Đánh giá dài hạn (Long-term)
│   └── So sánh đối đầu (Head-to-head)
│
├── 🚗 Tìm xe (/tim-xe | /en/cars)
│   ├── Theo hãng (Toyota, Honda, VinFast…)
│   ├── Theo phân khúc (Sedan, SUV, MPV, Pickup…)
│   ├── Theo giá (Dưới 500tr, 500tr-1tỷ, Trên 1tỷ…)
│   ├── So sánh xe — Compare Tool (chọn 2-3 xe)
│   └── Bảng xếp hạng — Rankings
│
├── 💰 Tư vấn mua xe (/tu-van | /en/advice)
│   ├── Nên mua xe gì?
│   ├── Định giá xe cũ (Trade-in Calculator)
│   ├── Chi phí lăn bánh (On-road Cost Calculator)
│   ├── Bảo hiểm & Đăng kiểm
│   └── Kinh nghiệm mua xe
│
├── 🎬 Video (/video)
│   ├── Review xe
│   ├── Test drive
│   └── Sự kiện
│
├── 📊 Bảng giá xe (/bang-gia | /en/prices)
│   └── Cập nhật hàng tháng, theo hãng
│
├── 🏆 Giải thưởng (/giai-thuong | /en/awards)
│   └── Car of the Year Vietnam
│
└── 📄 Trang phụ
    ├── Giới thiệu (/gioi-thieu)
    ├── Liên hệ (/lien-he)
    ├── Quảng cáo (/quang-cao)
    ├── Tuyển dụng (/tuyen-dung)
    └── Chính sách bảo mật (/chinh-sach-bao-mat)
```

### 3.2. Chi tiết trang chủ (Homepage)

Xem wireframe tại `docs/homepage-wireframe.html`. Tóm tắt layout:

1. **Header**: Logo + Navigation chính + Language toggle (VI/EN) + Search
2. **Hero Section**: 1 bài viết nổi bật, ảnh full-width, tiêu đề overlay, badge loại bài, score
3. **Tin tức mới nhất**: Grid 2 cột (4 bài) + Sidebar "Xem nhiều nhất" (5 bài)
4. **Đánh giá xe mới nhất**: Grid 3 cột, mỗi card có score /10 nổi bật
5. **Bảng giá xe tháng**: Grid 4x2 card hãng xe phổ biến, hiển thị khoảng giá
6. **Công cụ so sánh xe**: 3 slot chọn xe + nút "So sánh ngay"
7. **Công cụ hữu ích**: 3 card (Định giá xe cũ, Chi phí lăn bánh, Xe phù hợp với bạn)
8. **Footer**: 4 cột (Thương hiệu, Chuyên mục, Công cụ, Liên hệ) + Language toggle

### 3.3. Chi tiết trang đánh giá xe (Review Page)

**Kết hợp TopGear (editorial) + MotorTrend (data):**

- Ảnh gallery lớn trên cùng (10-30 ảnh chất lượng cao, swipeable)
- **Score Card nổi bật**: Điểm tổng /10 + điểm thành phần:
  - Thiết kế (Design): /10
  - Vận hành (Performance): /10
  - Tiện nghi (Comfort): /10
  - Công nghệ (Technology): /10
  - Giá trị (Value for Money): /10
- **Quick Specs Box**: Giá, mã lực, 0-100km/h, tiêu hao nhiên liệu, số chỗ
- **Verdict Box**: Kết luận ngắn 2-3 câu ở đầu bài
- **Nội dung chi tiết**: Ngoại thất → Nội thất → Vận hành → An toàn → Kết luận
- **Pros & Cons**: Bảng ưu/nhược điểm
- **Xe cạnh tranh**: Card link đến các đối thủ cùng phân khúc
- **Bảng thông số đầy đủ**: Collapsible, hiển thị khi click
- **Author Box**: Ảnh + tên + bio tác giả
- **Related Articles**: Bài viết liên quan
- **Comments**: Hệ thống bình luận

### 3.4. Công cụ so sánh xe (Compare Tool)

- Chọn 2-3 xe từ database (search + autocomplete)
- Bảng so sánh song song: thông số, giá, điểm đánh giá
- Highlight khác biệt (màu xanh = tốt hơn, màu đỏ = kém hơn)
- Kết luận từ biên tập viên: "Nên chọn xe nào?"
- Share kết quả qua URL duy nhất

### 3.5. Công cụ định giá xe cũ

- Input: Hãng, dòng, đời, phiên bản, số km đã đi, tình trạng xe
- Output: Giá ước tính (min–max), so sánh với giá xe mới
- Dữ liệu dựa trên crawl thị trường xe cũ VN

### 3.6. Công cụ tính chi phí lăn bánh

- Input: Dòng xe, phiên bản, tỉnh/thành đăng ký
- Output: Giá xe + Thuế trước bạ + Phí đăng ký + Bảo hiểm + Phí đường bộ = Tổng chi phí lăn bánh
- Cập nhật theo chính sách thuế hiện hành

---

## 4. CƠ SỞ DỮ LIỆU XE (Car Database)

### 4.1. Schema chính

```
Brand (Hãng xe)
  ├── id, name_vi, name_en, slug
  ├── logo_url, country_of_origin
  ├── description_vi, description_en
  ├── is_active, display_order
  │
  └── Model (Dòng xe)
        ├── id, brand_id, name, slug
        ├── segment (sedan/suv/mpv/hatchback/pickup/coupe/van/truck)
        ├── body_type, generation, year_from, year_to
        ├── price_from, price_to (VNĐ)
        ├── status (on_sale / discontinued / upcoming)
        ├── description_vi, description_en
        ├── thumbnail_url, gallery_urls[]
        ├── our_rating (điểm đánh giá /10, nullable)
        │
        └── Variant (Phiên bản)
              ├── id, model_id, name, slug, year, price (VNĐ)
              │
              ├── Engine
              │   ├── fuel_type (gasoline/diesel/electric/hybrid/phev)
              │   ├── displacement_cc, cylinders
              │   ├── horsepower, torque_nm
              │   ├── transmission (manual/automatic/cvt/dct)
              │   ├── drivetrain (fwd/rwd/awd/4wd)
              │   ├── fuel_consumption_combined (L/100km hoặc kWh/100km)
              │   ├── acceleration_0_100 (giây)
              │   └── top_speed_kmh
              │
              ├── Dimensions
              │   ├── length_mm, width_mm, height_mm, wheelbase_mm
              │   ├── ground_clearance_mm
              │   ├── trunk_volume_liters
              │   ├── fuel_tank_liters (hoặc battery_capacity_kwh)
              │   ├── curb_weight_kg
              │   └── seating_capacity
              │
              ├── Features
              │   ├── safety_features[] (ABS, ESC, airbags, ADAS…)
              │   ├── comfort_features[] (điều hòa, ghế chỉnh điện…)
              │   ├── tech_features[] (màn hình, Apple CarPlay…)
              │   └── exterior_features[] (đèn LED, mâm…)
              │
              └── Media
                  ├── images[]
                  ├── colors[] (tên màu + mã hex)
                  └── brochure_url
```

### 4.2. Content Types cho CMS (Strapi)

```
- Article (Bài viết)
    ├── title_vi, title_en, slug_vi, slug_en
    ├── excerpt_vi, excerpt_en
    ├── content_vi, content_en (Rich Text / Markdown)
    ├── featured_image, gallery[]
    ├── category (news / review / comparison / advice / video)
    ├── subcategory
    ├── tags[]
    ├── author (relation → Author)
    ├── related_cars[] (relation → Model)
    ├── score (nullable, cho bài review)
    ├── score_design, score_performance, score_comfort, score_tech, score_value
    ├── pros[], cons[]
    ├── verdict_vi, verdict_en
    ├── status (draft / review / published / archived)
    ├── published_at, updated_at
    ├── reading_time_minutes
    ├── is_featured (boolean)
    └── seo (meta_title, meta_description, og_image)

- Author (Tác giả)
    ├── name, slug, avatar
    ├── bio_vi, bio_en
    ├── role (editor / journalist / contributor)
    ├── social_links (facebook, twitter, linkedin)
    └── articles[] (reverse relation)

- PriceUpdate (Cập nhật giá)
    ├── model (relation → Model)
    ├── variant (relation → Variant)
    ├── price, previous_price
    ├── month, year
    ├── notes_vi, notes_en
    └── source

- OnRoadCost (Chi phí lăn bánh)
    ├── variant (relation → Variant)
    ├── province
    ├── registration_tax_rate
    ├── registration_fee
    ├── inspection_fee
    ├── road_fee_yearly
    └── insurance_mandatory
```

### 4.3. Dữ liệu cần nhập ban đầu

**Ưu tiên top 15 hãng xe phổ biến tại VN (Phase 1):**
Toyota, Honda, Hyundai, Kia, Mazda, VinFast, Mitsubishi, Ford, Suzuki, Nissan, MG, Subaru, Peugeot, Wuling, Haval

**Ước tính khối lượng:**
- ~40 hãng xe × trung bình 8 dòng = ~300 dòng xe
- ~300 dòng × trung bình 5 phiên bản = ~1,500 phiên bản
- Mỗi phiên bản cần ~50 trường thông số

---

## 5. TECH STACK ĐÃ QUYẾT ĐỊNH

### 5.1. Frontend

| Thành phần | Công nghệ | Ghi chú |
|------------|-----------|---------|
| Framework | Next.js 15 (App Router) | SSR/SSG cho SEO, React ecosystem |
| Language | TypeScript (strict mode) | Bắt buộc cho toàn bộ frontend |
| Styling | Tailwind CSS v4 | Utility-first, responsive |
| UI Base | Radix UI Primitives | Accessible, unstyled components |
| Animation | Framer Motion | Page transitions, scroll effects |
| Image | next/image + Cloudinary | Auto-optimize, responsive, lazy load |
| Video | Video.js hoặc Plyr | Custom player skin |
| i18n | next-intl | Routing, translations, formatting |
| Forms | React Hook Form + Zod | Validation |
| State | Zustand (nếu cần) | Lightweight global state |
| Data fetching | TanStack Query | Cache, refetch, pagination |

### 5.2. Backend & CMS

| Thành phần | Công nghệ | Ghi chú |
|------------|-----------|---------|
| CMS | Strapi v5 | Headless, REST + GraphQL, i18n plugin |
| Database | PostgreSQL 16 | Chính, cho content + car data |
| Search | Meilisearch | Full-text search, tiếng Việt, typo-tolerant |
| Cache | Redis | Cache queries, sessions |
| File Storage | AWS S3 | Ảnh, video, tài liệu |
| CDN | CloudFront hoặc Cloudflare | Phân phối ảnh/video nhanh |
| Email | Resend hoặc AWS SES | Newsletter, thông báo |

### 5.3. Infrastructure

| Thành phần | Công nghệ | Ghi chú |
|------------|-----------|---------|
| Frontend hosting | Vercel | Auto-deploy từ GitHub, preview URLs |
| Backend hosting | DigitalOcean App Platform hoặc AWS EC2 | Strapi + workers |
| Database hosting | DigitalOcean Managed DB hoặc AWS RDS | PostgreSQL managed |
| Monitoring | Sentry (errors) + Vercel Analytics | Performance + error tracking |
| Analytics | Google Analytics 4 + Google Search Console | Traffic + SEO |
| CI/CD | GitHub Actions | Lint → Test → Build → Deploy |
| Local dev | Docker Compose | PostgreSQL + Redis + Meilisearch |

---

## 6. THIẾT KẾ & BRAND

### 6.1. Phong cách thiết kế

- **Tone**: Magazine editorial hiện đại, đậm chất automotive
- **Dark mode**: Mặc định dark (phù hợp ảnh xe), có option light mode
- **Typography**: Font Việt hóa tốt, bold cho tiêu đề, dễ đọc cho body
- **Ảnh**: Chất lượng cao là ưu tiên số 1, full-width khi cần thiết
- **Layout**: Grid bất đối xứng kiểu magazine, không đều đặn nhàm chán
- **Accent color**: Đỏ (automotive, năng động, nổi bật trên nền tối)
- **Score display**: Nổi bật, dễ nhận biết từ thumbnail (lấy từ TopGear)

### 6.2. Responsive

- Mobile-first design (>60% traffic VN từ mobile)
- Breakpoints: 375px (mobile) → 768px (tablet) → 1024px (laptop) → 1280px (desktop) → 1440px (wide)
- Hamburger menu trên mobile, full nav trên desktop
- Swipeable galleries trên mobile
- Bottom navigation bar trên mobile (cân nhắc)

---

## 7. MONETIZATION (MÔ HÌNH KIẾM TIỀN)

| Kênh | Mô tả | Timeline |
|------|-------|----------|
| Display Ads | Google AdSense/AdX, banner quảng cáo | Từ tháng 1 sau launch |
| Sponsored Content | Bài PR cho hãng xe, đại lý | Từ tháng 3 |
| Affiliate | Hoa hồng từ link mua xe, bảo hiểm, phụ kiện | Từ tháng 3 |
| Lead Generation | Bán lead cho đại lý (form "Nhận báo giá") | Từ tháng 6 |
| Premium Content | Paywall cho báo cáo thị trường, review sâu | Từ tháng 12 |
| Events | "Car of the Year VN", sự kiện lái thử | Năm 2 |

---

## 8. ROADMAP

### Phase 1: Foundation (Tháng 1–3)
- Brand identity + Design system
- UI/UX design (Figma)
- Setup tech stack
- CMS + Car Database schema
- Trang chủ + Trang tin tức + Trang danh sách xe
- Hệ thống i18n
- Nhập data xe đợt 1 (top 15 hãng)

### Phase 2: Core Features (Tháng 4–6)
- Trang đánh giá xe (với scoring system)
- Compare Tool
- Buyer's Guide + bộ lọc
- Bảng giá xe hàng tháng
- Trang video
- SEO optimization
- Nhập data xe đợt 2 (toàn bộ xe tại VN)
- **SOFT LAUNCH**

### Phase 3: Growth (Tháng 7–9)
- **PUBLIC LAUNCH**
- Định giá xe cũ
- Tính chi phí lăn bánh
- Newsletter system
- Social media integration
- Performance optimization

### Phase 4: Scale (Tháng 10–12)
- "Car of the Year VN" awards
- User accounts + bookmark
- Comments + community
- Mobile app (PWA hoặc React Native)
- Dashboard analytics
- Mở rộng nội dung English

---

## 9. GHI CHÚ QUAN TRỌNG

- **Pháp lý**: Cần giấy phép trang thông tin điện tử tổng hợp để hoạt động hợp pháp tại VN
- **Nội dung**: Chất lượng nội dung quan trọng hơn số lượng. Mỗi bài review phải có giá trị thực sự
- **SEO**: Bảng giá xe + review xe là 2 nguồn traffic organic lớn nhất. Ưu tiên tối ưu sớm
- **Mobile**: Thiết kế mobile-first vì đa số user VN dùng điện thoại
- **Ảnh**: Đầu tư vào ảnh chất lượng cao. Ảnh xấu = mất uy tín ngay lập tức
- **Tốc độ**: Core Web Vitals phải tốt. Trang tải chậm = mất user + SEO kém

---

*Tài liệu này sẽ được cập nhật khi có quyết định mới trong quá trình phát triển.*
