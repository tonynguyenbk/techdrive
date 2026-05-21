'use strict';

// ── Authors ───────────────────────────────────────────────────────────────────

const seedAuthors = [
  {
    name: 'Nguyễn Minh Đức',
    bio_vi: 'Biên tập viên cao cấp với 8 năm kinh nghiệm lái thử và đánh giá xe tại Việt Nam và quốc tế. Chuyên sâu về xe điện và công nghệ ô tô mới.',
    bio_en: 'Senior editor with 8 years of car testing and reviewing experience in Vietnam and internationally. Specialises in EVs and new automotive technology.',
    role: 'journalist',
  },
  {
    name: 'Trần Quốc Bảo',
    bio_vi: 'Nhà báo xe hơi chuyên về thị trường xe Nhật và Hàn tại Việt Nam. Đã thực hiện hơn 200 bài lái thử xe.',
    bio_en: 'Automotive journalist specialising in Japanese and Korean cars in Vietnam. Has conducted over 200 car test drives.',
    role: 'journalist',
  },
  {
    name: 'Lê Hoàng Nam',
    bio_vi: 'Tổng biên tập, chuyên gia phân tích thị trường ô tô Việt Nam hơn 10 năm. Cố vấn cho nhiều chương trình mua xe của VTV và VTC.',
    bio_en: 'Editor-in-chief and market analyst with over 10 years in the Vietnamese automotive industry. Advisor to VTV and VTC car-buying programmes.',
    role: 'editor',
  },
];

// ── Car Brands ────────────────────────────────────────────────────────────────

const seedCarBrands = [
  { name_vi: 'Toyota', name_en: 'Toyota', slug: 'toyota', flag_emoji: '🇯🇵', country_of_origin: 'Japan', display_order: 1 },
  { name_vi: 'Honda', name_en: 'Honda', slug: 'honda', flag_emoji: '🇯🇵', country_of_origin: 'Japan', display_order: 2 },
  { name_vi: 'VinFast', name_en: 'VinFast', slug: 'vinfast', flag_emoji: '🇻🇳', country_of_origin: 'Vietnam', display_order: 3 },
  { name_vi: 'Hyundai', name_en: 'Hyundai', slug: 'hyundai', flag_emoji: '🇰🇷', country_of_origin: 'South Korea', display_order: 4 },
  { name_vi: 'Mazda', name_en: 'Mazda', slug: 'mazda', flag_emoji: '🇯🇵', country_of_origin: 'Japan', display_order: 5 },
  { name_vi: 'Kia', name_en: 'Kia', slug: 'kia', flag_emoji: '🇰🇷', country_of_origin: 'South Korea', display_order: 6 },
  { name_vi: 'Mitsubishi', name_en: 'Mitsubishi', slug: 'mitsubishi', flag_emoji: '🇯🇵', country_of_origin: 'Japan', display_order: 7 },
  { name_vi: 'Ford', name_en: 'Ford', slug: 'ford', flag_emoji: '🇺🇸', country_of_origin: 'USA', display_order: 8 },
  { name_vi: 'Mercedes-Benz', name_en: 'Mercedes-Benz', slug: 'mercedes-benz', flag_emoji: '🇩🇪', country_of_origin: 'Germany', display_order: 9 },
  { name_vi: 'BMW', name_en: 'BMW', slug: 'bmw', flag_emoji: '🇩🇪', country_of_origin: 'Germany', display_order: 10 },
  { name_vi: 'MG', name_en: 'MG', slug: 'mg', flag_emoji: '🇬🇧', country_of_origin: 'UK', display_order: 11 },
];

// ── Car Models ────────────────────────────────────────────────────────────────

const seedCarModels = [
  // — Toyota —
  {
    brandSlug: 'toyota',
    name: 'Vios',
    slug: 'vios',
    segment: 'sedan',
    body_type: 'Sedan hạng B',
    year_from: 2023,
    price_from: 479000000,
    price_to: 569000000,
    status: 'on_sale',
    description_vi: 'Sedan hạng B bán chạy nhất Việt Nam, đánh giá cao về độ bền và chi phí bảo dưỡng thấp.',
    description_en: "Vietnam's best-selling B-segment sedan, highly regarded for durability and low maintenance costs.",
    our_rating: 7.2,
  },
  {
    brandSlug: 'toyota',
    name: 'Camry',
    slug: 'camry',
    segment: 'sedan',
    body_type: 'Sedan hạng D',
    year_from: 2024,
    price_from: 1235000000,
    price_to: 1455000000,
    status: 'on_sale',
    description_vi: 'Sedan hạng D bán chạy nhất phân khúc tại Việt Nam, biểu tượng của sự tin cậy và đẳng cấp.',
    description_en: "Best-selling D-segment sedan in Vietnam, a symbol of reliability and prestige.",
    our_rating: 8.0,
  },
  {
    brandSlug: 'toyota',
    name: 'Fortuner',
    slug: 'fortuner',
    segment: 'suv',
    body_type: 'SUV body-on-frame 7 chỗ',
    year_from: 2024,
    price_from: 1170000000,
    price_to: 1545000000,
    status: 'on_sale',
    description_vi: 'SUV địa hình 7 chỗ bền bỉ, vua phân khúc bán tải nâng tầm tại Việt Nam.',
    description_en: 'Rugged 7-seat off-road SUV, dominant in the elevated truck-based SUV segment in Vietnam.',
    our_rating: 7.8,
  },
  {
    brandSlug: 'toyota',
    name: 'Corolla Cross',
    slug: 'corolla-cross',
    segment: 'suv',
    body_type: 'SUV Crossover',
    year_from: 2025,
    price_from: 746000000,
    price_to: 916000000,
    status: 'on_sale',
    description_vi: 'Crossover đô thị của Toyota, kết hợp thiết kế thể thao với công nghệ hybrid tiết kiệm nhiên liệu.',
    description_en: "Toyota's urban crossover, combining sporty design with fuel-saving hybrid technology.",
    our_rating: 8.1,
  },
  {
    brandSlug: 'toyota',
    name: 'Veloz Cross',
    slug: 'veloz-cross',
    segment: 'mpv',
    body_type: 'MPV 7 chỗ',
    year_from: 2022,
    price_from: 648000000,
    price_to: 726000000,
    status: 'on_sale',
    description_vi: 'MPV 7 chỗ giá tầm trung, không gian rộng rãi, phù hợp gia đình nhiều thế hệ.',
    description_en: 'Mid-range 7-seat MPV with a spacious interior, ideal for multi-generational families.',
    our_rating: 7.6,
  },
  // — Honda —
  {
    brandSlug: 'honda',
    name: 'City',
    slug: 'city',
    segment: 'sedan',
    body_type: 'Sedan hạng B+',
    year_from: 2024,
    price_from: 559000000,
    price_to: 629000000,
    status: 'on_sale',
    description_vi: 'Sedan hạng B lịch lãm của Honda, ưu điểm nổi bật về không gian nội thất và trang bị an toàn.',
    description_en: "Honda's elegant B-segment sedan, praised for interior space and safety equipment.",
    our_rating: 7.8,
  },
  {
    brandSlug: 'honda',
    name: 'Civic',
    slug: 'civic',
    segment: 'sedan',
    body_type: 'Sedan hạng C',
    year_from: 2022,
    price_from: 730000000,
    price_to: 870000000,
    status: 'on_sale',
    description_vi: 'Sedan hạng C thể thao hàng đầu của Honda, được giới trẻ yêu thích vì thiết kế đẹp và lái thú vị.',
    description_en: "Honda's leading sporty C-segment sedan, popular with younger buyers for its design and driving enjoyment.",
    our_rating: 7.5,
  },
  {
    brandSlug: 'honda',
    name: 'HR-V',
    slug: 'hr-v',
    segment: 'suv',
    body_type: 'Crossover hạng B',
    year_from: 2022,
    price_from: 699000000,
    price_to: 871000000,
    status: 'on_sale',
    description_vi: 'Crossover hạng B của Honda với thiết kế cá tính và bản RS thể thao ấn tượng.',
    description_en: "Honda's B-segment crossover with a distinctive design and an impressive sporty RS trim.",
    our_rating: 7.9,
  },
  {
    brandSlug: 'honda',
    name: 'CR-V',
    slug: 'cr-v',
    segment: 'suv',
    body_type: 'SUV 5 chỗ Hybrid',
    year_from: 2023,
    price_from: 998000000,
    price_to: 1178000000,
    status: 'on_sale',
    description_vi: 'SUV C tầm trung của Honda, bản hybrid tiết kiệm nhiên liệu vượt trội trong phân khúc.',
    description_en: "Honda's mid-size C-segment SUV; the hybrid version offers outstanding fuel economy for the class.",
    our_rating: 8.2,
  },
  // — Mazda —
  {
    brandSlug: 'mazda',
    name: 'Mazda3',
    slug: 'mazda3',
    segment: 'sedan',
    body_type: 'Sedan hạng C',
    year_from: 2024,
    price_from: 659000000,
    price_to: 829000000,
    status: 'on_sale',
    description_vi: 'Sedan hạng C đẹp nhất phân khúc với triết lý thiết kế Kodo và công nghệ e-Skyactiv.',
    description_en: "The most beautiful C-segment sedan with Kodo design philosophy and e-Skyactiv technology.",
    our_rating: 8.0,
  },
  {
    brandSlug: 'mazda',
    name: 'CX-5',
    slug: 'cx-5',
    segment: 'suv',
    body_type: 'SUV 5 chỗ',
    year_from: 2022,
    price_from: 759000000,
    price_to: 969000000,
    status: 'on_sale',
    description_vi: 'SUV crossover cao cấp nhất phân khúc tầm trung, nổi tiếng với thiết kế đẹp và vận hành tốt.',
    description_en: 'The most premium mid-range crossover SUV, known for beautiful design and driving dynamics.',
    our_rating: 8.5,
  },
  {
    brandSlug: 'mazda',
    name: 'CX-8',
    slug: 'cx-8',
    segment: 'suv',
    body_type: 'SUV 6–7 chỗ',
    year_from: 2023,
    price_from: 1149000000,
    price_to: 1199000000,
    status: 'on_sale',
    description_vi: 'SUV 3 hàng ghế cao cấp của Mazda, lựa chọn sang trọng cho gia đình đông người.',
    description_en: "Mazda's premium 3-row SUV, a luxurious choice for large families.",
    our_rating: 8.3,
  },
  // — Hyundai —
  {
    brandSlug: 'hyundai',
    name: 'Accent',
    slug: 'accent',
    segment: 'sedan',
    body_type: 'Sedan hạng B',
    year_from: 2023,
    price_from: 486000000,
    price_to: 569000000,
    status: 'on_sale',
    description_vi: 'Sedan hạng B thiết kế trẻ trung của Hyundai, cạnh tranh trực tiếp với Toyota Vios.',
    description_en: "Hyundai's youthful B-segment sedan, competing directly with the Toyota Vios.",
    our_rating: 7.3,
  },
  {
    brandSlug: 'hyundai',
    name: 'Creta',
    slug: 'creta',
    segment: 'suv',
    body_type: 'Crossover hạng B+',
    year_from: 2024,
    price_from: 599000000,
    price_to: 699000000,
    status: 'on_sale',
    description_vi: 'Crossover nhỏ gọn của Hyundai với thiết kế hiện đại và nhiều công nghệ vượt tầm giá.',
    description_en: "Hyundai's compact crossover with modern design and above-class technology.",
    our_rating: 7.8,
  },
  {
    brandSlug: 'hyundai',
    name: 'Tucson',
    slug: 'tucson',
    segment: 'suv',
    body_type: 'SUV 5 chỗ',
    year_from: 2022,
    price_from: 824000000,
    price_to: 1040000000,
    status: 'on_sale',
    description_vi: 'SUV hạng C thiết kế táo bạo của Hyundai, cạnh tranh gay gắt với Mazda CX-5 và Honda CR-V.',
    description_en: "Hyundai's bold-designed C-segment SUV, competing fiercely with the Mazda CX-5 and Honda CR-V.",
    our_rating: 7.9,
  },
  {
    brandSlug: 'hyundai',
    name: 'Santa Fe',
    slug: 'santa-fe',
    segment: 'suv',
    body_type: 'SUV 7 chỗ',
    year_from: 2024,
    price_from: 1080000000,
    price_to: 1380000000,
    status: 'on_sale',
    description_vi: 'SUV 7 chỗ flagship của Hyundai tại Việt Nam với nhiều công nghệ hiện đại hàng đầu phân khúc.',
    description_en: "Hyundai's flagship 7-seat SUV in Vietnam, packed with segment-leading technology.",
    our_rating: 8.3,
  },
  // — Kia —
  {
    brandSlug: 'kia',
    name: 'Morning',
    slug: 'morning',
    segment: 'hatchback',
    body_type: 'Hatchback đô thị',
    year_from: 2021,
    price_from: 399000000,
    price_to: 459000000,
    status: 'on_sale',
    description_vi: 'Hatchback đô thị nhỏ gọn nhất Kia, dễ lái dễ đỗ, tiêu thụ nhiên liệu rất thấp.',
    description_en: "Kia's smallest urban hatchback, easy to drive and park, with very low fuel consumption.",
    our_rating: 6.8,
  },
  {
    brandSlug: 'kia',
    name: 'Seltos',
    slug: 'seltos',
    segment: 'suv',
    body_type: 'Crossover hạng B',
    year_from: 2023,
    price_from: 599000000,
    price_to: 799000000,
    status: 'on_sale',
    description_vi: 'Crossover hạng B cá tính nhất phân khúc, trang bị đồ nhiều và giá trị mua lại tốt.',
    description_en: 'The most characterful B-segment crossover, well-equipped and with good resale value.',
    our_rating: 7.9,
  },
  {
    brandSlug: 'kia',
    name: 'Carnival',
    slug: 'carnival',
    segment: 'mpv',
    body_type: 'MPV 7–8 chỗ hạng sang',
    year_from: 2023,
    price_from: 1229000000,
    price_to: 1559000000,
    status: 'on_sale',
    description_vi: 'MPV hạng sang 7-8 chỗ, được mệnh danh là "limousine bình dân" nhờ nội thất cực kỳ sang trọng.',
    description_en: 'Luxury 7–8 seat MPV, nicknamed the "everyday limousine" for its incredibly upscale interior.',
    our_rating: 8.6,
  },
  // — Mitsubishi —
  {
    brandSlug: 'mitsubishi',
    name: 'Xpander',
    slug: 'xpander',
    segment: 'mpv',
    body_type: 'MPV 7 chỗ',
    year_from: 2023,
    price_from: 590000000,
    price_to: 670000000,
    status: 'on_sale',
    description_vi: 'MPV 7 chỗ bán chạy nhất của Mitsubishi, cân bằng tốt giữa không gian, tiết kiệm và giá cả.',
    description_en: "Mitsubishi's best-selling 7-seat MPV, striking a good balance of space, economy, and price.",
    our_rating: 7.5,
  },
  {
    brandSlug: 'mitsubishi',
    name: 'Outlander',
    slug: 'outlander',
    segment: 'suv',
    body_type: 'SUV 5 chỗ PHEV',
    year_from: 2023,
    price_from: 825000000,
    price_to: 940000000,
    status: 'on_sale',
    description_vi: 'SUV PHEV của Mitsubishi với hệ thống S-AWC và khả năng đi xa hơn 800km mỗi lần nạp đầy.',
    description_en: "Mitsubishi's PHEV SUV with S-AWC all-wheel control and a range of over 800 km on a full charge.",
    our_rating: 7.7,
  },
  // — Ford —
  {
    brandSlug: 'ford',
    name: 'Ranger',
    slug: 'ranger',
    segment: 'pickup',
    body_type: 'Bán tải 4 cửa',
    year_from: 2023,
    price_from: 659000000,
    price_to: 985000000,
    status: 'on_sale',
    description_vi: 'Bán tải bán chạy nhất Việt Nam, vua địa hình với khung gầm body-on-frame cứng cáp.',
    description_en: "Vietnam's best-selling pickup truck, king of off-road with a tough body-on-frame chassis.",
    our_rating: 8.7,
  },
  {
    brandSlug: 'ford',
    name: 'Everest',
    slug: 'everest',
    segment: 'suv',
    body_type: 'SUV body-on-frame 7 chỗ',
    year_from: 2023,
    price_from: 1112000000,
    price_to: 1499000000,
    status: 'on_sale',
    description_vi: 'SUV 7 chỗ địa hình mạnh mẽ của Ford, đối thủ xứng tầm với Toyota Fortuner.',
    description_en: "Ford's powerful 7-seat off-road SUV, a worthy rival to the Toyota Fortuner.",
    our_rating: 8.4,
  },
  // — VinFast —
  {
    brandSlug: 'vinfast',
    name: 'VF 3',
    slug: 'vf-3',
    segment: 'hatchback',
    body_type: 'Mini SUV điện',
    year_from: 2024,
    price_from: 235000000,
    price_to: 285000000,
    status: 'on_sale',
    description_vi: 'Mini SUV điện giá rẻ nhất Việt Nam, mở ra kỷ nguyên xe điện phổ thông với mức giá tầm 200 triệu.',
    description_en: "Vietnam's most affordable electric mini SUV, ushering in an era of mass-market EVs at the 200-million-dong level.",
    our_rating: 6.9,
  },
  {
    brandSlug: 'vinfast',
    name: 'VF 6',
    slug: 'vf-6',
    segment: 'suv',
    body_type: 'Crossover điện',
    year_from: 2024,
    price_from: 675000000,
    price_to: 765000000,
    status: 'on_sale',
    description_vi: 'Crossover điện tầm trung của VinFast, hướng đến phân khúc C cạnh tranh với xe xăng cùng giá.',
    description_en: "VinFast's mid-range electric crossover, targeting the C-segment against similarly-priced petrol cars.",
    our_rating: 7.6,
  },
  {
    brandSlug: 'vinfast',
    name: 'VF 8',
    slug: 'vf-8',
    segment: 'suv',
    body_type: 'SUV 5 chỗ điện',
    year_from: 2022,
    price_from: 1057000000,
    price_to: 1219000000,
    status: 'on_sale',
    description_vi: 'SUV điện 5 chỗ tầm trung của VinFast, best-seller trong phân khúc xe điện Việt Nam.',
    description_en: "VinFast's mid-range 5-seat electric SUV, best-seller in Vietnam's EV segment.",
    our_rating: 8.2,
  },
  {
    brandSlug: 'vinfast',
    name: 'VF 9',
    slug: 'vf-9',
    segment: 'suv',
    body_type: 'SUV 3 hàng ghế điện',
    year_from: 2023,
    price_from: 1890000000,
    price_to: 2090000000,
    status: 'on_sale',
    description_vi: 'SUV điện 7 chỗ hạng sang của VinFast, cạnh tranh với các mẫu SUV điện cao cấp toàn cầu.',
    description_en: "VinFast's flagship 7-seat luxury electric SUV, competing with global premium electric SUVs.",
    our_rating: 9.0,
  },
  // — MG —
  {
    brandSlug: 'mg',
    name: 'MG ZS',
    slug: 'mg-zs',
    segment: 'suv',
    body_type: 'Crossover hạng B',
    year_from: 2024,
    price_from: 519000000,
    price_to: 629000000,
    status: 'on_sale',
    description_vi: 'Crossover hạng B của MG, trang bị nhiều tiện nghi với mức giá cạnh tranh, thu hút người mua trẻ.',
    description_en: "MG's B-segment crossover, well-equipped at a competitive price, attracting younger buyers.",
    our_rating: 7.2,
  },
];

