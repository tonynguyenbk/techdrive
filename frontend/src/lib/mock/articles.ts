import type { Article, ArticleCard } from "@/types/article";
import type { Author } from "@/types/author";

const authorDuc: Author = {
  id: "a1",
  name: "Nguyễn Minh Đức",
  slug: "nguyen-minh-duc",
  avatar: null,
  bio_vi: "Biên tập viên cao cấp với 8 năm kinh nghiệm lái thử và đánh giá xe tại Việt Nam và quốc tế.",
  bio_en: "Senior editor with 8 years of car testing and reviewing experience in Vietnam and internationally.",
  role: "journalist",
  social_links: { facebook: "https://facebook.com", twitter: "https://twitter.com" },
};

const authorBao: Author = {
  id: "a2",
  name: "Trần Quốc Bảo",
  slug: "tran-quoc-bao",
  avatar: null,
  bio_vi: "Nhà báo xe hơi chuyên về thị trường xe Nhật và Hàn tại Việt Nam.",
  bio_en: "Automotive journalist specializing in Japanese and Korean cars in Vietnam.",
  role: "journalist",
  social_links: { facebook: "https://facebook.com" },
};

const authorNam: Author = {
  id: "a3",
  name: "Lê Hoàng Nam",
  slug: "le-hoang-nam",
  avatar: null,
  bio_vi: "Tổng biên tập, chuyên gia phân tích thị trường ô tô Việt Nam hơn 10 năm.",
  bio_en: "Editor-in-chief, expert analyst with over 10 years in the Vietnamese automotive market.",
  role: "editor",
  social_links: { linkedin: "https://linkedin.com" },
};

export const mockFeaturedArticle: ArticleCard = {
  id: "1",
  title_vi: "VinFast VF 9 2026: SUV điện Việt Nam có đủ sức cạnh tranh toàn cầu?",
  title_en: "VinFast VF 9 2026: Can Vietnam's Electric SUV Compete Globally?",
  slug_vi: "vinfast-vf9-2026-danh-gia",
  slug_en: "vinfast-vf9-2026-review",
  excerpt_vi: "Chúng tôi đã lái thử VF 9 bản nâng cấp 2026 hơn 1.000km từ Hà Nội đến Đà Nẵng. Đây là nhận xét chi tiết sau hành trình xuyên Việt.",
  excerpt_en: "We drove the updated VF 9 2026 over 1,000km from Hanoi to Da Nang. Here's our detailed verdict after the cross-Vietnam journey.",
  featured_image: "",
  category: "review",
  author: authorDuc,
  score: 9,
  published_at: "2026-05-16T08:00:00Z",
  reading_time_minutes: 12,
  is_featured: true,
  review_badge: "first_drive",
  view_count: 42800,
};

