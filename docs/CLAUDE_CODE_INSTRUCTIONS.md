# CLAUDE CODE INSTRUCTIONS

> **File này chứa quy tắc và hướng dẫn cụ thể cho Claude Code khi làm việc trên dự án.**
> Đọc file này KẾT HỢP với `PROJECT_BRIEF.md` để có đầy đủ context.

---

## 1. THỨ TỰ ƯU TIÊN PHÁT TRIỂN

Khi được yêu cầu "bắt đầu" hoặc "khởi tạo project", thực hiện theo thứ tự sau:

### Bước 1: Project Scaffold
```bash
# 1. Khởi tạo Next.js với TypeScript
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --use-npm

# 2. Cài dependencies frontend
cd frontend
npm install next-intl framer-motion @radix-ui/react-* @tanstack/react-query zod react-hook-form zustand

# 3. Khởi tạo Strapi
cd ..
npx create-strapi-app@latest backend --quickstart --no-run

# 4. Docker Compose cho local dev services
# (PostgreSQL, Redis, Meilisearch)
```

### Bước 2: Cấu trúc thư mục Frontend
```
frontend/src/
├── app/
│   ├── [locale]/              # Dynamic locale routing
│   │   ├── layout.tsx         # Root layout with i18n provider
│   │   ├── page.tsx           # Homepage
│   │   ├── tin-tuc/           # News section (Vietnamese slugs)
│   │   │   ├── page.tsx       # News listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Single article
│   │   ├── danh-gia/          # Reviews
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── tim-xe/            # Car finder
│   │   │   ├── page.tsx       # Search/filter page
│   │   │   ├── [brand]/
│   │   │   │   └── page.tsx   # Brand page
│   │   │   └── [brand]/[model]/
│   │   │       └── page.tsx   # Model page
│   │   ├── so-sanh/           # Compare tool
│   │   │   └── page.tsx
│   │   ├── bang-gia/          # Price lists
│   │   │   └── page.tsx
│   │   ├── tu-van/            # Advice
│   │   │   └── page.tsx
│   │   └── video/
│   │       └── page.tsx
│   └── api/                   # API routes (if needed)
│
├── components/
│   ├── ui/                    # Base UI components (Button, Input, Badge, Card…)
│   ├── layout/                # Header, Footer, Sidebar, Navigation
│   ├── articles/              # ArticleCard, ArticleGrid, ArticleHero, AuthorBox
│   ├── cars/                  # CarCard, CarSpecs, CarGallery, ScoreCard
│   ├── tools/                 # CompareTable, PriceCalculator, ValuationForm
│   └── shared/                # SEO, Breadcrumb, Pagination, LanguageSwitcher
│
├── lib/
│   ├── api/                   # API client functions (fetchArticles, fetchCars…)
│   ├── utils/                 # formatPrice, formatDate, slugify…
│   └── constants/             # Enums, config values
│
├── types/
│   ├── article.ts
│   ├── car.ts
│   ├── author.ts
│   └── index.ts
│
├── styles/
│   ├── globals.css            # Tailwind base + custom CSS variables
│   └── tokens.ts              # Design tokens (colors, spacing, typography)
│
├── messages/
│   ├── vi.json                # Vietnamese translations
│   └── en.json                # English translations
│
├── hooks/
│   ├── useArticles.ts
│   ├── useCars.ts
│   └── useCompare.ts
│
└── config/
    ├── navigation.ts          # Menu structure
    ├── seo.ts                 # Default SEO config
    └── i18n.ts                # Locale config
```

### Bước 3: Design System & Styling
- Setup Tailwind config với custom design tokens
- Tạo base UI components (Button, Badge, Card, Input…)
- Tạo layout components (Header, Footer, Navigation)

### Bước 4: Trang chủ
- Implement Homepage theo wireframe (`docs/homepage-wireframe.html`)

### Bước 5: Content Types (Strapi)
- Tạo content types theo schema trong PROJECT_BRIEF.md

---

## 2. QUY TẮC CODE

### 2.1. General

- **TypeScript strict mode** — không dùng `any`, mọi thứ phải có type
- **Functional components** — không dùng class components
- **Named exports** — ưu tiên named export hơn default export (trừ page.tsx)
- **Barrel exports** — mỗi thư mục components có `index.ts` re-export
- **Error boundaries** — wrap mỗi page/section trong error boundary
- **Loading states** — mọi data fetch phải có loading skeleton
- **Empty states** — mọi danh sách phải có empty state

### 2.2. Naming Conventions