// ── Articles ──────────────────────────────────────────────────────────────────

const seedArticles = [
  // ── REVIEWS ──────────────────────────────────────────────────────────────
  {
    authorName: 'Nguyễn Minh Đức',
    title_vi: 'VinFast VF 9 2026: SUV điện Việt Nam có đủ sức cạnh tranh toàn cầu?',
    title_en: "VinFast VF 9 2026: Can Vietnam's Electric SUV Compete Globally?",
    slug_vi: 'vinfast-vf9-2026-danh-gia',
    slug_en: 'vinfast-vf9-2026-review',
    excerpt_vi: 'Chúng tôi đã lái thử VF 9 bản nâng cấp 2026 hơn 1.000km từ Hà Nội đến Đà Nẵng để trả lời câu hỏi này.',
    excerpt_en: 'We drove the updated VF 9 2026 over 1,000 km from Hanoi to Da Nang to answer this question.',
    content_vi: `<p>VinFast VF 9 2026 là phiên bản nâng cấp quan trọng nhất kể từ khi mẫu SUV điện flagship này ra mắt năm 2023. Với gói pin mới dung lượng 92 kWh, VF 9 tuyên bố tầm hoạt động lên đến 568km theo chuẩn WLTP — con số ấn tượng so với phiên bản tiền nhiệm chỉ đạt 438km.</p>

<h2>Vận hành thực tế</h2>
<p>Trong chuyến hành trình Hà Nội – Đà Nẵng, chúng tôi thực sự ghi được mức tiêu thụ 18.2 kWh/100km trên cao tốc ở tốc độ 100–110km/h. Đây là con số đáng nể với một chiếc SUV cỡ lớn 7 chỗ. Hệ thống sạc nhanh DC 150kW cho phép sạc từ 20% lên 80% chỉ trong 29 phút tại các trạm V-Green dọc đường.</p>

<h2>Không gian và tiện nghi</h2>
<p>Nội thất VF 9 2026 được nâng cấp đáng kể: màn hình trung tâm 15.6 inch chạy mượt hơn so với thế hệ trước, hệ thống âm thanh Pioneer 13 loa cho chất lượng âm thanh tốt. Hàng ghế thứ hai điện chỉnh nhớ vị trí là điểm cộng lớn. Chỉ hàng ghế thứ ba vẫn hơi hẹp cho người cao trên 1m70.</p>

<h2>Công nghệ an toàn</h2>
<p>ADAS thế hệ mới trên VF 9 2026 hoạt động đáng tin cậy hơn nhiều so với trước. Hệ thống giữ làn, kiểm soát hành trình thích ứng và tự động phanh khẩn cấp đều hoạt động ổn định trên cao tốc. Đây là bước tiến lớn của VinFast trong việc cải thiện phần mềm.</p>`,
    content_en: `<p>The VinFast VF 9 2026 is the most significant update since the flagship electric SUV's 2023 debut. With a new 92 kWh battery pack, VF 9 claims a WLTP range of 568 km — impressive compared to the previous model's 438 km.</p>

<h2>Real-World Performance</h2>
<p>During our Hanoi–Da Nang drive, we recorded a real-world consumption of 18.2 kWh/100 km on the highway at 100–110 km/h. That's commendable for a large 7-seat SUV. The 150 kW DC fast-charging system replenishes from 20% to 80% in just 29 minutes at V-Green stations along the route.</p>

<h2>Space and Comfort</h2>
<p>The VF 9 2026's interior has been notably improved: the 15.6-inch central screen runs far more smoothly than before, and the 13-speaker Pioneer audio system delivers solid quality. Electrically adjustable second-row seats with memory is a big plus. Only the third row remains a little tight for passengers over 1.7 m.</p>`,
    category: 'review',
    review_badge: 'detailed_review',
    score: 9,
    score_design: 9,
    score_performance: 8,
    score_comfort: 9,
    score_tech: 8,
    score_value: 9,
    pros: ['Tầm hoạt động thực tế tốt', 'Mạng sạc V-Green phủ rộng', 'ADAS thế hệ mới đáng tin cậy', 'Không gian 2 hàng ghế đầu rất rộng'],
    cons: ['Hàng ghế thứ 3 hẹp cho người lớn', 'Giá khá cao so với xe xăng 7 chỗ cùng tầm'],
    verdict_vi: 'VF 9 2026 là lựa chọn SUV điện 7 chỗ tốt nhất tầm 2 tỷ tại Việt Nam, đặc biệt nếu bạn thường xuyên dùng cao tốc và tiện dụng mạng sạc V-Green.',
    verdict_en: 'The VF 9 2026 is the best 7-seat electric SUV under 2 billion VND in Vietnam, especially if you regularly use highways and benefit from the V-Green charging network.',
    is_featured: true,
    reading_time_minutes: 12,
    view_count: 42800,
    tags: ['VinFast', 'VF9', 'SUV điện', 'xe điện'],
    cover_url: 'https://thuongtruong-fileserver.nvcms.net/IMAGES/2024/04/26/20240426194213-12anh-1.jpg',
    publishedAt: new Date('2026-05-10T08:00:00Z'),
  },
  {
    authorName: 'Nguyễn Minh Đức',
    title_vi: 'Mazda CX-5 2024 đánh giá: Vẫn là vua phân khúc SUV tầm trung?',
    title_en: 'Mazda CX-5 2024 Review: Still King of the Mid-Range SUV Segment?',
    slug_vi: 'mazda-cx5-2024-danh-gia',
    slug_en: 'mazda-cx5-2024-review',
    excerpt_vi: 'Sau 2 năm thống trị phân khúc, Mazda CX-5 2024 đối mặt với cạnh tranh ngày càng khốc liệt từ Tucson, CR-V và Seltos. Liệu CX-5 có giữ được ngôi vương?',
    excerpt_en: 'After 2 years dominating its segment, the Mazda CX-5 2024 faces intensifying competition from the Tucson, CR-V and Seltos. Can it hold the crown?',
    content_vi: `<p>Năm 2024, Mazda CX-5 nhận bản nâng cấp giữa vòng đời với gói trang bị mới và động cơ e-Skyactiv G 2.5L cải tiến. Dù thiết kế không thay đổi nhiều so với thế hệ hiện tại, CX-5 vẫn là một trong những SUV đẹp nhất phân khúc nhờ ngôn ngữ thiết kế Kodo tinh tế.</p>

<h2>Thiết kế và nội thất</h2>
<p>Cabin CX-5 2024 được nâng cấp đáng kể với màn hình trung tâm 10.25 inch mới, hệ thống âm thanh Bose 12 loa và ghế da Nappa cho bản cao cấp. Chất lượng vật liệu ở tầm cao nhất phân khúc — bảng điều khiển bọc da mềm, đường chỉ may đôi tinh tế tạo cảm giác cao cấp vượt mức giá bán.</p>

<h2>Vận hành</h2>
<p>Động cơ 2.5L 4 xi-lanh 188hp kết hợp hộp số tự động 6 cấp là trái tim quen thuộc của CX-5. Mức tiêu thụ nhiên liệu thực tế 9.2–10.8L/100km trong đô thị là hơi cao so với đối thủ dùng động cơ hybrid. Tuy nhiên, cảm giác lái của CX-5 thuộc hàng tốt nhất phân khúc — đây là "xe lái vì niềm vui" hiếm có ở tầm giá dưới 1 tỷ.</p>

<h2>Kết luận</h2>
<p>CX-5 2024 vẫn xứng đáng là Xe của Biên tập viên nhờ tổng thể xuất sắc: thiết kế đẹp nhất phân khúc, chất lượng nội thất cao, cảm giác lái thú vị. Điểm trừ duy nhất là không có tùy chọn hybrid trong khi đối thủ đã có.</p>`,
    content_en: `<p>The 2024 Mazda CX-5 receives a mid-cycle update with a revised equipment list and an improved e-Skyactiv G 2.5L engine. While the design changes little, the CX-5 remains one of the best-looking SUVs in its class thanks to subtle Kodo design language.</p>

<h2>Design and Interior</h2>
<p>The CX-5 2024 cabin is meaningfully upgraded with a new 10.25-inch central screen, 12-speaker Bose audio and Nappa leather seats on top trims. Material quality is the highest in the segment — soft-touch dashboard, double stitching, and an overall feel that punches above its price point.</p>

<h2>Driving</h2>
<p>The 2.5L 4-cylinder 188hp engine mated to a 6-speed automatic is CX-5's familiar heart. Real-world city fuel consumption of 9.2–10.8L/100km runs slightly high versus hybrid rivals. However, the CX-5's driving feel ranks among the very best in the segment.</p>`,
    category: 'review',
    review_badge: 'detailed_review',
    score: 8.5,
    score_design: 9.5,
    score_performance: 8.0,
    score_comfort: 8.5,
    score_tech: 7.5,
    score_value: 8.5,
    pros: ['Thiết kế đẹp nhất phân khúc', 'Chất lượng nội thất vượt tầm giá', 'Cảm giác lái thú vị và chính xác', 'Độ tin cậy cao từ thương hiệu Mazda'],
    cons: ['Không có tùy chọn hybrid', 'Tiêu thụ nhiên liệu hơi cao đô thị', 'Khoang hành lý nhỏ hơn đối thủ'],
    verdict_vi: 'Mazda CX-5 2024 vẫn là lựa chọn tổng thể tốt nhất phân khúc SUV tầm trung nếu bạn ưu tiên thiết kế, chất lượng nội thất và cảm giác lái.',
    verdict_en: 'The Mazda CX-5 2024 remains the best all-round choice in the mid-range SUV segment if design, interior quality and driving feel are your priorities.',
    is_featured: false,
    reading_time_minutes: 10,
    view_count: 38500,
    tags: ['Mazda', 'CX-5', 'SUV', 'đánh giá xe'],
    cover_url: 'https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-04-15T08:00:00Z'),
  },
  {
    authorName: 'Trần Quốc Bảo',
    title_vi: 'Ford Ranger 2024 đánh giá toàn diện: Vua bán tải khẳng định vị thế',
    title_en: 'Ford Ranger 2024 Full Review: The Pickup King Asserts Its Dominance',
    slug_vi: 'ford-ranger-2024-danh-gia',
    slug_en: 'ford-ranger-2024-review',
    excerpt_vi: 'Thế hệ mới Ford Ranger thống trị phân khúc bán tải Việt Nam 5 năm liên tiếp. Chúng tôi đã trải nghiệm đủ mọi địa hình để viết bài đánh giá này.',
    excerpt_en: 'The new-gen Ford Ranger has dominated Vietnam\'s pickup segment for 5 straight years. We tested it across every terrain for this review.',
    content_vi: `<p>Ford Ranger 2024 tiếp tục thống trị thị trường bán tải Việt Nam với doanh số hơn 2.000 xe/tháng. Phiên bản mới nhận bản cập nhật quan trọng bao gồm động cơ EcoBlue 2.0L bi-turbo mạnh hơn và hệ thống treo cải tiến cho hành trình mượt mà hơn trên đường nhựa.</p>

<h2>Khả năng off-road</h2>
<p>Ranger 2024 với hệ dẫn động 4WD và chế độ Terra Management System 6 chế độ có thể xử lý hầu hết các loại địa hình: đường đất, bùn lầy, cát sỏi và lội nước sâu 800mm. Tải trọng thùng xe 1 tấn và khả năng kéo 3.5 tấn biến nó thành xe đa năng thực sự.</p>

<h2>Tiện nghi và công nghệ</h2>
<p>Khoang cabin của Ranger 2024 vượt trội hơn hẳn thế hệ trước với màn hình SYNC 4 12 inch, sạc không dây và ghế sưởi/làm mát. Ford Ranger Tremor mới thêm giảm chấn Fox và gói off-road chuyên dụng cho những tín đồ địa hình thực sự.</p>`,
    content_en: `<p>The Ford Ranger 2024 continues to dominate Vietnam's pickup market with sales exceeding 2,000 units per month. The latest update brings a more powerful 2.0L bi-turbo EcoBlue engine and revised suspension for a smoother on-road ride.</p>

<h2>Off-Road Capability</h2>
<p>With 4WD and a 6-mode Terra Management System, the Ranger 2024 handles virtually any terrain: dirt, mud, gravel, sand and 800mm water wading. A 1-tonne payload and 3.5-tonne towing capacity make it a genuinely versatile workhorse.</p>`,
    category: 'review',
    review_badge: 'detailed_review',
    score: 8.7,
    score_design: 8.0,
    score_performance: 9.0,
    score_comfort: 8.5,
    score_tech: 8.5,
    score_value: 9.0,
    pros: ['Khả năng off-road hàng đầu phân khúc', 'Động cơ mạnh và tiết kiệm', 'Tải trọng và khả năng kéo ấn tượng', 'Dịch vụ sau bán hàng tốt, phụ tùng sẵn'],
    cons: ['Cảm giác lái đường nhựa kém xe du lịch', 'Khoang hành khách hàng sau hơi chật', 'Tiêu thụ nhiên liệu cao khi tải nặng'],
    verdict_vi: 'Ford Ranger 2024 là bán tải tốt nhất toàn diện tại Việt Nam — kết hợp khả năng off-road, tải trọng và độ tin cậy khó xe nào sánh kịp.',
    verdict_en: 'The Ford Ranger 2024 is the best all-round pickup in Vietnam — combining off-road ability, payload, and reliability that few rivals can match.',
    is_featured: false,
    reading_time_minutes: 11,
    view_count: 35200,
    tags: ['Ford', 'Ranger', 'bán tải', 'pickup', 'off-road'],
    cover_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-04-01T08:00:00Z'),
  },
  {
    authorName: 'Lê Hoàng Nam',
    title_vi: 'Kia Carnival 2024 đánh giá: Limousine gia đình dưới 1.6 tỷ',
    title_en: 'Kia Carnival 2024 Review: Family Limousine Under 1.6 Billion VND',
    slug_vi: 'kia-carnival-2024-danh-gia',
    slug_en: 'kia-carnival-2024-review',
    excerpt_vi: 'MPV hạng sang của Kia tiếp tục gây bão tại thị trường Việt Nam với nội thất xa hoa và công nghệ vượt bậc. Xe gia đình hay xe kinh doanh?',
    excerpt_en: "Kia's luxury MPV continues to make waves in Vietnam with opulent interior and advanced tech. Family car or business vehicle?",
    content_vi: `<p>Kia Carnival 2024 là MPV hạng sang bán chạy nhất phân khúc trên 1 tỷ tại Việt Nam. Với giá từ 1.229 tỷ, Carnival cung cấp không gian và cảm giác của một chiếc xe hạng sang thực sự với chi phí thấp hơn nhiều so với Mercedes-Benz V-Class hay Alphard.</p>

<h2>Nội thất đẳng cấp</h2>
<p>Điểm ấn tượng nhất của Carnival là nội thất: ghế VIP hàng 2 chỉnh điện, màn hình 12.3 inch đôi cho hàng ghế sau, rèm che nắng điện và thậm chí tính năng massage. Không gian hàng 2 của Carnival 6 chỗ rộng đến mức khó tin ở tầm giá này.</p>

<h2>Vận hành</h2>
<p>Động cơ dầu 2.2L CRDi 200hp cho cảm giác vận hành mượt mà và mô-men xoắn dồi dào ngay từ vòng tua thấp. Tiêu thụ nhiên liệu thực tế 9.5–11L/100km đô thị chấp nhận được với xe cỡ này. Nhược điểm là hộp số 8 cấp đôi lúc giật nhẹ ở tốc độ thấp.</p>`,
    content_en: `<p>The Kia Carnival 2024 is the best-selling luxury MPV above 1 billion VND in Vietnam. Starting at 1.229 billion, it delivers genuine luxury-car space and feel at a fraction of the price of a Mercedes-Benz V-Class or Alphard.</p>

<h2>Opulent Interior</h2>
<p>The Carnival's interior is its star: electrically adjustable VIP second-row seats, dual 12.3-inch rear screens, electric sunshades and even a massage function. The 6-seat Carnival's second row is astonishingly spacious for the price.</p>`,
    category: 'review',
    review_badge: 'detailed_review',
    score: 8.6,
    score_design: 8.5,
    score_performance: 8.0,
    score_comfort: 9.5,
    score_tech: 9.0,
    score_value: 8.5,
    pros: ['Nội thất sang trọng nhất phân khúc', 'Công nghệ tiện nghi vượt trội', 'Ghế VIP hàng 2 cực kỳ thoải mái', 'Giá trị mua lại tốt nhờ thương hiệu Kia'],
    cons: ['Khoang hành lý nhỏ khi xếp 7 chỗ', 'Hộp số đôi lúc giật ở tốc độ thấp', 'Thiếu tùy chọn động cơ hybrid'],
    verdict_vi: 'Carnival 2024 là lựa chọn MPV sang trọng tốt nhất Việt Nam dưới 1.6 tỷ — không xe nào trong phân khúc có thể sánh về nội thất và tiện nghi.',
    verdict_en: 'The Carnival 2024 is the best luxury MPV under 1.6 billion VND in Vietnam — nothing in the segment matches its interior and comfort.',
    is_featured: false,
    reading_time_minutes: 9,
    view_count: 29400,
    tags: ['Kia', 'Carnival', 'MPV', 'xe gia đình'],
    cover_url: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-03-20T08:00:00Z'),
  },
  {
    authorName: 'Trần Quốc Bảo',
    title_vi: 'Toyota Fortuner 2024 lái thử: SUV địa hình có giữ được hào quang?',
    title_en: 'Toyota Fortuner 2024 First Drive: Can the Off-Road Icon Keep Its Glory?',
    slug_vi: 'toyota-fortuner-2024-lai-thu',
    slug_en: 'toyota-fortuner-2024-first-drive',
    excerpt_vi: 'Fortuner vẫn là tên tuổi lớn nhất phân khúc SUV địa hình tại Việt Nam. Bản 2024 có cải thiện đủ để đẩy lùi sự tấn công của Ford Everest?',
    excerpt_en: "Fortuner remains the biggest name in Vietnam's off-road SUV segment. Does the 2024 update improve enough to fend off the Ford Everest?",
    content_vi: `<p>Toyota Fortuner là biểu tượng SUV địa hình tại Việt Nam hơn 15 năm qua. Bản 2024 nhận bản nâng cấp giữa vòng đời với giao diện front mới, màn hình 9 inch cập nhật và hệ thống an toàn Toyota Safety Sense 2.0 bổ sung. Đây là những cải tiến cần thiết để cạnh tranh với Ford Everest đang ngày càng mạnh.</p>

<h2>Khả năng địa hình</h2>
<p>Với khung gầm body-on-frame, hệ dẫn động 4WD và gầm cao 221mm, Fortuner xử lý địa hình thô tốt. Chế độ A-TRC (Active Traction Control) giúp phân phối lực hiệu quả khi leo dốc hay vượt bùn lầy. Tuy nhiên, Ford Everest Wildtrak với gói terrain management tinh vi hơn đang thu hẹp khoảng cách.</p>

<h2>Nhận xét tổng quan</h2>
<p>Fortuner 2024 cải thiện về công nghệ và tính năng an toàn nhưng chưa đủ để bứt phá. Điểm mạnh lớn nhất vẫn là mạng lưới đại lý Toyota rộng khắp và chi phí bảo dưỡng thấp — những lý do quan trọng khiến nhiều người vẫn chọn Fortuner dù Everest hấp dẫn hơn trên giấy tờ.</p>`,
    content_en: `<p>The Toyota Fortuner has been Vietnam's off-road SUV icon for over 15 years. The 2024 model receives a mid-cycle update with a refreshed front end, updated 9-inch screen and Toyota Safety Sense 2.0. These are necessary upgrades to keep pace with the increasingly capable Ford Everest.</p>

<h2>Off-Road Ability</h2>
<p>With a body-on-frame chassis, 4WD and 221mm ground clearance, the Fortuner handles rough terrain well. A-TRC helps distribute torque effectively on climbs or through mud. However, the Ford Everest Wildtrak with its more sophisticated terrain management system is closing the gap.</p>`,
    category: 'review',
    review_badge: 'first_drive',
    score: 7.8,
    score_design: 7.5,
    score_performance: 7.5,
    score_comfort: 8.0,
    score_tech: 7.5,
    score_value: 8.5,
    pros: ['Độ bền và tin cậy Toyota nổi tiếng', 'Mạng lưới đại lý rộng, phụ tùng dễ tìm', 'Chi phí bảo dưỡng thấp', 'Giá trị lại xe tốt'],
    cons: ['Cabin chật hơn Everest cùng giá', 'Công nghệ thua kém đối thủ trực tiếp', 'Cảm giác lái đường nhựa không tốt bằng xe monocoque'],
    verdict_vi: 'Fortuner 2024 vẫn là lựa chọn an toàn và thực dụng nhất phân khúc SUV địa hình nhờ độ bền và mạng lưới Toyota, dù Everest hấp dẫn hơn trên nhiều điểm.',
    verdict_en: 'The Fortuner 2024 remains the safest, most practical choice in the off-road SUV segment thanks to Toyota reliability and dealer network, though the Everest is more appealing on most metrics.',
    is_featured: false,
    reading_time_minutes: 8,
    view_count: 22100,
    tags: ['Toyota', 'Fortuner', 'SUV', 'off-road', 'lái thử'],
    cover_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-03-05T08:00:00Z'),
  },
  {
    authorName: 'Trần Quốc Bảo',
    title_vi: 'Hyundai Santa Fe 2024 đánh giá: SUV Hàn Quốc đe dọa ngôi vương',
    title_en: 'Hyundai Santa Fe 2024 Review: Korean SUV Threatens the Crown',
    slug_vi: 'hyundai-santa-fe-2024-danh-gia',
    slug_en: 'hyundai-santa-fe-2024-review',
    excerpt_vi: 'Thế hệ thứ 5 Santa Fe là bước nhảy vọt lớn nhất lịch sử mẫu xe này — thiết kế táo bạo, cabin hơn hẳn, và công nghệ đỉnh phân khúc.',
    excerpt_en: 'The fifth-generation Santa Fe is the biggest leap in the model\'s history — bold design, a far superior cabin, and segment-topping technology.',
    content_vi: `<p>Hyundai Santa Fe 2024 thế hệ thứ 5 là cuộc cách mạng thực sự. Thiết kế mới với cụm đèn chữ H nổi bật, thân xe góc cạnh và tỷ lệ cân đối biến Santa Fe thành một trong những SUV đẹp nhất phân khúc. Khoang nội thất được thiết kế lại hoàn toàn với màn hình đôi 12.3 inch cong, bảng điều khiển tối giản và trang bị đồ ăn đứt đối thủ cùng giá.</p>

<h2>Trang bị công nghệ</h2>
<p>Santa Fe 2024 có Hyundai Digital Key Plus cho phép mở và khởi động xe bằng điện thoại, màn hình đôi cong 12.3 inch, hệ thống âm thanh Bang & Olufsen 14 loa và cửa sổ trời toàn cảnh 2 mảnh. Tính năng Bose PersonalSpace cân bằng âm thanh cho từng ghế ngồi riêng biệt là điểm độc đáo chưa thấy ở phân khúc này.</p>

<h2>Vận hành</h2>
<p>Động cơ 2.5T 281hp của phiên bản Calligraphy cho tốc độ 0-100km/h trong 6.7 giây — nhanh đáng kinh ngạc cho SUV 7 chỗ. Đặc biệt, hệ thống HTRAC AWD phân phối lực tức thì và thông minh, mang lại cảm giác lái tự tin trên mọi điều kiện đường.</p>`,
    content_en: `<p>The fifth-generation Hyundai Santa Fe 2024 is a genuine revolution. The new design with prominent H-shaped lights, angular body and balanced proportions makes the Santa Fe one of the best-looking SUVs in its class. The interior is completely redesigned with dual curved 12.3-inch screens and equipment levels that utterly shame the competition.</p>

<h2>Technology</h2>
<p>Santa Fe 2024 includes Hyundai Digital Key Plus (unlock and start with your phone), dual curved 12.3-inch screens, 14-speaker Bang & Olufsen audio and a panoramic two-piece sunroof. The Bose PersonalSpace feature, balancing audio independently for each seat, is something unique in this segment.</p>`,
    category: 'review',
    review_badge: 'first_drive',
    score: 8.3,
    score_design: 9.0,
    score_performance: 8.5,
    score_comfort: 8.5,
    score_tech: 9.0,
    score_value: 7.5,
    pros: ['Thiết kế thế hệ mới ấn tượng', 'Công nghệ và trang bị hàng đầu phân khúc', 'Động cơ 2.5T mạnh mẽ', 'Không gian nội thất rộng rãi'],
    cons: ['Giá cao hơn đối thủ cùng phân khúc', 'Thiếu tùy chọn hybrid tại Việt Nam', 'Kích thước lớn khó đỗ trong đô thị'],
    verdict_vi: 'Santa Fe 2024 là bước tiến đột phá của Hyundai và là đối thủ xứng tầm nhất với Toyota Fortuner và Ford Everest trong phân khúc SUV 7 chỗ trên 1 tỷ.',
    verdict_en: 'The Santa Fe 2024 marks a breakthrough for Hyundai and is the most worthy rival yet to the Toyota Fortuner and Ford Everest in the over-1-billion-VND 7-seat SUV segment.',
    is_featured: false,
    reading_time_minutes: 10,
    view_count: 31700,
    tags: ['Hyundai', 'Santa Fe', 'SUV', '7 chỗ'],
    cover_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-02-20T08:00:00Z'),
  },
  {
    authorName: 'Nguyễn Minh Đức',
    title_vi: 'Honda CR-V Hybrid 2023 đánh giá: SUV tiết kiệm nhất phân khúc?',
    title_en: 'Honda CR-V Hybrid 2023 Review: The Most Fuel-Efficient SUV in Its Class?',
    slug_vi: 'honda-crv-hybrid-2023-danh-gia',
    slug_en: 'honda-crv-hybrid-2023-review',
    excerpt_vi: 'Honda CR-V Hybrid 2023 hứa hẹn tiêu thụ chỉ 5.5L/100km — một con số ấn tượng nếu đúng. Chúng tôi đã kiểm chứng trong điều kiện thực tế Việt Nam.',
    excerpt_en: 'The Honda CR-V Hybrid 2023 promises just 5.5L/100km — an impressive number if true. We put it to the test in real Vietnamese conditions.',
    content_vi: `<p>Honda CR-V Hybrid 2023 là mẫu SUV đầu tiên của Honda tại Việt Nam tích hợp hệ thống hybrid e:HEV thế hệ thứ 3. Không giống MHEV hay PHEV, e:HEV của Honda hoạt động chủ yếu như xe điện khi di chuyển tốc độ thấp, chỉ dùng động cơ xăng để sạc pin hoặc tăng tốc mạnh.</p>

<h2>Kiểm tra tiêu thụ nhiên liệu</h2>
<p>Trong điều kiện thực tế tại Hà Nội với 70% đường đô thị, chúng tôi đo được 6.3L/100km — cao hơn con số quảng cáo 5.5L nhưng vẫn ấn tượng trong phân khúc. Trên cao tốc Hà Nội – Hải Phòng, con số giảm còn 5.8L/100km. Đây là mức tiêu thụ tốt nhất trong phân khúc SUV C không điện.</p>

<h2>Không gian và trang bị</h2>
<p>CR-V Hybrid 2023 giữ nguyên không gian cabin rộng rãi đặc trưng của dòng CR-V: hàng ghế sau rộng, cốp xe 561 lít và ghế hàng sau gập phẳng thuận tiện. Màn hình 9 inch với Honda SENSING tích hợp đầy đủ tính năng an toàn chủ động.</p>`,
    content_en: `<p>The Honda CR-V Hybrid 2023 is Honda's first SUV in Vietnam to use the third-generation e:HEV hybrid system. Unlike MHEV or PHEV, Honda's e:HEV operates primarily as an EV at low speeds, using the petrol engine mainly to charge the battery or during hard acceleration.</p>

<h2>Fuel Economy Test</h2>
<p>In real Hanoi conditions with 70% city driving, we recorded 6.3L/100km — higher than the advertised 5.5L but still impressive for the segment. On the Hanoi–Hai Phong highway, the figure dropped to 5.8L/100km. This is the best consumption figure in the non-EV C-SUV segment.</p>`,
    category: 'review',
    review_badge: 'long_term',
    score: 8.2,
    score_design: 7.5,
    score_performance: 7.5,
    score_comfort: 8.5,
    score_tech: 8.0,
    score_value: 8.5,
    pros: ['Tiêu thụ nhiên liệu tốt nhất phân khúc', 'Vận hành mượt mà và yên tĩnh', 'Không gian cabin và cốp rộng', 'Độ tin cậy Honda cao'],
    cons: ['Thiếu cảm giác lái thể thao', 'Thiết kế ngoại thất khá trung tính', 'Giá cao hơn bản xăng đáng kể'],
    verdict_vi: 'CR-V Hybrid 2023 là lựa chọn thực dụng và tiết kiệm nhất trong phân khúc SUV C — lý tưởng cho người chạy nhiều và muốn tối ưu chi phí nhiên liệu.',
    verdict_en: 'The CR-V Hybrid 2023 is the most practical and economical choice in the C-SUV segment — ideal for high-mileage drivers looking to minimise fuel costs.',
    is_featured: false,
    reading_time_minutes: 9,
    view_count: 26800,
    tags: ['Honda', 'CR-V', 'Hybrid', 'SUV', 'tiết kiệm nhiên liệu'],
    cover_url: 'https://images.unsplash.com/photo-1551830820-429a626e9c50?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-02-01T08:00:00Z'),
  },

  // ── NEWS ─────────────────────────────────────────────────────────────────
  {
    authorName: 'Lê Hoàng Nam',
    title_vi: 'VinFast VF 3 chính thức ra mắt: Xe điện phổ thông giá từ 235 triệu đồng',
    title_en: 'VinFast VF 3 Officially Launched: Mass-Market EV Starting at 235 Million VND',
    slug_vi: 'vinfast-vf3-ra-mat-gia-tu-235-trieu',
    slug_en: 'vinfast-vf3-officially-launched',
    excerpt_vi: 'VinFast chính thức mở bán VF 3 với mức giá từ 235 triệu đồng khi thuê pin, đánh dấu sự xuất hiện của xe điện giá phổ thông đầu tiên tại Việt Nam.',
    excerpt_en: 'VinFast officially opens orders for the VF 3 at 235 million VND with battery lease, marking the arrival of Vietnam\'s first truly mass-market EV.',
    content_vi: `<p>Tại sự kiện ra mắt tối qua ở Hà Nội, VinFast chính thức công bố giá bán VF 3: 235 triệu đồng (thuê pin) và 285 triệu đồng (mua pin). Đây là lần đầu tiên một mẫu xe điện có giá dưới 300 triệu tại Việt Nam, mở ra kỷ nguyên xe điện phổ thông mà thị trường đã trông chờ từ lâu.</p>

<p>VF 3 có kích thước mini SUV với chiều dài 3.189mm, rộng 1.638mm. Pin 15.2 kWh cho phạm vi hoạt động 210km theo chuẩn NEDC. Xe trang bị màn hình 8 inch, kết nối điện thoại và tính năng OTA update. VinFast cho biết đã nhận được hơn 15.000 đơn đặt cọc trong 48 giờ đầu mở bán.</p>

<p>Theo ông Phạm Nhật Vượng, Chủ tịch VinFast, mục tiêu là đưa VF 3 trở thành xe cá nhân đầu tiên của hàng triệu người Việt đang sử dụng xe máy. "Chúng tôi muốn đẩy nhanh quá trình chuyển đổi sang giao thông xanh tại Việt Nam," ông Vượng phát biểu tại sự kiện.</p>`,
    content_en: `<p>At last night's launch event in Hanoi, VinFast officially announced VF 3 pricing: 235 million VND (battery lease) and 285 million VND (battery purchase). This is the first time an electric vehicle has been priced under 300 million VND in Vietnam, opening the mass-market EV era the market has long awaited.</p>

<p>The VF 3 is a mini SUV measuring 3,189mm long and 1,638mm wide. Its 15.2 kWh battery provides a 210km NEDC range. The car features an 8-inch screen, smartphone connectivity and OTA updates. VinFast says it received over 15,000 deposits within the first 48 hours of sales opening.</p>`,
    category: 'news',
    review_badge: null,
    is_featured: false,
    reading_time_minutes: 4,
    view_count: 67400,
    tags: ['VinFast', 'VF3', 'xe điện', 'ra mắt'],
    cover_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-05-05T10:00:00Z'),
  },
  {
    authorName: 'Lê Hoàng Nam',
    title_vi: 'Top 10 xe bán chạy nhất tháng 4/2026: Toyota thống trị, VinFast tăng trưởng mạnh',
    title_en: 'Top 10 Best-Selling Cars April 2026: Toyota Dominates, VinFast Surges',
    slug_vi: 'top-10-xe-ban-chay-thang-4-2026',
    slug_en: 'top-10-best-selling-cars-april-2026',
    excerpt_vi: 'VAMA và VADA vừa công bố doanh số tháng 4/2026. Toyota tiếp tục dẫn đầu với Vios và Fortuner, trong khi VinFast ghi nhận tháng bán hàng kỷ lục.',
    excerpt_en: 'VAMA and VADA have released April 2026 sales data. Toyota leads with Vios and Fortuner, while VinFast records a historic sales month.',
    content_vi: `<p>Theo dữ liệu mới nhất từ Hiệp hội các Nhà sản xuất ô tô Việt Nam (VAMA) và VinFast Auto, tổng doanh số thị trường ô tô tháng 4/2026 đạt 32.847 xe, tăng 18% so với cùng kỳ năm ngoái.</p>

<p><strong>Top 10 xe bán chạy nhất tháng 4/2026:</strong></p>
<ol>
<li>Toyota Vios — 2.841 xe</li>
<li>VinFast VF 3 — 2.673 xe (tháng đầu tiên, kỷ lục mới)</li>
<li>Toyota Fortuner — 2.102 xe</li>
<li>Ford Ranger — 1.987 xe</li>
<li>Hyundai Accent — 1.654 xe</li>
<li>Mitsubishi Xpander — 1.543 xe</li>
<li>Kia Seltos — 1.421 xe</li>
<li>Toyota Corolla Cross — 1.387 xe</li>
<li>Mazda CX-5 — 1.298 xe</li>
<li>Honda City — 1.201 xe</li>
</ol>

<p>Điểm nổi bật nhất tháng này là sự xuất hiện của VinFast VF 3 trực tiếp ở vị trí thứ 2 ngay trong tháng đầu mở bán. Con số 2.673 xe là kỷ lục giao xe trong tháng đầu của bất kỳ mẫu xe nào tại Việt Nam.</p>`,
    content_en: `<p>According to the latest data from the Vietnam Automobile Manufacturers' Association (VAMA) and VinFast Auto, total automotive market sales in April 2026 reached 32,847 vehicles, up 18% year-on-year.</p>

<p><strong>Top 10 Best-Selling Cars, April 2026:</strong></p>
<ol>
<li>Toyota Vios — 2,841 units</li>
<li>VinFast VF 3 — 2,673 units (first month, new record)</li>
<li>Toyota Fortuner — 2,102 units</li>
<li>Ford Ranger — 1,987 units</li>
<li>Hyundai Accent — 1,654 units</li>
</ol>`,
    category: 'news',
    review_badge: null,
    is_featured: false,
    reading_time_minutes: 3,
    view_count: 54200,
    tags: ['doanh số', 'thị trường xe', 'VAMA', 'bán chạy'],
    cover_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-05-08T09:00:00Z'),
  },
  {
    authorName: 'Trần Quốc Bảo',
    title_vi: 'Toyota Corolla Cross 2025 facelift chính thức ra mắt: Giá từ 746 triệu',
    title_en: 'Toyota Corolla Cross 2025 Facelift Officially Launched: From 746 Million VND',
    slug_vi: 'toyota-corolla-cross-2025-facelift-ra-mat',
    slug_en: 'toyota-corolla-cross-2025-facelift-launch',
    excerpt_vi: 'Toyota Việt Nam chính thức giới thiệu Corolla Cross 2025 facelift với thiết kế mới, màn hình lớn hơn và bổ sung bản Hybrid. Giá từ 746 triệu đồng.',
    excerpt_en: 'Toyota Vietnam officially introduces the Corolla Cross 2025 facelift with updated design, larger screen and the addition of a Hybrid variant. From 746 million VND.',
    content_vi: `<p>Toyota Việt Nam vừa tổ chức lễ ra mắt Toyota Corolla Cross 2025 tại Hà Nội và TP.HCM với sự xuất hiện của Chủ tịch Toyota Việt Nam Hiroyuki Ueda. Mẫu xe facelift này mang nhiều thay đổi đáng chú ý so với phiên bản tiền nhiệm.</p>

<p>Điểm thay đổi lớn nhất là phần đầu xe với thiết kế lưới tản nhiệt mới, cụm đèn LED định hình mới và cản trước thể thao hơn. Trong nội thất, màn hình trung tâm nâng cấp lên 10.1 inch, thêm sạc không dây và trang bị Toyota Safety Sense 3.0 trên tất cả phiên bản.</p>

<p>Quan trọng nhất, Toyota bổ sung bản Hybrid (HEV) lần đầu tiên cho Corolla Cross tại Việt Nam với giá 916 triệu. Hệ thống hybrid tương tự Camry Hybrid cho mức tiêu thụ 5.8L/100km đô thị — tiết kiệm hơn 30% so với bản xăng thuần.</p>

<p>Giá bán: 746 triệu (E), 806 triệu (G), 858 triệu (V), 916 triệu (HEV). Nhận xe từ tháng 6/2026.</p>`,
    content_en: `<p>Toyota Vietnam has launched the Corolla Cross 2025 facelift in Hanoi and Ho Chi Minh City, attended by Toyota Vietnam President Hiroyuki Ueda. This facelift brings several notable changes over its predecessor.</p>

<p>The biggest visual changes are up front: a new grille design, restyled LED headlights and a sportier bumper. Inside, the central screen grows to 10.1 inches, wireless charging is added, and Toyota Safety Sense 3.0 is fitted across all trims.</p>

<p>Most importantly, Toyota adds a Hybrid (HEV) variant for the first time on the Corolla Cross in Vietnam, priced at 916 million VND. The Camry Hybrid-derived system returns 5.8L/100km in the city — 30% better than the pure-petrol version.</p>`,
    category: 'news',
    review_badge: null,
    is_featured: false,
    reading_time_minutes: 4,
    view_count: 41300,
    tags: ['Toyota', 'Corolla Cross', 'Hybrid', 'ra mắt 2025'],
    cover_url: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-04-20T09:00:00Z'),
  },
  {
    authorName: 'Trần Quốc Bảo',
    title_vi: 'Hyundai Creta 2024 bán được 3.200 xe trong 2 tháng: Kỷ lục mới phân khúc B-SUV',
    title_en: 'Hyundai Creta 2024 Sells 3,200 Units in 2 Months: New B-SUV Segment Record',
    slug_vi: 'hyundai-creta-2024-ky-luc-b-suv',
    slug_en: 'hyundai-creta-2024-bsuv-record',
    excerpt_vi: 'Hyundai Creta 2024 thế hệ mới đã giao 3.200 xe trong 2 tháng đầu bán ra, thiết lập kỷ lục mới cho phân khúc crossover hạng B tại Việt Nam.',
    excerpt_en: 'The all-new Hyundai Creta 2024 has delivered 3,200 units in its first two months, setting a new record for the B-segment crossover class in Vietnam.',
    content_vi: `<p>Hyundai Thành Công vừa thông báo kết quả doanh số ấn tượng của Creta 2024: 3.218 xe giao đến khách hàng trong tháng 1 và 2/2026, trung bình 1.609 xe/tháng. Con số này vượt xa kỷ lục cũ 1.100 xe/tháng của thế hệ Creta trước.</p>

<p>Creta 2024 thế hệ mới được thiết kế hoàn toàn với ngôn ngữ "Sensuous Sportiness" của Hyundai, kích thước lớn hơn 10cm và trang bị đồ vượt trội hơn hẳn phiên bản cũ. Đặc biệt, màn hình đôi cong 10.25 inch, tính năng Hyundai BlueLink và hệ thống camera 360 độ là những điểm nhấn công nghệ thu hút khách hàng trẻ.</p>

<p>Ông Kim Sangdae, Tổng giám đốc Hyundai Thành Công, cho biết: "Creta 2024 chứng minh rằng khách hàng Việt Nam sẵn sàng trả thêm cho thiết kế hiện đại và công nghệ tiên tiến, dù ở phân khúc tầm trung."</p>`,
    content_en: `<p>Hyundai Thanh Cong has announced impressive sales results for the Creta 2024: 3,218 units delivered in January and February 2026, averaging 1,609 units per month. This handily beats the old-gen Creta's record of 1,100 units per month.</p>

<p>The all-new Creta 2024 adopts Hyundai's "Sensuous Sportiness" design language throughout, grows 10cm in size, and offers dramatically improved equipment over its predecessor. In particular, the dual 10.25-inch curved screens, Hyundai BlueLink connectivity and 360-degree camera attract younger buyers.</p>`,
    category: 'news',
    review_badge: null,
    is_featured: false,
    reading_time_minutes: 3,
    view_count: 28900,
    tags: ['Hyundai', 'Creta', 'doanh số', 'B-SUV'],
    cover_url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-03-12T09:00:00Z'),
  },
  {
    authorName: 'Lê Hoàng Nam',
    title_vi: 'Thuế nhập khẩu ô tô ASEAN tiếp tục 0%: Xe Thái, Indonesia về Việt Nam rẻ hơn',
    title_en: 'ASEAN Car Import Tax Remains at 0%: Thai and Indonesian Cars Cheaper in Vietnam',
    slug_vi: 'thue-nhap-khau-o-to-asean-0-phan-tram-2026',
    slug_en: 'asean-car-import-tax-0-percent-2026',
    excerpt_vi: 'Bộ Tài chính xác nhận thuế nhập khẩu ô tô nguyên chiếc từ các nước ASEAN tiếp tục duy trì ở mức 0% theo cam kết AFTA, giúp giá xe nhập khẩu ổn định.',
    excerpt_en: "Vietnam's Ministry of Finance confirms the 0% import tax on fully-assembled ASEAN cars continues under AFTA commitments, keeping import car prices stable.",
    content_vi: `<p>Bộ Tài chính Việt Nam vừa ban hành thông tư xác nhận duy trì mức thuế nhập khẩu 0% đối với ô tô nguyên chiếc (CBU) từ các nước thành viên ASEAN theo cam kết AFTA (Khu vực Thương mại Tự do ASEAN). Quyết định này có hiệu lực từ 1/1/2026 và dự kiến kéo dài ít nhất đến 2028.</p>

<p>Thuế 0% áp dụng cho xe có tỷ lệ nội địa hoá (ROO) từ 40% trở lên từ các nước ASEAN, chủ yếu là Thái Lan, Indonesia, Malaysia và Philippines. Các thương hiệu hưởng lợi nhiều nhất gồm Toyota, Honda, Ford, Mitsubishi, Suzuki — những hãng có nhà máy lớn tại Thái Lan và Indonesia xuất xe sang Việt Nam.</p>

<p>Đây là tin tốt cho người tiêu dùng Việt Nam khi áp lực lạm phát toàn cầu đang đẩy chi phí sản xuất xe lên cao. Mức thuế 0% giúp duy trì giá xe ổn định và thậm chí giảm so với nếu áp thuế 5-10%.</p>`,
    content_en: `<p>Vietnam's Ministry of Finance has issued a circular confirming the 0% import tax on fully-assembled (CBU) passenger cars from ASEAN member states under AFTA commitments will continue. This takes effect from 1 January 2026 and is expected to last until at least 2028.</p>

<p>The 0% rate applies to vehicles with at least 40% ASEAN regional content (ROO), primarily from Thailand, Indonesia, Malaysia and the Philippines. The biggest beneficiaries include Toyota, Honda, Ford, Mitsubishi and Suzuki — brands with large factories in Thailand and Indonesia exporting to Vietnam.</p>`,
    category: 'news',
    review_badge: null,
    is_featured: false,
    reading_time_minutes: 4,
    view_count: 19800,
    tags: ['thuế xe', 'ASEAN', 'chính sách', 'giá xe'],
    cover_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-01-15T09:00:00Z'),
  },

  // ── COMPARISON ──────────────────────────────────────────────────────────
  {
    authorName: 'Nguyễn Minh Đức',
    title_vi: 'So sánh Mazda CX-5 vs Hyundai Tucson vs Honda CR-V: Đâu là SUV tầm trung tốt nhất?',
    title_en: 'Mazda CX-5 vs Hyundai Tucson vs Honda CR-V: Which Mid-Size SUV is Best?',
    slug_vi: 'so-sanh-cx5-tucson-crv-suv-tam-trung',
    slug_en: 'comparison-cx5-tucson-crv-mid-size-suv',
    excerpt_vi: 'Ba đối thủ kỳ phùng địch thủ phân khúc SUV hạng C tầm 800–1.200 triệu. Chúng tôi lái cả ba trong cùng điều kiện để tìm ra xe tốt nhất cho mỗi nhu cầu.',
    excerpt_en: 'Three evenly-matched rivals in the C-segment SUV class, priced 800–1,200 million VND. We drove all three in the same conditions to find the best car for each need.',
    content_vi: `<p>Phân khúc SUV hạng C từ 800 triệu đến 1.2 tỷ là chiến trường khốc liệt nhất thị trường xe Việt Nam. Ba đại diện nổi bật nhất: Mazda CX-5 (từ 759 triệu), Hyundai Tucson (từ 824 triệu) và Honda CR-V Hybrid (từ 998 triệu). Chúng tôi mượn cả ba và lái cùng nhau trên cùng lộ trình 500km để so sánh công bằng nhất.</p>

<h2>Thiết kế và nội thất</h2>
<p><strong>Mazda CX-5</strong> thắng tuyệt đối về thiết kế ngoại thất với ngôn ngữ Kodo thanh lịch. Nội thất chất liệu tốt nhất, cảm giác xa hoa nhất trong 3 xe. <strong>Tucson</strong> thiết kế mạnh mẽ, cá tính, cabin hiện đại với màn hình 10.25 inch đôi. <strong>CR-V</strong> thiết kế trung tính nhất, không đặc sắc về thẩm mỹ nhưng không gian thực dụng nhất.</p>

<h2>Vận hành và tiêu thụ nhiên liệu</h2>
<p>CX-5 cho cảm giác lái thể thao nhất và thú vị nhất, nhưng tiêu thụ nhiên liệu cao nhất (10.2L/100km đô thị). CR-V Hybrid tiết kiệm vượt trội (6.3L/100km đô thị) nhưng cảm giác lái nhạt nhất. Tucson cân bằng ở giữa (8.5L/100km).</p>

<h2>Kết luận: Mua xe nào?</h2>
<p>Chọn <strong>CX-5</strong> nếu bạn ưu tiên thiết kế và cảm giác lái. Chọn <strong>CR-V Hybrid</strong> nếu bạn chạy nhiều và muốn tối ưu chi phí nhiên liệu. Chọn <strong>Tucson</strong> nếu bạn muốn công nghệ hiện đại nhất và trang bị đồ nhiều nhất ở tầm giá dưới 1 tỷ.</p>`,
    content_en: `<p>The C-segment SUV class between 800 million and 1.2 billion VND is the most fiercely contested battlefield in Vietnam's car market. Three standout contenders: Mazda CX-5 (from 759 million), Hyundai Tucson (from 824 million) and Honda CR-V Hybrid (from 998 million). We borrowed all three and drove the same 500km route for the fairest possible comparison.</p>

<h2>Design and Interior</h2>
<p>The <strong>CX-5</strong> wins outright on exterior design with elegant Kodo language. Interior material quality is the highest, with the most premium feel. The <strong>Tucson</strong> has a bolder, more individual look and a modern dual 10.25-inch screen layout. The <strong>CR-V</strong> is the most conservative-looking but offers the most practical interior space.</p>

<h2>Driving and Fuel Consumption</h2>
<p>The CX-5 offers the most sporting and enjoyable drive, but the highest fuel consumption (10.2L/100km city). The CR-V Hybrid is by far the most economical (6.3L/100km city) but the least involving to drive. The Tucson sits in the middle (8.5L/100km).</p>

<h2>Verdict: Which to Buy?</h2>
<p>Choose the <strong>CX-5</strong> for design and driving enjoyment. Choose the <strong>CR-V Hybrid</strong> for high mileage and minimum fuel costs. Choose the <strong>Tucson</strong> for the most modern technology and equipment under 1 billion VND.</p>`,
    category: 'comparison',
    review_badge: 'comparison',
    is_featured: false,
    reading_time_minutes: 12,
    view_count: 47600,
    tags: ['so sánh xe', 'CX-5', 'Tucson', 'CR-V', 'SUV tầm trung'],
    cover_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-04-25T08:00:00Z'),
  },
  {
    authorName: 'Nguyễn Minh Đức',
    title_vi: 'Toyota Veloz Cross vs Mitsubishi Xpander vs Kia Carnival: MPV gia đình nào đáng mua nhất?',
    title_en: 'Toyota Veloz Cross vs Mitsubishi Xpander vs Kia Carnival: Which Family MPV is Worth Buying?',
    slug_vi: 'so-sanh-veloz-xpander-carnival-mpv-gia-dinh',
    slug_en: 'comparison-veloz-xpander-carnival-family-mpv',
    excerpt_vi: 'Từ 650 triệu đến 1.3 tỷ, ba chiếc MPV 7 chỗ này phục vụ ba nhóm khách hàng khác nhau. Bài so sánh đặc biệt tìm ra xe MPV gia đình phù hợp nhất cho mỗi ngân sách.',
    excerpt_en: 'From 650 million to 1.3 billion VND, these three 7-seat MPVs serve three distinct buyer groups. Our special comparison finds the right family MPV for every budget.',
    content_vi: `<p>MPV 7 chỗ là phân khúc xe tăng trưởng mạnh nhất tại Việt Nam 2 năm gần đây, nhờ gia đình trẻ ngày càng ưa chuộng xe đa dụng thay vì SUV đắt tiền. Ba cái tên nổi bật nhất: Toyota Veloz Cross (648-726 triệu), Mitsubishi Xpander (590-670 triệu) và Kia Carnival (1.229-1.559 tỷ). Đây không phải là so sánh "kẻ thắng-người thua" vì chúng phục vụ ba nhu cầu khác nhau.</p>

<h2>Mitsubishi Xpander: MPV thực dụng nhất tầm 600 triệu</h2>
<p>Xpander chiến thắng về tính thực dụng ở tầm giá dưới 700 triệu. Không gian hàng ghế 2-3 rộng rãi, gầm cao 225mm cho phép đi đường xấu, và chi phí bảo dưỡng thấp nhờ động cơ MIVEC 1.5L đơn giản. Nhược điểm là cabin vật liệu khiêm tốn và thiếu công nghệ.</p>

<h2>Toyota Veloz Cross: Cân bằng tốt nhất</h2>
<p>Veloz Cross cải thiện rõ rệt về chất lượng nội thất và công nghệ so với Xpander, với giá chênh lệch không quá lớn. Toyota Safety Sense và màn hình 9 inch đa điểm chạm là điểm cộng lớn. Dòng xe Toyota cũng đồng nghĩa với chi phí bảo dưỡng thấp và giá trị giữ giá tốt.</p>

<h2>Kia Carnival: Đẳng cấp khác biệt</h2>
<p>Carnival không cạnh tranh trực tiếp với hai xe kia về giá, nhưng nó cung cấp nội thất và tiện nghi hoàn toàn khác tầm. Ghế VIP hàng 2 chỉnh điện, âm thanh high-end và không gian rộng hơn hẳn khiến Carnival trở thành xe gia đình sang trọng nhất dưới 1.6 tỷ.</p>`,
    content_en: `<p>The 7-seat MPV segment has been the fastest-growing in Vietnam over the past two years, as young families increasingly prefer versatile people-carriers over expensive SUVs. Three standout names: Toyota Veloz Cross (648–726 million VND), Mitsubishi Xpander (590–670 million) and Kia Carnival (1.229–1.559 billion). This isn't a "winner-takes-all" comparison — these cars serve three distinct needs.</p>

<h2>Mitsubishi Xpander: Most Practical Under 700 Million</h2>
<p>The Xpander wins on practicality below 700 million VND. Rows 2 and 3 are spacious, 225mm ground clearance helps on rough roads, and running costs are low thanks to the simple 1.5L MIVEC engine. The downsides are modest cabin materials and limited technology.</p>

<h2>Toyota Veloz Cross: The Best Balance</h2>
<p>The Veloz Cross meaningfully improves on interior quality and technology versus the Xpander, for a reasonable price premium. Toyota Safety Sense and a multi-touch 9-inch screen are big pluses, as is the Toyota badge's low running costs and good resale value.</p>

<h2>Kia Carnival: A Different Class Entirely</h2>
<p>The Carnival doesn't compete directly on price, but it offers a completely different tier of interior and comfort. Electrically adjustable VIP second-row seats, high-end audio and considerably more space make it Vietnam's most luxurious family car under 1.6 billion VND.</p>`,
    category: 'comparison',
    review_badge: 'comparison',
    is_featured: false,
    reading_time_minutes: 11,
    view_count: 39200,
    tags: ['so sánh xe', 'Veloz Cross', 'Xpander', 'Carnival', 'MPV gia đình'],
    cover_url: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=450&fit=crop&q=80',
    publishedAt: new Date('2026-03-28T08:00:00Z'),
  },

  // ── FEATURED ─────────────────────────────────────────────────────────────
  {
    authorName: 'Lê Hoàng Nam',
    title_vi: 'Lamborghini Urus SE Tettonero Capsule: Siêu SUV lai điện khoác áo tối thượng',
    slug_vi: 'lamborghini-urus-se-tettonero-capsule',
    excerpt_vi: 'Tettonero Capsule là gói tùy biến Ad Personam mới nhất của Lamborghini dành cho Urus SE PHEV — 800 mã lực, mái đen tương phản và nội thất Alcantara cao cấp.',
    content_vi: `<p>Lamborghini vừa ra mắt <strong>Urus SE Tettonero Capsule</strong> — một gói tùy biến Ad Personam đặc biệt dành riêng cho siêu SUV hybrid mạnh nhất trong lịch sử của hãng. "Tettonero" trong tiếng Ý có nghĩa là <i>mái đen</i>, và đó chính xác là điểm nhận diện nổi bật nhất của gói này: phần mái sơn đen tương phản tạo nên sự đối lập ấn tượng với màu thân xe.</p>

<h2>Thiết kế: Đen tuyệt đối trên nền màu sắc rực rỡ</h2>
<p>Tettonero Capsule được xây dựng trên nền tảng Urus SE với triết lý thiết kế hai tông màu táo bạo. Phần mái, cột A, cột B và cánh gương được xử lý bằng sơn đen bóng hoặc carbon, tạo hiệu ứng "floating roof" — mái xe như đang lơ lửng trên thân xe.</p>
<p>Phần thân có thể kết hợp với nhiều màu sắc đặc trưng của Lamborghini như Verde Mantis (xanh lá), Arancio Borealis (cam), hay Blu Aegir (xanh dương). Bộ mâm 23 inch với thiết kế đa chấu sơn đen tạo nên tổng thể nhất quán, hung hăng từ đầu đến cuối.</p>
<p>Nội thất được nâng cấp với da Alcantara và da thuộc cao cấp, đường chỉ tương phản, ốp carbon sợi khô (forged carbon) và logo Tettonero thêu trên tựa đầu.</p>

<h2>Sức mạnh: 800 mã lực từ hybrid PHEV</h2>
<p>Tettonero Capsule đặt trên nền tảng cơ học của <strong>Urus SE</strong> — phiên bản plug-in hybrid (PHEV) của Urus, được Lamborghini công bố là siêu SUV mạnh nhất từ trước đến nay.</p>
<ul>
<li><strong>Động cơ:</strong> V8 4.0L twin-turbo + motor điện tích hợp</li>
<li><strong>Công suất tổng:</strong> 800 mã lực (620 kW)</li>
<li><strong>Mô-men xoắn:</strong> 950 Nm</li>
<li><strong>0–100 km/h:</strong> 3,4 giây</li>
<li><strong>Tốc độ tối đa:</strong> 312 km/h</li>
<li><strong>Phạm vi thuần điện:</strong> khoảng 60 km (WLTP)</li>
</ul>
<p>So với Urus S thông thường (666 mã lực), Urus SE bổ sung thêm gần 135 mã lực nhờ hệ thống điện tích hợp — đây là bước chuyển đổi quan trọng của Lamborghini trong hành trình điện khí hóa dòng SUV của mình.</p>

<h2>Vận hành: Dữ dội hay lịch thiệp — do bạn chọn</h2>
<p>Urus SE có 4 chế độ lái: <strong>EV</strong> (thuần điện, yên tĩnh), <strong>Hybrid</strong> (cân bằng hiệu suất và tiêu hao), <strong>Performance</strong> (tối ưu sức mạnh) và <strong>Recharge</strong> (sạc pin trong khi lái). Hệ dẫn động AWD với khả năng phân phối mô-men xoắn chủ động giúp xe bám đường xuất sắc ngay cả khi tăng tốc toàn lực.</p>
<p>Hệ thống phanh carbon-ceramic (CCBM) tùy chọn với kẹp phanh 10 piston ở trước đảm bảo khả năng giảm tốc xứng tầm với công suất.</p>

<h2>Ai dành cho chiếc xe này?</h2>
<p>Lamborghini Urus SE Tettonero Capsule không phải xe để đi chợ hay đưa con đi học — dù về mặt kỹ thuật nó hoàn toàn có thể làm điều đó. Đây là tuyên ngôn của chủ nhân: <i>tôi không cần phải chọn giữa sự sang trọng, hiệu suất và phong cách</i>.</p>
<p>Với mức giá khởi điểm cho Urus SE tại các thị trường châu Á dao động từ <strong>15 tỷ đến 20 tỷ đồng</strong> tùy cấu hình và thuế nhập khẩu, Tettonero Capsule là phiên bản đáng để đặt hàng nếu bạn muốn có chiếc Urus SE khác biệt hoàn toàn so với phần còn lại.</p>
<p><i>Lamborghini hiện phân phối chính hãng tại Việt Nam thông qua nhà phân phối chính thức tại Hà Nội và TP.HCM.</i></p>`,
    category: 'news',
    is_featured: true,
    reading_time_minutes: 5,
    view_count: 0,
    tags: ['Lamborghini', 'Urus SE', 'Hybrid', 'SUV', 'Siêu xe', 'Ad Personam', 'PHEV'],
    cover_url: 'https://res.cloudinary.com/dhiykqhrp/image/upload/v1779010978/668202_d99f06cfb6.jpg',
    publishedAt: new Date('2026-05-17T09:51:54.401Z'),
  },
];