export const mockLatestNews: ArticleCard[] = [
  {
    id: "2",
    title_vi: "Toyota bZ4X chính thức ra mắt tại Việt Nam, giá từ 1,2 tỷ đồng",
    title_en: "Toyota bZ4X officially launches in Vietnam, starting from 1.2 billion VND",
    slug_vi: "toyota-bz4x-ra-mat-viet-nam",
    slug_en: "toyota-bz4x-launches-vietnam",
    excerpt_vi: "Toyota chính thức đưa mẫu SUV điện bZ4X vào thị trường Việt Nam với mức giá cạnh tranh.",
    excerpt_en: "Toyota officially brings the bZ4X electric SUV to the Vietnamese market at a competitive price.",
    featured_image: "",
    category: "news",
    author: authorBao,
    score: null,
    published_at: "2026-05-15T10:00:00Z",
    reading_time_minutes: 4,
    is_featured: false,
    review_badge: null,
    view_count: 18400,
  },
  {
    id: "3",
    title_vi: "Thuế tiêu thụ đặc biệt xe điện 2026: Những thay đổi quan trọng cần biết",
    title_en: "2026 EV Special Consumption Tax: Key Changes You Need to Know",
    slug_vi: "thue-tieu-thu-dac-biet-xe-dien-2026",
    slug_en: "ev-special-consumption-tax-2026",
    excerpt_vi: "Bộ Tài chính vừa công bố điều chỉnh thuế tiêu thụ đặc biệt mới cho xe điện.",
    excerpt_en: "The Ministry of Finance has announced new special consumption tax adjustments for electric vehicles.",
    featured_image: "",
    category: "news",
    author: authorNam,
    score: null,
    published_at: "2026-05-14T09:00:00Z",
    reading_time_minutes: 5,
    is_featured: false,
    review_badge: null,
    view_count: 24100,
  },
  {
    id: "4",
    title_vi: "Hyundai Santa Fe 2026 ra mắt phiên bản Hybrid tại Việt Nam",
    title_en: "Hyundai Santa Fe 2026 Hybrid variant launches in Vietnam",
    slug_vi: "hyundai-santa-fe-2026-hybrid-viet-nam",
    slug_en: "hyundai-santa-fe-2026-hybrid-vietnam",
    excerpt_vi: "Hyundai bổ sung phiên bản Hybrid cho Santa Fe 2026, đáp ứng xu hướng tiết kiệm nhiên liệu.",
    excerpt_en: "Hyundai adds a Hybrid variant to the Santa Fe 2026, meeting fuel efficiency trends.",
    featured_image: "",
    category: "news",
    author: authorBao,
    score: null,
    published_at: "2026-05-13T11:00:00Z",
    reading_time_minutes: 3,
    is_featured: false,
    review_badge: null,
    view_count: 15600,
  },
  {
    id: "5",
    title_vi: "BMW i5 M60 — Sedan điện mạnh nhất BMW có gì đặc biệt?",
    title_en: "BMW i5 M60 — What Makes BMW's Most Powerful Electric Sedan Special?",
    slug_vi: "bmw-i5-m60-danh-gia",
    slug_en: "bmw-i5-m60-review",
    excerpt_vi: "BMW i5 M60 với 601 mã lực và khả năng tăng tốc 0-100 km/h chỉ trong 3,8 giây.",
    excerpt_en: "The BMW i5 M60 packs 601 horsepower and accelerates from 0-100 km/h in just 3.8 seconds.",
    featured_image: "",
    category: "news",
    author: authorDuc,
    score: null,
    published_at: "2026-05-12T08:30:00Z",
    reading_time_minutes: 6,
    is_featured: false,
    review_badge: null,
    view_count: 19200,
  },
];