```typescript
// Files & Folders
components/ArticleCard.tsx       // PascalCase cho components
lib/utils/format-price.ts        // kebab-case cho utilities
hooks/useArticles.ts             // camelCase với prefix "use" cho hooks
types/article.ts                 // lowercase cho type files
app/[locale]/tin-tuc/page.tsx    // kebab-case cho routes

// Variables & Functions
const articleList = []            // camelCase
const ITEMS_PER_PAGE = 12         // SCREAMING_SNAKE_CASE cho constants
function formatPrice() {}         // camelCase cho functions
type ArticleCardProps = {}        // PascalCase cho types/interfaces

// CSS (Tailwind)
className="flex items-center gap-4 rounded-lg bg-neutral-900 p-4"  // Tailwind utilities
// Thứ tự: layout → spacing → sizing → typography → colors → effects
```

### 2.3. Component Pattern

```typescript
// Mẫu component chuẩn
import { type ComponentProps } from 'react'
import { cn } from '@/lib/utils/cn'

type ArticleCardProps = {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  return (
    <article className={cn('rounded-lg bg-neutral-900', className)}>
      {/* content */}
    </article>
  )
}
```

### 2.4. Data Fetching Pattern

```typescript
// Server Component (preferred cho SEO pages)
// app/[locale]/tin-tuc/page.tsx
export default async function NewsPage({ params }: { params: { locale: string } }) {
  const articles = await fetchArticles({ locale: params.locale, limit: 12 })
  return <ArticleGrid articles={articles} />
}

// Client Component (cho interactive features)
// components/tools/CompareTable.tsx
'use client'
import { useQuery } from '@tanstack/react-query'

export function CompareTable({ carIds }: { carIds: string[] }) {
  const { data, isLoading } = useQuery({
    queryKey: ['compare', carIds],
    queryFn: () => fetchCarsForCompare(carIds),
  })
  // ...
}
```

### 2.5. i18n Pattern

```typescript
// messages/vi.json
{
  "nav": {
    "news": "Tin tức",
    "reviews": "Đánh giá",
    "cars": "Tìm xe",
    "prices": "Bảng giá",
    "compare": "So sánh",
    "advice": "Tư vấn",
    "video": "Video"
  },
  "home": {
    "hero_section": "Bài viết nổi bật",
    "latest_news": "Tin tức mới nhất",
    "latest_reviews": "Đánh giá xe mới nhất",
    "view_all": "Xem tất cả",
    "most_viewed": "Xem nhiều nhất",
    "monthly_prices": "Bảng giá xe tháng {month}/{year}",
    "compare_title": "So sánh xe",
    "compare_desc": "Chọn 2-3 xe để so sánh thông số, giá cả và điểm đánh giá",
    "useful_tools": "Công cụ hữu ích"
  },
  "review": {
    "score": "Điểm đánh giá",
    "design": "Thiết kế",
    "performance": "Vận hành",
    "comfort": "Tiện nghi",
    "technology": "Công nghệ",
    "value": "Giá trị",
    "pros": "Ưu điểm",
    "cons": "Nhược điểm",
    "verdict": "Kết luận",
    "specs": "Thông số kỹ thuật",
    "competitors": "Xe cạnh tranh",
    "first_drive": "Lái thử lần đầu",
    "detailed_review": "Đánh giá chi tiết",
    "long_term": "Đánh giá dài hạn",
    "comparison": "So sánh"
  },
  "car": {
    "price_from": "Giá từ",
    "variants": "phiên bản",
    "on_sale": "Đang bán",
    "discontinued": "Ngừng bán",
    "upcoming": "Sắp ra mắt",
    "all_brands": "Tất cả hãng xe",
    "filter_by_price": "Lọc theo giá",
    "filter_by_segment": "Lọc theo phân khúc",
    "filter_by_fuel": "Lọc theo nhiên liệu"
  },
  "common": {
    "search": "Tìm kiếm",
    "read_more": "Đọc thêm",
    "share": "Chia sẻ",
    "minutes_read": "{count} phút đọc",
    "views": "lượt xem",
    "published": "Đăng ngày",
    "updated": "Cập nhật",
    "loading": "Đang tải...",
    "no_results": "Không tìm thấy kết quả",
    "error": "Đã có lỗi xảy ra"
  }
}

// Sử dụng trong component
import { useTranslations } from 'next-intl'

export function NewsSection() {
  const t = useTranslations('home')
  return <h2>{t('latest_news')}</h2>
}
```

---

## 3. QUY TẮC DESIGN

### 3.1. Design Tokens