// ── Car Variants ──────────────────────────────────────────────────────────────

const seedCarVariants = [
  // ── Toyota Fortuner ────────────────────────────────────────────────────────
  {
    modelSlug: 'fortuner',
    name: 'Fortuner 2.4L MT 4x2',
    slug: 'fortuner-2-4l-mt-4x2',
    year: 2024,
    price: 1065000000,
    fuel_type: 'diesel',
    transmission: 'manual',
    drivetrain: 'fwd',
    displacement_cc: 2393,
    cylinders: 4,
    horsepower: 150,
    torque_nm: 400,
    fuel_consumption_combined: 7.8,
    acceleration_0_100: 12.5,
    length_mm: 4795,
    width_mm: 1855,
    height_mm: 1835,
    wheelbase_mm: 2745,
    ground_clearance_mm: 221,
    trunk_volume_liters: 323,
    fuel_tank_liters: 80,
    curb_weight_kg: 1950,
    seating_capacity: 7,
    safety_features: ['7 túi khí', 'VSC', 'HAC', 'ABS+EBD', 'Camera lùi', 'Cảnh báo điểm mù'],
    comfort_features: ['Màn hình 9 inch', 'Apple CarPlay/Android Auto', 'Điều hòa tự động 2 vùng', 'Ghế lái chỉnh điện 8 hướng'],
    tech_features: ['Toyota Safety Sense', 'Adaptive Cruise Control', 'Lane Departure Alert', 'Pre-Collision System'],
  },
  {
    modelSlug: 'fortuner',
    name: 'Fortuner 2.8L AT 4x4 Legender',
    slug: 'fortuner-2-8l-at-4x4-legender',
    year: 2024,
    price: 1479000000,
    fuel_type: 'diesel',
    transmission: 'automatic',
    drivetrain: 'four_wd',
    displacement_cc: 2755,
    cylinders: 4,
    horsepower: 204,
    torque_nm: 500,
    fuel_consumption_combined: 8.9,
    acceleration_0_100: 10.8,
    length_mm: 4795,
    width_mm: 1855,
    height_mm: 1835,
    wheelbase_mm: 2745,
    ground_clearance_mm: 221,
    trunk_volume_liters: 323,
    fuel_tank_liters: 80,
    curb_weight_kg: 2140,
    seating_capacity: 7,
    safety_features: ['9 túi khí', 'VSC+ATRAC', 'HAC', 'ABS+EBD', 'Camera 360°', 'Cảnh báo điểm mù', 'Hỗ trợ xuống dốc'],
    comfort_features: ['Màn hình 9 inch', 'Apple CarPlay/Android Auto', 'Ghế da', 'Điều hòa 3 vùng', 'Cửa sổ trời toàn cảnh'],
    tech_features: ['Toyota Safety Sense', 'Radar Cruise Control', 'Pre-Collision System', 'Lane Departure Alert', 'Automatic High Beam'],
  },

  // ── Mazda CX-5 ─────────────────────────────────────────────────────────────
  {
    modelSlug: 'cx-5',
    name: 'CX-5 2.0L Luxury',
    slug: 'cx-5-2-0l-luxury',
    year: 2024,
    price: 799000000,
    fuel_type: 'gasoline',
    transmission: 'automatic',
    drivetrain: 'fwd',
    displacement_cc: 1998,
    cylinders: 4,
    horsepower: 165,
    torque_nm: 213,
    fuel_consumption_combined: 7.1,
    acceleration_0_100: 10.2,
    length_mm: 4575,
    width_mm: 1845,
    height_mm: 1680,
    wheelbase_mm: 2700,
    ground_clearance_mm: 200,
    trunk_volume_liters: 442,
    fuel_tank_liters: 58,
    curb_weight_kg: 1519,
    seating_capacity: 5,
    safety_features: ['6 túi khí', 'ABS+EBD', 'Radar lùi', 'Cảnh báo điểm mù', 'Camera lùi', 'Cảnh báo chú ý người lái'],
    comfort_features: ['Màn hình 10.25 inch', 'Cửa sổ trời điện', 'Ghế da', 'Điều hòa tự động', 'Apple CarPlay/Android Auto'],
    tech_features: ['i-Activsense', 'Smart Brake Support', 'Lane-Keep Assist', 'Adaptive LED', 'Rear Cross Traffic Alert'],
  },
  {
    modelSlug: 'cx-5',
    name: 'CX-5 2.5L Signature AWD',
    slug: 'cx-5-2-5l-signature-awd',
    year: 2024,
    price: 999000000,
    fuel_type: 'gasoline',
    transmission: 'automatic',
    drivetrain: 'awd',
    displacement_cc: 2488,
    cylinders: 4,
    horsepower: 188,
    torque_nm: 251,
    fuel_consumption_combined: 8.5,
    acceleration_0_100: 8.9,
    length_mm: 4575,
    width_mm: 1845,
    height_mm: 1680,
    wheelbase_mm: 2700,
    ground_clearance_mm: 200,
    trunk_volume_liters: 442,
    fuel_tank_liters: 58,
    curb_weight_kg: 1647,
    seating_capacity: 5,
    safety_features: ['6 túi khí', 'ABS+EBD+TCS', 'Cảnh báo điểm mù', 'Camera 360°', 'Cảnh báo làn đường', 'Hỗ trợ đỗ xe tự động'],
    comfort_features: ['Màn hình 10.25 inch', 'Nappa leather', 'Cửa sổ trời toàn cảnh', 'Điều hòa tự động 3 vùng', 'Bose sound system 10 loa'],
    tech_features: ['i-Activsense đầy đủ', 'Adaptive Cruise Control', 'Mazda Radar Cruise', 'Traffic Sign Recognition', 'Automatic Brake Hold'],
  },

  // ── Honda CR-V ─────────────────────────────────────────────────────────────
  {
    modelSlug: 'cr-v',
    name: 'CR-V 1.5L G',
    slug: 'cr-v-1-5l-g',
    year: 2024,
    price: 998000000,
    fuel_type: 'gasoline',
    transmission: 'cvt',
    drivetrain: 'fwd',
    displacement_cc: 1498,
    cylinders: 4,
    horsepower: 193,
    torque_nm: 243,
    fuel_consumption_combined: 6.9,
    acceleration_0_100: 9.1,
    length_mm: 4621,
    width_mm: 1865,
    height_mm: 1682,
    wheelbase_mm: 2701,
    ground_clearance_mm: 207,
    trunk_volume_liters: 626,
    fuel_tank_liters: 57,
    curb_weight_kg: 1546,
    seating_capacity: 5,
    safety_features: ['6 túi khí', 'ABS+VSA', 'Radar lùi', 'Camera lùi HD', 'Cảnh báo điểm mù'],
    comfort_features: ['Màn hình 9 inch', 'Apple CarPlay/Android Auto', 'Ghế da', 'Điều hòa tự động', 'Cửa sổ trời điện'],
    tech_features: ['Honda Sensing', 'Adaptive Cruise Control', 'Lane Keeping Assist', 'Collision Mitigation Braking', 'Road Departure Mitigation'],
  },
  {
    modelSlug: 'cr-v',
    name: 'CR-V 2.0 Hybrid e:HEV L',
    slug: 'cr-v-2-0-hybrid-l',
    year: 2024,
    price: 1258000000,
    fuel_type: 'hybrid',
    transmission: 'automatic',
    drivetrain: 'awd',
    displacement_cc: 1993,
    cylinders: 4,
    horsepower: 204,
    torque_nm: 315,
    fuel_consumption_combined: 5.4,
    acceleration_0_100: 7.8,
    length_mm: 4621,
    width_mm: 1865,
    height_mm: 1682,
    wheelbase_mm: 2701,
    ground_clearance_mm: 200,
    trunk_volume_liters: 565,
    fuel_tank_liters: 57,
    battery_capacity_kwh: 1.05,
    curb_weight_kg: 1789,
    seating_capacity: 5,
    safety_features: ['8 túi khí', 'ABS+VSA+EBD', 'Camera 360°', 'Cảnh báo điểm mù', 'Cross Traffic Monitor', 'Parking Sensor'],
    comfort_features: ['Màn hình 9 inch', 'Ghế da Nappa', 'Ghế massage', 'Bose sound 12 loa', 'Điều hòa 3 vùng', 'Cửa sổ trời toàn cảnh'],
    tech_features: ['Honda Sensing đầy đủ', 'Adaptive Cruise Control+', 'Traffic Jam Assist', 'Automatic Brake Hold', 'Remote Parking Assist'],
  },

  // ── VinFast VF9 ─────────────────────────────────────────────────────────────
  {
    modelSlug: 'vf9',
    name: 'VF9 Plus',
    slug: 'vf9-plus',
    year: 2024,
    price: 1690000000,
    fuel_type: 'electric',
    transmission: 'automatic',
    drivetrain: 'awd',
    displacement_cc: null,
    cylinders: null,
    horsepower: 402,
    torque_nm: 640,
    fuel_consumption_combined: 0,
    acceleration_0_100: 5.9,
    top_speed_kmh: 200,
    battery_capacity_kwh: 92.0,
    length_mm: 5120,
    width_mm: 1999,
    height_mm: 1721,
    wheelbase_mm: 3150,
    ground_clearance_mm: 175,
    trunk_volume_liters: 285,
    curb_weight_kg: 2580,
    seating_capacity: 7,
    safety_features: ['8 túi khí', 'ABS+EBD+TCS', 'Camera 360°', 'Cảnh báo điểm mù', 'Driver Drowsiness Monitor', 'Emergency Stop Signal'],
    comfort_features: ['Màn hình 15.6 inch', 'Màn hình hàng sau 10 inch', 'Ghế da chỉnh điện 8 hướng', 'Massage ghế trước', 'Panoramic roof', 'Harman Kardon 14 loa'],
    tech_features: ['ADAS Level 2+', 'Adaptive Cruise Control', 'Auto Lane Change', 'Parking Assistant', 'OTA Software Updates', 'VinFast Connect'],
  },
  {
    modelSlug: 'vf9',
    name: 'VF9 Eco',
    slug: 'vf9-eco',
    year: 2024,
    price: 1388000000,
    fuel_type: 'electric',
    transmission: 'automatic',
    drivetrain: 'awd',
    displacement_cc: null,
    cylinders: null,
    horsepower: 300,
    torque_nm: 500,
    fuel_consumption_combined: 0,
    acceleration_0_100: 6.5,
    top_speed_kmh: 180,
    battery_capacity_kwh: 82.0,
    length_mm: 5120,
    width_mm: 1999,
    height_mm: 1721,
    wheelbase_mm: 3150,
    ground_clearance_mm: 175,
    trunk_volume_liters: 285,
    curb_weight_kg: 2520,
    seating_capacity: 7,
    safety_features: ['8 túi khí', 'ABS+EBD', 'Camera 360°', 'Radar lùi', 'Cảnh báo điểm mù'],
    comfort_features: ['Màn hình 15.6 inch', 'Ghế da chỉnh điện', 'Điều hòa tự động', 'Apple CarPlay/Android Auto'],
    tech_features: ['ADAS Level 2', 'Adaptive Cruise Control', 'Lane Keep Assist', 'OTA Software Updates'],
  },

  // ── Ford Ranger ────────────────────────────────────────────────────────────
  {
    modelSlug: 'ranger',
    name: 'Ranger XLS 2.0L AT 4x2',
    slug: 'ranger-xls-2-0l-at-4x2',
    year: 2024,
    price: 699000000,
    fuel_type: 'diesel',
    transmission: 'automatic',
    drivetrain: 'fwd',
    displacement_cc: 1996,
    cylinders: 4,
    horsepower: 170,
    torque_nm: 405,
    fuel_consumption_combined: 7.5,
    acceleration_0_100: 12.0,
    length_mm: 5370,
    width_mm: 1918,
    height_mm: 1815,
    wheelbase_mm: 3270,
    ground_clearance_mm: 237,
    trunk_volume_liters: 1085,
    fuel_tank_liters: 80,
    curb_weight_kg: 1960,
    seating_capacity: 5,
    safety_features: ['6 túi khí', 'ABS+EBD', 'Cảnh báo điểm mù', 'Camera lùi', 'Cảnh báo chệch làn đường'],
    comfort_features: ['Màn hình 10.1 inch SYNC 4', 'Apple CarPlay/Android Auto', 'Ghế da', 'Điều hòa tự động'],
    tech_features: ['Ford Co-Pilot360', 'Pre-Collision Assist', 'Lane-Keeping Aid', 'Adaptive Cruise Control'],
  },
  {
    modelSlug: 'ranger',
    name: 'Ranger Wildtrak 2.0L AT 4x4 Bi-Turbo',
    slug: 'ranger-wildtrak-2-0l-at-4x4-biturbo',
    year: 2024,
    price: 925000000,
    fuel_type: 'diesel',
    transmission: 'automatic',
    drivetrain: 'four_wd',
    displacement_cc: 1996,
    cylinders: 4,
    horsepower: 210,
    torque_nm: 500,
    fuel_consumption_combined: 8.8,
    acceleration_0_100: 10.5,
    length_mm: 5370,
    width_mm: 1918,
    height_mm: 1880,
    wheelbase_mm: 3270,
    ground_clearance_mm: 237,
    trunk_volume_liters: 1085,
    fuel_tank_liters: 80,
    curb_weight_kg: 2168,
    seating_capacity: 5,
    safety_features: ['7 túi khí', 'ABS+EBD+TCS', 'Camera 360°', 'Cảnh báo điểm mù', 'Rear Cross Traffic Alert', 'Parking Assist'],
    comfort_features: ['Màn hình 12 inch SYNC 4', 'B&O Sound System', 'Ghế da Nappa', 'Điều hòa 2 vùng', 'Cửa sổ trời'],
    tech_features: ['Ford Co-Pilot360 đầy đủ', 'Adaptive Cruise Control Stop & Go', 'Evasive Steering', 'Matrix LED', 'Trail Control'],
  },
];

module.exports = { seedAuthors, seedCarBrands, seedCarModels, seedArticles, seedCarVariants };