export const mockAllNews: ArticleCard[] = [
  ...mockLatestNews,
  {
    id: "n5",
    title_vi: "Kia EV6 GT 2026 cập bến Việt Nam: Giá 2,1 tỷ, hiệu suất 584 mã lực",
    title_en: "Kia EV6 GT 2026 arrives in Vietnam: 2.1 billion VND, 584hp performance",
    slug_vi: "kia-ev6-gt-2026-viet-nam",
    slug_en: "kia-ev6-gt-2026-vietnam",
    excerpt_vi: "Kia EV6 GT bản hiệu suất cao chính thức ra mắt với động cơ kép cho 584 mã lực.",
    excerpt_en: "The Kia EV6 GT high-performance variant officially launches with dual motors delivering 584hp.",
    featured_image: "",
    category: "news",
    author: authorBao,
    score: null,
    published_at: "2026-05-11T09:00:00Z",
    reading_time_minutes: 4,
    is_featured: false,
    review_badge: null,
    view_count: 14200,
  },
  {
    id: "n6",
    title_vi: "Mercedes-Benz GLC 2026: Nâng cấp nhẹ với nhiều công nghệ mới",
    title_en: "Mercedes-Benz GLC 2026: Minor refresh with many new technologies",
    slug_vi: "mercedes-glc-2026-nang-cap",
    slug_en: "mercedes-glc-2026-refresh",
    excerpt_vi: "GLC 2026 nhận được cập nhật giao diện và nhiều tính năng ADAS tiên tiến hơn.",
    excerpt_en: "The GLC 2026 receives interface updates and more advanced ADAS features.",
    featured_image: "",
    category: "news",
    author: authorNam,
    score: null,
    published_at: "2026-05-10T08:00:00Z",
    reading_time_minutes: 3,
    is_featured: false,
    review_badge: null,
    view_count: 11800,
  },
  {
    id: "n7",
    title_vi: "Honda HR-V 2026 về đại lý: Thiết kế mới, thêm phiên bản e:HEV",
    title_en: "Honda HR-V 2026 at dealers: New design, added e:HEV variant",
    slug_vi: "honda-hr-v-2026-dai-ly",
    slug_en: "honda-hr-v-2026-dealers",
    excerpt_vi: "Honda HR-V thế hệ mới cập bến đại lý với diện mạo trẻ trung và lần đầu có phiên bản hybrid.",
    excerpt_en: "The new Honda HR-V generation arrives at dealers with a fresh look and first-ever hybrid variant.",
    featured_image: "",
    category: "news",
    author: authorBao,
    score: null,
    published_at: "2026-05-09T10:30:00Z",
    reading_time_minutes: 3,
    is_featured: false,
    review_badge: null,
    view_count: 13500,
  },
  {
    id: "n8",
    title_vi: "Top 5 xe sedan giá dưới 1 tỷ đáng mua nhất năm 2026",
    title_en: "Top 5 Sedans Under 1 Billion VND Worth Buying in 2026",
    slug_vi: "top-5-sedan-duoi-1-ty-2026",
    slug_en: "top-5-sedans-under-1-billion-2026",
    excerpt_vi: "Phân khúc sedan tầm trung đang có rất nhiều lựa chọn hấp dẫn, đây là 5 cái tên nổi bật nhất.",
    excerpt_en: "The mid-range sedan segment has many attractive options — here are the 5 standout names.",
    featured_image: "",
    category: "advice",
    author: authorNam,
    score: null,
    published_at: "2026-05-08T07:00:00Z",
    reading_time_minutes: 7,
    is_featured: false,
    review_badge: null,
    view_count: 31700,
  },
  {
    id: "n9",
    title_vi: "Mazda CX-3 2026 ra mắt: Crossover đô thị giá từ 629 triệu đồng",
    title_en: "Mazda CX-3 2026 launches: Urban crossover from 629 million VND",
    slug_vi: "mazda-cx3-2026-ra-mat",
    slug_en: "mazda-cx3-2026-launch",
    excerpt_vi: "Mazda CX-3 2026 nhận cập nhật thiết kế và nâng cấp trang bị tiêu chuẩn toàn diện.",
    excerpt_en: "The Mazda CX-3 2026 receives design updates and comprehensive standard equipment upgrades.",
    featured_image: "",
    category: "news",
    author: authorDuc,
    score: null,
    published_at: "2026-05-07T09:00:00Z",
    reading_time_minutes: 4,
    is_featured: false,
    review_badge: null,
    view_count: 16300,
  },
];

export const mockMostViewed: Array<{ id: string; title_vi: string; title_en: string; slug_vi: string; view_count: number }> = [
  { id: "m1", title_vi: "Top 10 xe bán chạy nhất tháng 4/2026", title_en: "Top 10 Best-Selling Cars in April 2026", slug_vi: "top-10-xe-ban-chay-thang-4-2026", view_count: 128400 },
  { id: "m2", title_vi: "So sánh Honda CR-V vs Mazda CX-5 2026", title_en: "Honda CR-V vs Mazda CX-5 2026 Comparison", slug_vi: "so-sanh-honda-crv-mazda-cx5-2026", view_count: 96200 },
  { id: "m3", title_vi: "VinFast VF 3 — Xe điện mini giá rẻ nhất Việt Nam", title_en: "VinFast VF 3 — Cheapest Mini EV in Vietnam", slug_vi: "vinfast-vf3-danh-gia", view_count: 84700 },
  { id: "m4", title_vi: "Bảng giá xe Toyota cập nhật tháng 5/2026", title_en: "Toyota Price List Updated May 2026", slug_vi: "bang-gia-toyota-thang-5-2026", view_count: 73100 },
  { id: "m5", title_vi: "Nên mua xe gì tầm 700 triệu năm 2026?", title_en: "Best Cars Under 700 Million VND in 2026", slug_vi: "nen-mua-xe-gi-700-trieu-2026", view_count: 65800 },
];