```typescript
// styles/tokens.ts
export const tokens = {
  colors: {
    // Brand
    primary: '#DC2626',        // Red — accent chính
    primaryDark: '#991B1B',
    primaryLight: '#FCA5A5',

    // Neutral (Dark theme)
    bg: '#0A0A0A',             // Background chính
    bgCard: '#141414',         // Card background
    bgElevated: '#1A1A1A',    // Elevated surfaces
    border: '#1F1F1F',         // Border mặc định
    borderHover: '#333333',

    // Text
    textPrimary: '#F8FAFC',    // Heading, important text
    textSecondary: '#CBD5E1',  // Body text
    textMuted: '#64748B',      // Meta, captions
    textAccent: '#DC2626',     // Category labels, links

    // Score colors
    scoreExcellent: '#22C55E', // 9-10
    scoreGood: '#84CC16',      // 7-8
    scoreAverage: '#EAB308',   // 5-6
    scoreBad: '#EF4444',       // 1-4

    // Category badges
    badgeNews: '#2563EB',
    badgeReview: '#D97706',
    badgeEV: '#059669',
    badgeCompare: '#7C3AED',
    badgePrice: '#DC2626',
  },

  typography: {
    fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
    // Font sizes: Tailwind scale (text-xs → text-6xl)
  },

  spacing: {
    sectionGap: '2rem',        // Giữa các section trên trang chủ
    cardGap: '1rem',           // Giữa các card trong grid
    contentMaxWidth: '1200px', // Max width nội dung
    articleMaxWidth: '768px',  // Max width bài viết (đọc dễ hơn)
  },

  borderRadius: {
    card: '10px',
    badge: '4px',
    button: '8px',
    full: '9999px',
  }
}
```

### 3.2. Responsive Grid

```css
/* Mobile: 1 cột */
/* Tablet: 2 cột */
/* Desktop: 3-4 cột tùy section */

/* Ví dụ news grid */
.news-grid {
  @apply grid gap-4;
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2;
}

/* Ví dụ review grid */
.review-grid {
  @apply grid gap-4;
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}

/* Ví dụ price grid */
.price-grid {
  @apply grid gap-3;
  @apply grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
}
```

---

## 4. QUY TẮC GIT

### 4.1. Branch Strategy

```
main          ← production (auto-deploy)
├── develop   ← staging (auto-deploy to preview)
├── feature/homepage
├── feature/article-page
├── feature/car-database
├── feature/compare-tool
├── fix/header-responsive
└── chore/setup-ci
```

### 4.2. Commit Messages

```
feat: add article card component
feat(i18n): add Vietnamese translations for review page
fix: header navigation overflow on mobile
style: update score badge colors
refactor: extract car spec table to separate component
chore: setup Docker Compose for local dev
docs: update API documentation
perf: optimize image loading with blur placeholder
```

### 4.3. PR Convention

- Mỗi PR phải có description mô tả thay đổi
- Screenshot/video nếu có UI changes
- Link đến task/issue liên quan
- Self-review checklist: responsive? i18n? loading states? error states?

---

## 5. SEO CHECKLIST

Mọi page phải đảm bảo:

- [ ] `<title>` duy nhất, chứa keyword chính, < 60 ký tự
- [ ] `<meta name="description">` duy nhất, < 160 ký tự
- [ ] `<link rel="canonical">` chính xác
- [ ] `hreflang` tags cho cả VI và EN version
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Structured Data (JSON-LD): Article, Review, Product, BreadcrumbList
- [ ] Heading hierarchy (H1 → H2 → H3, chỉ 1 H1/page)
- [ ] Alt text cho mọi image
- [ ] Internal links đến bài liên quan
- [ ] Breadcrumbs
- [ ] URL slug có ý nghĩa (không có ID, parameter thừa)

---

## 6. PERFORMANCE TARGETS

| Metric | Target | Ghi chú |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image phải load nhanh |
| FID (First Input Delay) | < 100ms | |
| CLS (Cumulative Layout Shift) | < 0.1 | Ảnh phải có width/height |
| Time to First Byte | < 200ms | Vercel Edge + ISR |
| Lighthouse Score | > 90 | Cả mobile và desktop |
| Bundle Size (JS) | < 200KB gzipped | Code splitting per route |

---

## 7. NHỮNG ĐIỀU KHÔNG NÊN LÀM

- ❌ Không dùng `any` type trong TypeScript
- ❌ Không hardcode text — mọi text UI đều qua i18n
- ❌ Không dùng `px` cho font-size — dùng Tailwind scale hoặc `rem`
- ❌ Không fetch data ở client khi có thể dùng Server Component
- ❌ Không commit `.env` files
- ❌ Không dùng inline styles — dùng Tailwind hoặc CSS modules
- ❌ Không tạo component quá 200 dòng — tách ra nhỏ hơn
- ❌ Không bỏ qua loading/error/empty states
- ❌ Không bỏ qua mobile responsive
- ❌ Không dùng `<img>` — luôn dùng `next/image`
- ❌ Không import toàn bộ library — tree-shake (import cụ thể)

---

## 8. KHI KHÔNG CHẮC CHẮN

Nếu gặp quyết định thiết kế hoặc kỹ thuật mà chưa được đề cập trong tài liệu:

1. **Ưu tiên SEO** — nếu phải chọn giữa đẹp và SEO-friendly, chọn SEO
2. **Ưu tiên mobile** — nếu layout khó responsive, thiết kế cho mobile trước
3. **Ưu tiên performance** — nếu feature phức tạp ảnh hưởng tốc độ, đơn giản hóa
4. **Ưu tiên i18n** — mọi text phải qua hệ thống dịch, không hardcode
5. **Hỏi owner** — nếu là quyết định product/business, hỏi trước khi làm

---

*File này là living document — sẽ được cập nhật khi có convention mới.*

---

## 9. DESIGN DECISIONS ĐÃ IMPLEMENT

> Ghi lại các quyết định thiết kế thực tế đã được chốt trong quá trình phát triển.

### 9.1. Màu sắc thực tế (overrides design tokens gốc)

| Vị trí | Token/CSS | Giá trị |
|--------|-----------|---------|
| Footer background | hardcoded | `#071222` (navy đậm) |
| Header background | hardcoded | `bg-surface-card/95` (theo theme) |
| Logo DRIVE (light mode) | pixel trong PNG | `#071222` (đồng màu footer) |
| Logo DRIVE (dark mode) | pixel trong PNG | `#ffffff` |
| Brand primary | `--color-primary` | `#DC2626` |

### 9.2. Header

```
Height:      h-20 (80px)
Logo height: h-14 (56px)
Nav text:    0.9375rem (15px), px-3.5 py-2
Container:   max-w-[1200px] mx-auto px-5
Background:  bg-surface-card/95 + backdrop-blur-md (theo theme sáng/tối)
```

**Logo behavior:**
- Light mode → `/logo.png` (TECH đỏ, DRIVE + nét vẽ ô tô màu `#071222`)
- Dark mode  → `/logo-dark.png` (TECH đỏ, DRIVE + nét vẽ ô tô trắng)
- Chuyển đổi bằng CSS `dark:hidden` / `hidden dark:block` (không dùng JS)

### 9.3. Footer

```
Background:  #071222
Text hierarchy:
  - Nav links:          text-white/75 → hover text-white
  - Mô tả thương hiệu: text-white/70
  - Social icons:       text-white/60 → hover màu brand
  - Hãng xe:           text-white/60 → hover text-primary
  - Label nhỏ:         text-white/50
  - Bottom bar:        text-white/50
  - Divider:           border-white/10

Brand "TechDrive":
  - "Tech" → text-primary (#DC2626)
  - "Drive" → text-white (luôn trắng, vì nền footer luôn tối)
```

### 9.4. Navigation (NavItems)

- **Animation**: Framer Motion `layoutId="nav-pill"` — pill trượt giữa các item
- **Màu chữ**: CSS variables (`--color-text-primary/secondary`) — tự động đổi theo theme
- **Pill background**: `--color-surface-elevated` + border `--color-surface-border`
- **Active**: `--color-primary` (đỏ)

### 9.5. Mobile Menu

- Dùng `ReactDOM.createPortal` render vào `document.body`
- **Lý do**: `backdrop-blur` trên header tạo CSS stacking context, phá vỡ `position: fixed` của drawer
- Background: `#111111` (hardcoded, luôn tối)
- z-index: overlay `9998`, drawer `9999`

### 9.6. Theme System

```typescript
// providers/ThemeProvider.tsx
<NextThemesProvider
  attribute="class"        // thêm class .dark / .light vào <html>
  defaultTheme="dark"
  enableSystem
  disableTransitionOnChange  // tắt CSS transition khi đổi theme → switch tức thì
>
```

```css
/* globals.css — BẮT BUỘC cho Tailwind v4 */
/* Tailwind v4 mặc định dùng prefers-color-scheme, không phải .dark class */
@variant dark (&:where(.dark, .dark *));
```

> **Quan trọng:** Nếu bỏ dòng `@variant dark` này, tất cả `dark:` utilities
> sẽ không hoạt động theo next-themes mà theo OS preference.

### 9.7. Logo files

```
public/logo.png       — Light mode: nền trắng/trong suốt, DRIVE màu #071222
public/logo-dark.png  — Dark mode:  nền trong suốt, DRIVE màu trắng
```

Để thay đổi màu pixel trong file PNG, dùng script PowerShell + .NET System.Drawing:
```powershell
Add-Type -AssemblyName System.Drawing
$bytes = [System.IO.File]::ReadAllBytes("public/logo.png")
$ms = [System.IO.MemoryStream]::new($bytes)
$bmp = [System.Drawing.Bitmap]::new($ms)
# Loop pixels, thay dark pixels bằng màu mới
$bmp.Save("public/logo_tmp.png", [System.Drawing.Imaging.ImageFormat]::Png)
Move-Item -Force logo_tmp.png logo.png
```