export const mockLatestReviews: ArticleCard[] = [
  {
    id: "r1",
    title_vi: "Mazda CX-80 2026: SUV 3 hàng ghế sang trọng nhất phân khúc",
    title_en: "Mazda CX-80 2026: The Most Luxurious 3-Row SUV in Its Segment",
    slug_vi: "mazda-cx80-2026-danh-gia",
    slug_en: "mazda-cx80-2026-review",
    excerpt_vi: "Mazda CX-80 mang đến trải nghiệm lái premium hiếm có trong tầm giá 1,5 tỷ đồng.",
    excerpt_en: "The Mazda CX-80 delivers a rare premium driving experience in the 1.5 billion VND range.",
    featured_image: "",
    category: "review",
    author: authorBao,
    score: 8,
    published_at: "2026-05-10T09:00:00Z",
    reading_time_minutes: 10,
    is_featured: false,
    review_badge: "first_drive",
    view_count: 31200,
  },
  {
    id: "r2",
    title_vi: "Honda Civic RS 2026: Có xứng đáng với mức giá gần 900 triệu?",
    title_en: "Honda Civic RS 2026: Is It Worth the Nearly 900 Million VND Price Tag?",
    slug_vi: "honda-civic-rs-2026-danh-gia",
    slug_en: "honda-civic-rs-2026-review",
    excerpt_vi: "Honda Civic thế hệ mới nâng cấp nhiều công nghệ, nhưng giá cũng tăng đáng kể so với người tiền nhiệm.",
    excerpt_en: "The new Honda Civic upgrades a lot of tech, but the price has also risen significantly.",
    featured_image: "",
    category: "review",
    author: authorNam,
    score: 7,
    published_at: "2026-05-08T10:00:00Z",
    reading_time_minutes: 8,
    is_featured: false,
    review_badge: "detailed_review",
    view_count: 28900,
  },
  {
    id: "r3",
    title_vi: "6 tháng với VinFast VF 8: Chi phí vận hành thực tế ra sao?",
    title_en: "6 Months with VinFast VF 8: What Are the Real Running Costs?",
    slug_vi: "vinfast-vf8-6-thang-su-dung",
    slug_en: "vinfast-vf8-6-months-ownership",
    excerpt_vi: "Sau 15.000km và 6 tháng sử dụng, chúng tôi có câu trả lời chi tiết về chi phí vận hành thực tế.",
    excerpt_en: "After 15,000km and 6 months of use, we have detailed answers about actual running costs.",
    featured_image: "",
    category: "review",
    author: authorDuc,
    score: 9,
    published_at: "2026-05-05T08:00:00Z",
    reading_time_minutes: 15,
    is_featured: false,
    review_badge: "long_term",
    view_count: 47300,
  },
];

export const mockAllReviews: ArticleCard[] = [
  ...mockLatestReviews,
  {
    id: "r4",
    title_vi: "Toyota Camry 2.5Q 2026: Vẫn là chuẩn mực sedan hạng D tại VN",
    title_en: "Toyota Camry 2.5Q 2026: Still the D-segment Sedan Benchmark in Vietnam",
    slug_vi: "toyota-camry-2026-danh-gia",
    slug_en: "toyota-camry-2026-review",
    excerpt_vi: "Camry 2026 nhận nâng cấp nhẹ nhưng vẫn giữ vững vị thế đầu bảng phân khúc D tại Việt Nam.",
    excerpt_en: "The Camry 2026 gets a mild refresh but maintains its top position in Vietnam's D-segment.",
    featured_image: "",
    category: "review",
    author: authorNam,
    score: 8,
    published_at: "2026-05-01T08:00:00Z",
    reading_time_minutes: 11,
    is_featured: false,
    review_badge: "detailed_review",
    view_count: 38900,
  },
  {
    id: "r5",
    title_vi: "Kia Sorento Hybrid 2026 vs Hyundai Santa Fe HEV: Anh em đối địch",
    title_en: "Kia Sorento Hybrid 2026 vs Hyundai Santa Fe HEV: Sibling Rivals",
    slug_vi: "kia-sorento-vs-hyundai-santa-fe-2026",
    slug_en: "kia-sorento-vs-hyundai-santa-fe-2026",
    excerpt_vi: "Hai mẫu SUV Hybrid anh em từ Hàn Quốc so tài trực tiếp trên cùng cung đường.",
    excerpt_en: "Two sibling Korean Hybrid SUVs face off directly on the same road.",
    featured_image: "",
    category: "comparison",
    author: authorDuc,
    score: null,
    published_at: "2026-04-28T08:00:00Z",
    reading_time_minutes: 14,
    is_featured: false,
    review_badge: "comparison",
    view_count: 52100,
  },
  {
    id: "r6",
    title_vi: "Mitsubishi Outlander PHEV 2026: Plug-in tốt nhất tầm giá 1,4 tỷ?",
    title_en: "Mitsubishi Outlander PHEV 2026: Best Plug-in Around 1.4 Billion VND?",
    slug_vi: "mitsubishi-outlander-phev-2026-danh-gia",
    slug_en: "mitsubishi-outlander-phev-2026-review",
    excerpt_vi: "Outlander PHEV 2026 cung cấp tầm chạy điện 84km và hệ dẫn động 4WD điện độc đáo.",
    excerpt_en: "The Outlander PHEV 2026 offers 84km electric range and a unique electric 4WD system.",
    featured_image: "",
    category: "review",
    author: authorBao,
    score: 8,
    published_at: "2026-04-22T09:00:00Z",
    reading_time_minutes: 9,
    is_featured: false,
    review_badge: "first_drive",
    view_count: 22800,
  },
];

// Full Article objects for detail pages
export const mockArticleDetail: Article = {
  id: "1",
  title_vi: "VinFast VF 9 2026: SUV điện Việt Nam có đủ sức cạnh tranh toàn cầu?",
  title_en: "VinFast VF 9 2026: Can Vietnam's Electric SUV Compete Globally?",
  slug_vi: "vinfast-vf9-2026-danh-gia",
  slug_en: "vinfast-vf9-2026-review",
  excerpt_vi: "Chúng tôi đã lái thử VF 9 bản nâng cấp 2026 hơn 1.000km từ Hà Nội đến Đà Nẵng. Đây là nhận xét chi tiết sau hành trình xuyên Việt.",
  excerpt_en: "We drove the updated VF 9 2026 over 1,000km from Hanoi to Da Nang. Here's our detailed verdict after the cross-Vietnam journey.",
  content_vi: `
<p>Khi VinFast lần đầu tiên công bố VF 9 vào năm 2022, không ít người hoài nghi về khả năng một thương hiệu xe điện non trẻ của Việt Nam có thể cạnh tranh với những tên tuổi lớn như Tesla, Hyundai hay BMW. Bốn năm sau, với bản nâng cấp 2026, câu trả lời đang dần trở nên rõ ràng hơn.</p>

<h2>Ngoại thất: Trưởng thành và tự tin hơn</h2>
<p>VF 9 2026 nhận được những cập nhật ngoại thất tinh tế nhưng đáng kể. Lưới tản nhiệt giả phía trước được thiết kế lại với họa tiết kim cương đặc trưng, cụm đèn pha Matrix LED được tinh chỉnh cho ánh sáng đều và sắc nét hơn. Kích thước tổng thể không thay đổi: dài 5.050mm, rộng 1.999mm, cao 1.750mm — vẫn là một trong những SUV 3 hàng ghế lớn nhất phân khúc.</p>

<p>Màu sắc mới <strong>Cosmic Black Pearl</strong> trở thành điểm nhấn của dải màu 2026, phản chiếu ánh sáng theo cách mà những màu đơn sắc thông thường không làm được. Bộ mâm 22 inch thiết kế mới hoàn thiện diện mạo đáng tiền của chiếc xe.</p>

<h2>Nội thất: Nơi VF 9 thực sự tỏa sáng</h2>
<p>Ngồi vào khoang lái VF 9 2026, điều đầu tiên gây ấn tượng là không gian. Hàng ghế thứ nhất rộng rãi với ghế ngồi bọc da Nappa cao cấp, massage 12 điểm và thông gió tích hợp. Màn hình trung tâm 15,6 inch chạy hệ thống giải trí mới dựa trên Android Automotive với thời gian phản hồi nhanh hơn đáng kể so với thế hệ trước.</p>

<p>Hàng ghế thứ hai nhận được nâng cấp lớn nhất: 3 ghế điều chỉnh điện độc lập, mỗi ghế có màn hình riêng 10 inch và cổng sạc USB-C. Hàng ghế thứ ba vẫn phù hợp với trẻ em và người lớn tầm vóc nhỏ cho hành trình ngắn.</p>

<h2>Vận hành: Điểm mạnh nhất của phiên bản 2026</h2>
<p>VF 9 Plus 2026 sử dụng cấu hình dual-motor tổng công suất 402 mã lực, mô-men xoắn 640 Nm. Con số tăng tốc 0-100 km/h trong 5,9 giây không phải là thứ nhanh nhất phân khúc, nhưng điều thực sự ấn tượng là cách nó phân phối lực kéo: êm ái, tuyến tính và đầy tự tin ở mọi tốc độ.</p>

<p>Trên hành trình 1.000km từ Hà Nội đến Đà Nẵng, chúng tôi sử dụng chế độ <strong>Eco</strong> cho đại lộ và <strong>Sport</strong> khi vào những đoạn đèo. Hệ thống phanh tái sinh có 3 cấp độ điều chỉnh — một tính năng mà nhiều đối thủ tầm trên vẫn chưa có.</p>

<h2>Tầm hoạt động: Thực tế hơn quảng cáo</h2>
<p>VinFast công bố tầm hoạt động 550km theo chu trình WLTP. Thực tế trong hành trình của chúng tôi, với điều hòa bật liên tục ở 24°C và tốc độ trung bình 90 km/h, chúng tôi đạt 487km trước khi cần sạc — tương đương 88% con số quảng cáo. Đây là tỷ lệ khá tốt so với nhiều đối thủ thường chỉ đạt 75-80%.</p>

<p>Mạng lưới trạm sạc V-Green phủ sóng tốt dọc quốc lộ 1A và cao tốc Bắc-Nam, với tốc độ sạc nhanh DC lên đến 150kW cho phép bổ sung 200km chỉ trong 20 phút.</p>

<h2>Kết luận</h2>
<p>VinFast VF 9 2026 không hoàn hảo — hệ thống infotainment đôi khi vẫn có độ trễ nhỏ, và một vài chi tiết hoàn thiện nội thất vẫn chưa đạt đến tiêu chuẩn của các thương hiệu premium Châu Âu. Nhưng tổng thể, đây là một chiếc SUV điện đáng tiền ở mức giá 1,89 tỷ đồng, và là minh chứng rõ ràng nhất cho thấy VinFast đang tiến bộ rất nhanh.</p>
  `,
  content_en: `
<p>When VinFast first announced the VF 9 in 2022, many were skeptical about a young Vietnamese electric car brand competing against established names like Tesla, Hyundai, or BMW. Four years later, with the 2026 update, the answer is becoming increasingly clear.</p>

<h2>Exterior: More Mature and Confident</h2>
<p>The VF 9 2026 receives subtle but significant exterior updates. The front false grille has been redesigned with a signature diamond pattern, and the Matrix LED headlights have been refined for more even and precise illumination. Overall dimensions remain unchanged: 5,050mm long, 1,999mm wide, 1,750mm tall — still one of the largest 3-row SUVs in its segment.</p>

<h2>Interior: Where the VF 9 Truly Shines</h2>
<p>Sitting in the VF 9 2026's cabin, the first thing that impresses is the space. The front row is generous with Nappa leather seats featuring 12-point massage and integrated ventilation. The 15.6-inch central display runs a new Android Automotive-based infotainment system with noticeably faster response times than the previous generation.</p>

<h2>Driving: The 2026 Version's Strongest Point</h2>
<p>The VF 9 Plus 2026 uses a dual-motor configuration producing 402hp and 640Nm of torque. The 0-100 km/h time of 5.9 seconds isn't the quickest in class, but what's truly impressive is how it delivers power: smooth, linear, and confident at every speed.</p>

<h2>Range: More Realistic Than Advertised</h2>
<p>VinFast claims 550km of range on the WLTP cycle. In our 1,000km journey with air conditioning on at 24°C and average speed of 90 km/h, we achieved 487km before needing to charge — 88% of the advertised figure. This is quite good compared to many rivals that typically only achieve 75-80%.</p>

<h2>Verdict</h2>
<p>The VinFast VF 9 2026 isn't perfect — the infotainment occasionally has minor lag, and some interior finishing details don't quite match European premium brands. But overall, it's a worthwhile electric SUV at 1.89 billion VND, and the clearest proof yet that VinFast is improving rapidly.</p>
  `,
  featured_image: "",
  gallery: [],
  category: "review",
  subcategory: null,
  tags: ["VinFast", "VF9", "SUV điện", "xe điện", "đánh giá"],
  author: authorDuc,
  related_cars: [],
  score: 9,
  score_design: 9,
  score_performance: 8,
  score_comfort: 9,
  score_tech: 8,
  score_value: 9,
  pros: [
    "Không gian nội thất rộng rãi, đặc biệt hàng ghế 2",
    "Tầm hoạt động thực tế ấn tượng (487km)",
    "Mạng lưới sạc V-Green phủ rộng toàn quốc",
    "Giá bán cạnh tranh so với đối thủ cùng phân khúc",
    "Hệ thống phanh tái sinh đa cấp tiện dụng",
  ],
  cons: [
    "Infotainment đôi khi có độ trễ nhỏ",
    "Hoàn thiện nội thất chưa đạt chuẩn premium Châu Âu",
    "Hàng ghế thứ 3 chỉ phù hợp cho trẻ em",
    "Chưa có tính năng Vehicle-to-Load (V2L)",
  ],
  verdict_vi: "VinFast VF 9 2026 là một bước tiến đáng kể — đủ tốt để cạnh tranh trực tiếp với các đối thủ từ Hàn Quốc và Nhật Bản, và ở một vài khía cạnh còn vượt trội. Đây là sự lựa chọn đáng cân nhắc cho gia đình cần xe SUV 7 chỗ điện tại Việt Nam.",
  verdict_en: "The VinFast VF 9 2026 is a significant step forward — good enough to compete directly with Korean and Japanese rivals, and in some aspects even surpasses them. A worthwhile choice for families needing a 7-seat electric SUV in Vietnam.",
  status: "published",
  published_at: "2026-05-16T08:00:00Z",
  updated_at: "2026-05-16T08:00:00Z",
  reading_time_minutes: 12,
  is_featured: true,
  review_badge: "first_drive",
  seo: {
    meta_title: "VinFast VF 9 2026: Đánh giá chi tiết sau 1.000km | TechDrive",
    meta_description: "Đánh giá toàn diện VinFast VF 9 2026 sau hành trình 1.000km. Thiết kế, vận hành, tầm xa, nội thất và giá bán.",
    og_image: null,
  },
  view_count: 42800,
};

// Map slug to full article for lookup
export const mockArticlesBySlug: Record<string, Article> = {
  "vinfast-vf9-2026-danh-gia": mockArticleDetail,
  "vinfast-vf9-2026-review": mockArticleDetail,
};

// All articles combined (for listing pages)
export const mockAllArticles: ArticleCard[] = [
  mockFeaturedArticle,
  ...mockAllNews,
  ...mockAllReviews,
];
