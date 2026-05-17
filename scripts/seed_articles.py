#!/usr/bin/env python3
"""Push 14 real articles to Strapi via REST API."""
import sys, json, urllib.request, urllib.error
sys.stdout.reconfigure(encoding='utf-8')

BASE = "http://localhost:1337"
TOKEN = "14006d13d352211548ddd34d5a149c4a0d0f8ac958c04d03280c12a89bea292f423fde74acdea441df155364971364adcb353092fb3e1c7bf74c892bb4d20a3093fb35365e81679603dccf58b7cc354bba327eb701f03ae0a6726cc231264d584d3f75f59a9073d83017fe2cc59d823116f8203e7a21485dcc4e1273285d2b3d"
AUTHOR_DOC_ID = "dbgatu0qqleijukez08dt8wq"

ARTICLES = [
  # ─── BÀI 1 ──────────────────────────────────────────────────────
  {
    "title_vi": "VinFast tái cơ cấu 530 triệu USD: \"Ve sầu thoát xác\" hay bước đi chiến lược?",
    "title_en": "VinFast's $530M Restructuring: Strategic Pivot or Exit?",
    "slug_vi": "vinfast-tai-co-cau-530-trieu-usd-chien-luoc",
    "slug_en": "vinfast-530m-restructuring-strategic-pivot",
    "excerpt_vi": "Ngày 12/5/2026, VinFast bất ngờ công bố kế hoạch thoái vốn toàn bộ mảng sản xuất trị giá hơn 13.300 tỷ đồng. Đây là bước chuyển chiến lược lớn nhất của hãng xe Việt kể từ khi niêm yết trên Nasdaq.",
    "excerpt_en": "VinFast announced a sweeping restructuring on May 12, 2026, divesting its entire manufacturing arm for $530M while retaining IP, R&D and its sales network.",
    "content_vi": """<p>Sáng 12/5/2026, VinFast Auto Ltd. — hãng xe điện Việt Nam đang niêm yết trên sàn Nasdaq — chính thức công bố kế hoạch tái cơ cấu toàn diện mô hình hoạt động tại thị trường nội địa. Thông báo lập tức gây chấn động toàn ngành ô tô Việt Nam và thu hút sự chú ý của giới đầu tư quốc tế.</p>

<h2>Cụ thể kế hoạch tái cơ cấu là gì?</h2>

<p>Theo tài liệu công bố, VinFast sẽ thực hiện một thương vụ hai bước:</p>

<ul>
<li><strong>Bước 1:</strong> Tách một phần tài sản từ Công ty CP Sản xuất và Kinh doanh VinFast (VFTP) để thành lập pháp nhân mới — VinFast Việt Nam (VFVN). Công ty mới này sẽ kế thừa toàn bộ hoạt động nghiên cứu và phát triển toàn cầu, quyền sở hữu trí tuệ (IP), cùng mạng lưới bán hàng và dịch vụ hậu mãi tại Việt Nam.</li>
<li><strong>Bước 2:</strong> VinFast thoái toàn bộ phần vốn cổ phần tại VFTP — tức mảng sản xuất thực tế — cho một nhóm nhà đầu tư mới do Công ty CP Đầu tư Nghiên cứu và Phát triển Tương lai dẫn đầu. Chủ tịch Phạm Nhật Vượng cũng tham gia với tư cách nhà đầu tư thiểu số.</li>
</ul>

<p>Tổng giá trị thương vụ vào khoảng <strong>13.309 tỷ đồng (~530 triệu USD)</strong>, được định giá dựa trên giá trị sổ sách tài sản thuần theo Chuẩn mực Kế toán Việt Nam tính đến 31/3/2026 — cao hơn mức trung bình 106 triệu USD mà công ty tư vấn Grant Thornton định giá độc lập.</p>

<h2>VinFast giữ lại gì?</h2>

<p>Điều quan trọng cần hiểu là VinFast <em>không bán thương hiệu, không bán công nghệ, không rút khỏi thị trường</em>. Công ty mới VFVN sẽ:</p>

<ul>
<li>Sở hữu toàn bộ IP, bằng sáng chế và nền tảng phần mềm xe điện</li>
<li>Tiếp tục điều hành hệ thống showroom, dịch vụ và chính sách bảo hành</li>
<li>Là trung tâm R&amp;D toàn cầu của VinFast</li>
<li>Vẫn là công ty con trực thuộc VinFast Auto Ltd. trên Nasdaq</li>
</ul>

<p>Nói cách khác, VinFast chuyển từ mô hình <em>"tự làm tất cả"</em> sang mô hình <em>"asset-light"</em> — thiết kế, phát triển và bán hàng; thuê ngoài hoặc để đối tác đảm nhận phần sản xuất nặng vốn.</p>

<h2>Tại sao lại làm vậy?</h2>

<p>Ngành ô tô toàn cầu đang chứng kiến làn sóng tách biệt giữa mảng sản xuất và mảng công nghệ. Apple không tự làm iPhone; nhiều hãng xe mới nổi như Rivian, Lucid đang thuê ngoài một phần dây chuyền. Với VinFast, mô hình asset-light giúp:</p>

<ul>
<li><strong>Giảm chi phí vốn đầu tư (capex)</strong> vốn rất nặng trong sản xuất ô tô</li>
<li><strong>Cải thiện cấu trúc tài chính</strong> trên bảng cân đối kế toán niêm yết</li>
<li><strong>Tập trung nguồn lực</strong> vào phần mang lại biên lợi nhuận cao hơn: phần mềm, dịch vụ, thương hiệu</li>
</ul>

<h2>Ảnh hưởng đến người đang dùng xe VinFast?</h2>

<p>VinFast khẳng định giao dịch này <strong>không ảnh hưởng đến bảo hành, dịch vụ hậu mãi, và chính sách pin</strong> hiện hành. Các nhà máy tại Ấn Độ và Indonesia tiếp tục hoạt động bình thường dưới VinFast Auto Ltd. Kế hoạch dự kiến hoàn tất vào <strong>quý 3/2026</strong>, tùy thuộc chấp thuận của cổ đông và chủ nợ.</p>

<p>Đây là một trong những quyết định táo bạo nhất trong lịch sử doanh nghiệp Việt Nam — và thị trường sẽ cần thêm thời gian để đánh giá đầy đủ tác động dài hạn của nó.</p>""",
    "content_en": "<p>On May 12, 2026, VinFast Auto Ltd. announced a major restructuring of its Vietnamese manufacturing operations, divesting its production arm while retaining intellectual property, R&D, and its sales network under a new entity called VinFast Vietnam (VFVN). The deal is valued at approximately $530 million USD.</p>",
    "category": "news",
    "tags": ["VinFast", "tái cơ cấu", "thị trường ô tô", "xe điện"],
    "is_featured": False,
    "reading_time_minutes": 5,
  },

  # ─── BÀI 2 ──────────────────────────────────────────────────────
  {
    "title_vi": "VinFast thống trị tháng 4/2026: 24.774 xe, bỏ xa Toyota gấp 4 lần",
    "title_en": "VinFast Dominates April 2026: 24,774 Units — 4x Toyota",
    "slug_vi": "vinfast-doanh-so-thang-4-2026-so-1",
    "slug_en": "vinfast-april-2026-sales-number-one",
    "excerpt_vi": "VinFast bán 24.774 xe trong tháng 4/2026, tăng 158% so với cùng kỳ năm ngoái và gấp gần 4 lần Toyota — thương hiệu đứng thứ hai. Đây là tháng thứ 19 liên tiếp VinFast dẫn đầu thị trường Việt Nam.",
    "excerpt_en": "VinFast sold 24,774 vehicles in April 2026, up 158% year-on-year and nearly 4x Toyota's figures, marking 19 consecutive months atop Vietnam's sales charts.",
    "content_vi": """<p>Số liệu từ Hiệp hội các nhà sản xuất ô tô Việt Nam (VAMA) vừa được công bố cho thấy tháng 4/2026 tiếp tục là tháng của VinFast. Hãng xe Việt bán ra <strong>24.774 chiếc</strong> — con số cao gần gấp đôi cùng kỳ năm 2025 (9.588 xe) và đưa VinFast vào vị trí thống trị tuyệt đối với thị phần vượt 40%.</p>

<h2>Top 5 xe bán chạy nhất tháng 4/2026</h2>

<p>Đáng chú ý, trong danh sách 10 xe bán chạy nhất toàn thị trường tháng này, VinFast chiếm trọn 5 vị trí đầu bảng:</p>

<ul>
<li><strong>VinFast Limo Green</strong> — 6.480 xe (xe dịch vụ taxi điện)</li>
<li><strong>VinFast VF 3</strong> — 5.273 xe (mini EV đô thị)</li>
<li><strong>VinFast VF 5</strong> — 4.732 xe (B-SUV điện)</li>
<li><strong>VinFast VF 6</strong> — 2.704 xe (C-SUV điện)</li>
<li><strong>VinFast VF MPV 7</strong> — 2.526 xe (MPV điện)</li>
</ul>

<p>Ở nhóm xe xăng/dầu, <strong>Toyota Veloz Cross</strong> bất ngờ vươn lên dẫn đầu phân khúc với doanh số ấn tượng, cho thấy dòng MPV gia đình vẫn rất được người Việt ưa chuộng.</p>

<h2>Các thương hiệu khác ở đâu?</h2>

<p>Toyota đứng thứ 2 toàn thị trường với <strong>6.378 xe</strong> — chỉ bằng 1/4 VinFast. Hyundai, Ford và Mitsubishi tiếp tục cạnh tranh trong nhóm bám đuổi. Một số thương hiệu như Hyundai ghi nhận doanh số giảm đáng kể so với tháng 3, phản ánh tình trạng thị trường chung sau kỳ nghỉ lễ 30/4.</p>

<h2>19 tháng không ngừng nghỉ</h2>

<p>Tính từ tháng 10/2024, VinFast chưa một lần nhường vị trí số 1 cho bất kỳ đối thủ nào. Điều này đã thay đổi căn bản bức tranh thị trường ô tô Việt Nam — vốn từng là sân chơi của Toyota, Hyundai và Honda suốt nhiều thập kỷ.</p>

<p>Tổng thị trường tháng 4/2026 đạt <strong>60.615 xe</strong> các loại, trong đó thành viên VAMA đóng góp 31.937 xe (tăng 7,95% so với cùng kỳ 2025). Dù thị trường có dấu hiệu giảm tốc so với tháng 3 do kỳ nghỉ lễ dài, VinFast vẫn duy trì đà tăng trưởng mạnh mẽ nhờ danh mục sản phẩm đa dạng phủ nhiều phân khúc.</p>

<blockquote>Với tốc độ tăng trưởng 158% so với cùng kỳ, VinFast đang trở thành hãng xe nội địa hiếm hoi trên thế giới thực sự áp đảo thị trường trong nước trước các thương hiệu ngoại.</blockquote>

<p>Trong 4 tháng đầu năm 2026, VinFast đã bán hơn <strong>78.000 ô tô điện</strong> — một con số khiến nhiều nhà phân tích thế giới phải nhìn nhận lại khả năng thực tế của hãng xe Việt trên bản đồ xe điện toàn cầu.</p>""",
    "content_en": "<p>VinFast sold 24,774 vehicles in April 2026, up 158% year-on-year, occupying all five of the top-selling spots in Vietnam's market. The brand has now led monthly sales for 19 consecutive months.</p>",
    "category": "news",
    "tags": ["VinFast", "doanh số", "VAMA", "thị trường ô tô", "xe điện"],
    "is_featured": False,
    "reading_time_minutes": 4,
  },

  # ─── BÀI 3 ──────────────────────────────────────────────────────
  {
    "title_vi": "Hàng loạt xe ô tô giảm giá trăm triệu từ 2026: Cơ hội vàng hay nên chờ thêm?",
    "title_en": "Cars Drop by Hundreds of Millions in 2026: Buy Now or Wait?",
    "slug_vi": "xe-giam-gia-tram-trieu-2026-nen-mua-hay-cho",
    "slug_en": "car-price-drop-2026-buy-or-wait",
    "excerpt_vi": "Năm 2026 mang theo hàng loạt chính sách thuế mới khiến nhiều mẫu xe ô tô tại Việt Nam giảm giá từ vài chục đến hàng trăm triệu đồng. Chúng tôi phân tích chi tiết từng chính sách và xe nào được hưởng lợi nhiều nhất.",
    "excerpt_en": "Multiple new tax policies in 2026 are pushing car prices down by tens to hundreds of millions of VND. We break down which vehicles benefit most.",
    "content_vi": """<p>Năm 2026 đánh dấu một bước ngoặt lớn về chính sách thuế ô tô tại Việt Nam. Nhiều luồng thay đổi cùng xuất hiện một lúc, tạo ra hiệu ứng "giảm giá kép" cho người mua xe — đặc biệt với những ai đang cân nhắc xe nhập khẩu châu Âu hoặc xe hybrid.</p>

<h2>1. Thuế nhập khẩu xe từ EU giảm mạnh theo EVFTA</h2>

<p>Theo lộ trình Hiệp định Thương mại tự do EU–Việt Nam (EVFTA), từ ngày 1/1/2026, thuế nhập khẩu ô tô nguyên chiếc (CBU) từ các nước EU giảm xuống còn <strong>24–29%</strong> tùy chủng loại, so với mức cao hơn những năm trước. Theo lộ trình, mức thuế này sẽ về <strong>0% vào năm 2030</strong>.</p>

<p>Các mẫu được hưởng lợi trực tiếp: BMW, Mercedes-Benz, Audi, Volkswagen, Volvo, Peugeot, Renault. Ước tính một chiếc Mercedes C300 hay BMW 320i có thể giảm <strong>150–250 triệu đồng</strong> so với năm 2025.</p>

<h2>2. Xe hybrid (HEV) được giảm 30% thuế tiêu thụ đặc biệt</h2>

<p>Đây là thay đổi tác động rộng nhất. Từ 1/1/2026, theo Luật Thuế tiêu thụ đặc biệt sửa đổi, xe hybrid tự sạc (HEV) chính thức được áp mức thuế TTĐB bằng <strong>70% xe xăng cùng dung tích</strong>. Trước đây chỉ xe PHEV (cắm sạc) được ưu đãi này.</p>

<p>Điều này có nghĩa các mẫu bán chạy như Toyota Corolla Cross Hybrid, Camry HEV, Honda CR-V e:HEV, Mitsubishi Outlander PHEV đều giảm giá đáng kể:</p>

<ul>
<li>Xe hybrid giá ~1,5 tỷ: giảm khoảng <strong>100–150 triệu đồng</strong></li>
<li>Xe hybrid giá ~2 tỷ: giảm khoảng <strong>150–200 triệu đồng</strong></li>
</ul>

<h2>3. Giảm VAT từ 10% xuống 8%</h2>

<p>Chính sách giảm thuế giá trị gia tăng từ 10% xuống 8% tiếp tục kéo dài đến hết năm 2026. Với một chiếc xe 1 tỷ đồng, người mua tiết kiệm thêm khoảng <strong>18–20 triệu đồng</strong>.</p>

<h2>4. Giảm lệ phí đăng ký biển số 30%</h2>

<p>Bộ Tài chính đề xuất giảm 30% lệ phí đăng ký cấp biển số. Tại Hà Nội và TP.HCM, lệ phí xe dưới 9 chỗ giảm từ 20 triệu xuống còn <strong>14 triệu đồng</strong>.</p>

<h2>5. Xe điện tiếp tục miễn 100% lệ phí trước bạ</h2>

<p>Chủ xe điện tiếp tục được miễn hoàn toàn lệ phí trước bạ đến <strong>28/2/2027</strong>. Với xe 1,5 tỷ tại Hà Nội, khoản miễn này tương đương <strong>75 triệu đồng</strong>.</p>

<h2>Vậy nên mua ngay hay chờ?</h2>

<p>Nếu bạn đang cân nhắc xe hybrid hoặc xe nhập châu Âu, thời điểm hiện tại là <strong>tốt nhất trong nhiều năm</strong>. Các chính sách ưu đãi đang cộng hưởng với nhau tạo ra mức giảm thực tế 10–20% so với 2024. Tuy nhiên, nếu bạn chủ yếu quan tâm xe điện thuần (BEV), hãy theo dõi thêm: mức giảm lệ phí trước bạ dự kiến kéo dài đến đầu 2027 nên chưa có áp lực thời gian.</p>""",
    "content_en": "<p>Multiple overlapping tax policies in 2026 — EVFTA import cuts, HEV excise tax reductions, VAT decreases, and registration fee cuts — are combining to make this one of the best years to buy a car in Vietnam.</p>",
    "category": "news",
    "tags": ["thuế", "EVFTA", "xe hybrid", "giá xe", "chính sách"],
    "is_featured": False,
    "reading_time_minutes": 5,
  },

  # ─── BÀI 4 ──────────────────────────────────────────────────────
  {
    "title_vi": "Xe hybrid được ưu đãi thuế từ 1/1/2026: Corolla Cross, Camry, CR-V giảm bao nhiêu?",
    "title_en": "Hybrid Tax Breaks from Jan 2026: How Much Do Corolla Cross, Camry, CR-V Drop?",
    "slug_vi": "xe-hybrid-uu-dai-thue-tieu-thu-dac-biet-2026",
    "slug_en": "hybrid-tax-break-2026-corolla-cross-camry-crv",
    "excerpt_vi": "Từ 1/1/2026, xe hybrid tự sạc (HEV) chính thức được giảm 30% thuế tiêu thụ đặc biệt — chính sách từng chỉ áp dụng cho xe PHEV. Chúng tôi tính toán cụ thể mức giảm giá thực tế cho từng mẫu xe đang bán tại Việt Nam.",
    "excerpt_en": "From January 1, 2026, self-charging hybrids (HEV) join plug-in hybrids in enjoying a 30% excise tax reduction. We calculate the real-world price drops for popular models.",
    "content_vi": """<p>Một trong những thay đổi chính sách quan trọng nhất với thị trường ô tô Việt Nam năm 2026 là việc mở rộng ưu đãi thuế tiêu thụ đặc biệt (TTĐB) cho xe hybrid tự sạc (HEV). Trước đây chỉ xe hybrid cắm sạc (PHEV) được hưởng mức thuế ưu đãi này — nay tất cả xe HEV cũng được vào "câu lạc bộ".</p>

<h2>Chính sách mới hoạt động như thế nào?</h2>

<p>Theo Luật Thuế tiêu thụ đặc biệt (sửa đổi) có hiệu lực từ 1/1/2026, xe HEV đáp ứng điều kiện (tỷ trọng sử dụng xăng không vượt quá 70% tổng năng lượng tiêu thụ) được áp mức thuế TTĐB <strong>bằng 70%</strong> so với xe xăng thuần cùng dung tích động cơ.</p>

<p>Ví dụ: Xe xăng 2.0L đang chịu thuế TTĐB 40% → Xe hybrid 2.0L chỉ chịu 28% (70% × 40%). Khoản chênh lệch 12% này được tính trên giá CIF nhập khẩu hoặc giá xuất xưởng — tạo ra mức giảm thực tế đáng kể.</p>

<h2>Các mẫu xe và mức giảm ước tính</h2>

<ul>
<li><strong>Toyota Corolla Cross Hybrid:</strong> Từ ~998 triệu → ước giảm <strong>70–90 triệu đồng</strong></li>
<li><strong>Toyota Camry HEV:</strong> Từ ~1,46 tỷ → ước giảm <strong>100–130 triệu đồng</strong></li>
<li><strong>Honda CR-V e:HEV:</strong> Từ ~1,26 tỷ → ước giảm <strong>80–110 triệu đồng</strong></li>
<li><strong>Toyota RAV4 Hybrid:</strong> Từ ~1,55 tỷ → ước giảm <strong>110–140 triệu đồng</strong></li>
<li><strong>Lexus RX 350h:</strong> Từ ~3,7 tỷ → ước giảm <strong>200–250 triệu đồng</strong></li>
</ul>

<p><em>Lưu ý: Mức giảm thực tế phụ thuộc vào cơ cấu giá từng hãng và chính sách áp thuế cụ thể cho từng mẫu. Các con số trên là ước tính tổng hợp từ chuyên gia ngành.</em></p>

<h2>Thị trường hybrid đang "nở rộ"</h2>

<p>Không cần đợi đến khi chính sách có hiệu lực, thị trường đã phản ứng trước. Trong quý 1/2026, doanh số xe hybrid toàn thị trường đạt <strong>5.125 chiếc</strong> — tăng gấp đôi so với cùng kỳ 2025. Người mua đang "đặt cược" vào xu hướng này.</p>

<p>Các hãng xe cũng đang chủ động đưa thêm phiên bản hybrid về Việt Nam. Hyundai Tucson Hybrid 2026 đang "đếm ngày" ra mắt; Mazda CX-5 Hybrid và Kia Sportage HEV cũng đang trong lộ trình nhập khẩu.</p>

<h2>Hybrid có phải lựa chọn tốt nhất năm 2026?</h2>

<p>Với ưu đãi thuế mới, khoảng cách giá giữa xe hybrid và xe xăng thu hẹp rõ rệt trong khi lợi ích tiêu thụ nhiên liệu vẫn giữ nguyên: tiết kiệm 15–20 triệu đồng tiền xăng mỗi năm với người đi 15.000 km. Bài toán hoàn vốn từ 5–6 năm nay rút xuống còn 3–4 năm — và đó là lý do xe hybrid đang trở thành "ngôi sao" của thị trường ô tô Việt Nam 2026.</p>""",
    "content_en": "<p>Vietnam's amended excise tax law extends hybrid tax breaks to self-charging HEVs from January 2026, reducing the tax burden by 30% versus petrol equivalents. Popular models like the Corolla Cross Hybrid and Camry HEV could drop by 70–130 million VND.</p>",
    "category": "news",
    "tags": ["xe hybrid", "thuế tiêu thụ đặc biệt", "Toyota", "Honda", "chính sách"],
    "is_featured": False,
    "reading_time_minutes": 4,
  },

  # ─── BÀI 5 ──────────────────────────────────────────────────────
  {
    "title_vi": "Subaru Forester 2026: Nhập Nhật, động cơ 2.5L mạnh hơn — nhưng giá tăng 100–200 triệu",
    "title_en": "Subaru Forester 2026: Made in Japan, Bigger 2.5L Engine — But 100–200M More Expensive",
    "slug_vi": "subaru-forester-2026-nhat-ban-dong-co-2-5l-gia-tang",
    "slug_en": "subaru-forester-2026-japan-2-5l-engine-price-increase",
    "excerpt_vi": "Thế hệ Subaru Forester hoàn toàn mới vừa ra mắt tại Việt Nam với hai thay đổi lớn: nhập khẩu từ Nhật Bản thay vì Thái Lan và nâng cấp lên động cơ Boxer 2.5L mạnh mẽ hơn. Đổi lại, giá khởi điểm tăng lên 1,299 tỷ đồng.",
    "excerpt_en": "The all-new Forester arrives in Vietnam built in Japan rather than Thailand, with a larger 2.5L Boxer engine — but at a price premium of 100–200M VND over its predecessor.",
    "content_vi": """<p>Subaru Việt Nam vừa chính thức trình làng thế hệ Forester hoàn toàn mới tại thị trường Việt Nam, đánh dấu bước chuyển đáng kể trong cả nguồn gốc sản xuất lẫn thông số kỹ thuật so với người tiền nhiệm. Đây là mẫu SUV Nhật Bản hiếm hoi còn duy trì cấu hình dẫn động 4 bánh toàn thời gian đối xứng (Symmetrical AWD) ngay ở phiên bản tiêu chuẩn.</p>

<h2>Thay đổi lớn nhất: Nhập Nhật, không còn là hàng Thái</h2>

<p>Forester các thế hệ trước tại Việt Nam đều được sản xuất tại Thái Lan. Thế hệ mới 2026 chuyển hoàn toàn sang sản xuất tại Nhật Bản — điều nhiều người yêu xe Subaru đã mong chờ. Tuy nhiên, xe Nhật nhập về Việt Nam đang chịu mức thuế nhập khẩu cao hơn (~31,8% so với xe ASEAN được hưởng 0%), đây là nguyên nhân chính khiến giá bán tăng mạnh.</p>

<h2>Động cơ Boxer 2.5L — lên hạng đáng kể</h2>

<p>Forester 2026 được trang bị khối động cơ Boxer (nằm ngang) 2.5L 4 xi-lanh hoàn toàn mới, thay thế cho động cơ 2.0L của thế hệ trước:</p>

<ul>
<li>Công suất: <strong>185 mã lực</strong> (tăng từ ~156 mã lực)</li>
<li>Mô-men xoắn: <strong>247 Nm</strong></li>
<li>Hộp số: CVT Lineartronic giả lập 8 cấp</li>
<li>Dẫn động: AWD đối xứng toàn thời gian</li>
</ul>

<p>Động cơ Boxer nằm thấp giúp trọng tâm xe thấp hơn, cải thiện khả năng vào cua và cảm giác lái ổn định — một trong những điểm mạnh truyền thống của Subaru mà người dùng Việt Nam đánh giá cao.</p>

<h2>Trang bị an toàn EyeSight thế hệ mới</h2>

<p>Hệ thống EyeSight trên Forester 2026 được nâng cấp với camera stereo độ phân giải cao hơn, mở rộng góc nhìn và cải thiện khả năng nhận diện người đi bộ trong điều kiện ánh sáng yếu. Các tính năng gồm:</p>

<ul>
<li>Phanh tự động khẩn cấp (AEB) với nhận diện người đi bộ và người đi xe đạp</li>
<li>Kiểm soát hành trình thích ứng (ACC) Stop &amp; Go</li>
<li>Hỗ trợ giữ làn và cảnh báo lệch làn chủ động</li>
<li>Camera 360 độ và cảm biến đỗ xe tự động</li>
<li>8 túi khí tiêu chuẩn</li>
</ul>

<h2>Giá bán và phiên bản</h2>

<p>Forester 2026 hiện có 2 phiên bản tại Việt Nam:</p>

<ul>
<li><strong>2.5i-L EyeSight:</strong> 1,299 tỷ đồng</li>
<li><strong>2.5i-S EyeSight:</strong> 1,399 tỷ đồng</li>
</ul>

<p>So với Forester thế hệ trước (giá khoảng 1,09–1,19 tỷ), mức tăng dao động từ <strong>100 đến 200 triệu đồng</strong>. Đây là mức tăng đáng kể nhưng phần nào được bù đắp bởi nâng cấp động cơ và chất lượng "made in Japan".</p>

<h2>Đánh giá sơ bộ: Xứng đáng không?</h2>

<p>Với giá 1,299–1,399 tỷ, Forester 2026 cạnh tranh trực tiếp với Mazda CX-5 (khoảng 799–949 triệu) và Honda CR-V (1,029–1,259 tỷ). Ở mức giá này, Forester định vị mình ở phân khúc cao hơn với lợi điểm: AWD toàn thời gian (không phải on-demand như đối thủ), động cơ mạnh hơn và chất lượng lắp ráp Nhật Bản. Nếu bạn cần một SUV thực dụng, bền bỉ và không ngại địa hình, đây vẫn là lựa chọn đáng cân nhắc.</p>""",
    "content_en": "<p>Subaru's all-new Forester 2026 arrives in Vietnam built in Japan with a more powerful 2.5L Boxer engine, full-time Symmetrical AWD, and updated EyeSight safety tech — priced from 1.299 billion VND.</p>",
    "category": "news",
    "tags": ["Subaru", "Forester", "SUV", "nhập khẩu Nhật Bản", "2026"],
    "is_featured": False,
    "reading_time_minutes": 5,
  },

  # ─── BÀI 6 ──────────────────────────────────────────────────────
  {
    "title_vi": "Honda City 2026 facelift chính thức ra mắt: Giá từ 499 triệu, Honda Sensing toàn bộ phiên bản",
    "title_en": "Honda City 2026 Facelift Launches: From 499M, Honda Sensing on All Trims",
    "slug_vi": "honda-city-2026-facelift-ra-mat-gia-499-trieu",
    "slug_en": "honda-city-2026-facelift-launch-499-million",
    "excerpt_vi": "Honda Việt Nam chính thức ra mắt City 2026 facelift với thiết kế mới thể thao hơn, lưới tản nhiệt tổ ong đặc trưng và gói an toàn Honda Sensing trang bị trên cả ba phiên bản. Giá bán không đổi so với đời cũ.",
    "excerpt_en": "Honda Vietnam launches the City 2026 facelift with a sportier look and Honda Sensing safety package across all three trims, with prices unchanged from the outgoing model.",
    "content_vi": """<p>Sau nhiều tháng rò rỉ hình ảnh chạy thử không che chắn trên mạng xã hội, Honda Việt Nam đã chính thức vén màn Honda City 2026 — phiên bản facelift giữa vòng đời của mẫu sedan B-segment đang dẫn đầu phân khúc. Điều đáng nói: giá bán được giữ nguyên dù xe được nâng cấp đáng kể cả về thiết kế lẫn trang bị an toàn.</p>

<h2>Thiết kế: Thể thao và sắc sảo hơn</h2>

<p>Nhìn từ phía trước, City 2026 có sự thay đổi rõ rệt nhất ở:</p>

<ul>
<li><strong>Lưới tản nhiệt dạng tổ ong</strong> — thiết kế mới phong cách thể thao, khác hoàn toàn lưới sọc ngang của đời cũ</li>
<li><strong>Cản trước được làm mới</strong> với các thanh chromé và hốc gió tạo hình khối rõ ràng hơn</li>
<li><strong>Đồ họa LED mới</strong> cho cả đèn pha và đèn hậu — sắc nét và nhận diện cao hơn về đêm</li>
</ul>

<p>Phần thân và đuôi xe giữ nguyên tỷ lệ quen thuộc. Honda chọn cách nâng cấp có chọn lọc thay vì thay đổi toàn diện — đây là chiến lược facelift điển hình nhằm giữ chi phí sản xuất ổn định.</p>

<h2>Honda Sensing — lần đầu có trên cả 3 phiên bản</h2>

<p>Đây là điểm nhấn lớn nhất của City 2026. Gói an toàn Honda Sensing — trước đây chỉ có trên bản RS cao cấp nhất — nay được trang bị <strong>tiêu chuẩn trên cả 3 phiên bản G, L và RS</strong>, bao gồm:</p>

<ul>
<li>Phanh giảm thiểu va chạm (CMBS)</li>
<li>Kiểm soát hành trình thích ứng (ACC)</li>
<li>Hỗ trợ giữ làn đường (LKAS)</li>
<li>Cảnh báo lệch làn (LDWS)</li>
<li>Đèn pha thích ứng tự động (AHB)</li>
<li>Thông báo xe phía trước khởi hành (LBWN)</li>
</ul>

<p>Việc phổ cập Honda Sensing xuống tận bản G giá 499 triệu là bước đi đáng khen — đưa City 2026 vào nhóm ít sedan cỡ B có ADAS đầy đủ ở mức giá này.</p>

<h2>Thông số kỹ thuật</h2>

<p>Phần cơ giới không thay đổi — đây là điểm trừ nhỏ với những ai kỳ vọng một khối động cơ mới:</p>

<ul>
<li>Động cơ: 1.5L i-VTEC 4 xi-lanh, <strong>119 mã lực</strong> / 6.600 rpm, 145 Nm / 4.300 rpm</li>
<li>Hộp số: CVT vô cấp</li>
<li>Kích thước: 4.580 × 1.748 × 1.467 mm, CSC 2.600 mm</li>
<li>Mức tiêu thụ nhiên liệu: ~6,5L/100km</li>
</ul>

<h2>Giá bán và phiên bản</h2>

<ul>
<li><strong>City G:</strong> 499 triệu đồng</li>
<li><strong>City L:</strong> 539 triệu đồng</li>
<li><strong>City RS:</strong> 569 triệu đồng</li>
</ul>

<p>Xe có 6 màu ngoại thất: trắng ngà, xám, titan, đỏ, xanh đậm và đen ánh.</p>

<h2>Cạnh tranh với Vios và Accent</h2>

<p>Toyota Vios 2026 vẫn là đối thủ trực tiếp ở phân khúc B-sedan, cùng Hyundai Accent và Kia Soluto. City có lợi thế về nội thất rộng rãi, động cơ mượt và nay có thêm ADAS toàn diện. Đây vẫn là một trong những lựa chọn sedan cỡ nhỏ đáng mua nhất tại Việt Nam năm 2026.</p>""",
    "content_en": "<p>Honda Vietnam's City 2026 facelift brings a sportier grille, refreshed LED lighting, and Honda Sensing safety suite across all three trim levels, with prices unchanged from the previous model.</p>",
    "category": "news",
    "tags": ["Honda", "City", "facelift", "sedan", "Honda Sensing"],
    "is_featured": False,
    "reading_time_minutes": 4,
  },

  # ─── BÀI 7 ──────────────────────────────────────────────────────
  {
    "title_vi": "Cuộc đua trạm sạc xe điện tại Việt Nam 2026: 30.000 trụ sắp phủ kín toàn quốc",
    "title_en": "Vietnam's EV Charging Race 2026: 30,000 Chargers Set to Cover the Country",
    "slug_vi": "cuoc-dua-tram-sac-xe-dien-viet-nam-2026",
    "slug_en": "vietnam-ev-charging-race-2026-30000-stations",
    "excerpt_vi": "Không chỉ VinFast, hàng loạt đơn vị đang đổ tiền vào hạ tầng sạc xe điện tại Việt Nam. Mục tiêu 30.000 trụ sạc vào 2030 ngày càng rõ nét — nhưng thách thức về quá tải điện lưới vẫn đang hiện hữu.",
    "excerpt_en": "Beyond VinFast, multiple players are racing to build EV charging infrastructure in Vietnam. A 30,000-charger target by 2030 is taking shape — though grid overload challenges remain.",
    "content_vi": """<p>Nếu tháng 4/2026 là tháng của VinFast về doanh số, thì có thể nói cả năm 2026 là năm của hạ tầng sạc điện tại Việt Nam. Cuộc đua lắp đặt trụ sạc đang diễn ra quyết liệt với sự tham gia của không chỉ các hãng xe mà còn cả doanh nghiệp năng lượng, xăng dầu và công nghệ.</p>

<h2>VinFast: 150.000 cổng sạc, 99 siêu trạm trên quốc lộ</h2>

<p>V-Green — mạng lưới sạc điện của VinFast — đã lắp đặt hơn <strong>150.000 cổng sạc</strong> tại 34 tỉnh thành, trải dài từ trung tâm thương mại, khu chung cư đến các tòa văn phòng. Đây là con số lớn nhất của bất kỳ đơn vị nào tại Việt Nam tính đến nay.</p>

<p>Trong 2026, VinFast tiếp tục đầu tư vào <strong>99 siêu trạm sạc nhanh</strong> dọc các tuyến quốc lộ chính với mỗi trạm có 100 cổng sạc công suất 150 kW — đủ để sạc từ 20% lên 80% trong khoảng 20–30 phút. Đây là hành động hướng đến mục tiêu đường dài, giải quyết lo ngại "range anxiety" của người mua xe điện.</p>

<h2>TMT: Mục tiêu 30.000 trụ đến 2030</h2>

<p>Công ty TMT-EGREEN đang nổi lên như một đối thủ nghiêm túc trong mảng hạ tầng sạc. Công ty này đã nhập khẩu 200 trụ sạc chuẩn châu Âu CCS2 ngay trong tháng 1/2026 và tiếp tục với 300 trụ trong tháng 3. Mục tiêu của TMT:</p>

<ul>
<li><strong>2.100 trạm</strong> hoàn thành trong năm 2026</li>
<li><strong>30.000 trụ</strong> phủ toàn quốc vào năm 2030</li>
<li>Tập trung tại Hà Nội, TP.HCM và dọc tuyến cao tốc Bắc–Nam</li>
</ul>

<p>Điểm khác biệt của TMT là dùng tiêu chuẩn <strong>CCS2 (châu Âu)</strong> thay vì chuẩn riêng, cho phép tất cả xe điện đa thương hiệu đều có thể sử dụng — không bị khóa vào một hãng cụ thể.</p>

<h2>Xăng dầu cũng vào cuộc</h2>

<p>Đáng chú ý, các đại gia xăng dầu như Petrolimex và PV Oil cũng đang gấp rút chuyển đổi một phần cây xăng thành trạm sạc điện. "Cơn sóng thần" từ xe điện VinFast buộc họ phải thích nghi hoặc mất thị phần.</p>

<h2>Thách thức: Hạ tầng điện lưới chưa theo kịp</h2>

<p>Mặt trái của tốc độ tăng trưởng này là áp lực lên hệ thống điện lưới. Tại Hà Nội, mật độ trạm sạc nội thành đã đạt <strong>3,5 km/trạm</strong> — nhưng hạ tầng điện tại nhiều khu dân cư cũ được xây từ 10–20 năm trước chưa được thiết kế để chịu tải trọng từ hàng nghìn xe điện sạc đồng thời.</p>

<p>Hình ảnh xếp hàng chờ sạc tại các trung tâm thương mại vào giờ cao điểm buổi tối đang trở nên quen thuộc — một vấn đề cần được giải quyết đồng bộ giữa hạ tầng sạc và nâng cấp lưới điện phân phối.</p>

<blockquote>Việt Nam đang xây dựng hạ tầng xe điện với tốc độ nhanh hiếm thấy — nhưng thách thức thực sự không nằm ở số lượng trụ sạc mà ở khả năng cung cấp điện đủ công suất cho tất cả chúng hoạt động cùng lúc.</blockquote>""",
    "content_en": "<p>Vietnam's EV charging race is heating up in 2026, with VinFast, TMT-EGREEN, oil majors, and others all vying to build national charging networks. The 30,000-charger target by 2030 is ambitious but faces real grid infrastructure challenges.</p>",
    "category": "news",
    "tags": ["xe điện", "trạm sạc", "VinFast", "hạ tầng", "EV"],
    "is_featured": False,
    "reading_time_minutes": 4,
  },

  # ─── BÀI 8 ──────────────────────────────────────────────────────
  {
    "title_vi": "Thị trường ô tô tháng 4/2026 giảm tốc: Vì sao giảm giá sâu vẫn ế?",
    "title_en": "Vietnam's Auto Market Slowed in April 2026: Why Deep Discounts Didn't Help",
    "slug_vi": "thi-truong-o-to-thang-4-2026-giam-toc-nguyen-nhan",
    "slug_en": "vietnam-auto-market-april-2026-slowdown-reasons",
    "excerpt_vi": "Thị trường ô tô Việt Nam tháng 4/2026 giảm 17% so với tháng 3 dù nhiều hãng đang áp dụng mức giảm giá và khuyến mãi mạnh nhất từ trước đến nay. Chúng tôi phân tích các nguyên nhân thực sự đằng sau nghịch lý này.",
    "excerpt_en": "Vietnam's car market fell 17% month-on-month in April 2026 despite record discounts industry-wide. We analyze the real reasons behind this paradox.",
    "content_vi": """<p>Tháng 4/2026 chứng kiến một nghịch lý thú vị trên thị trường ô tô Việt Nam: dù nhiều hãng xe đang áp dụng mức ưu đãi và giảm giá chưa từng có, doanh số toàn thị trường vẫn sụt giảm đáng kể so với tháng 3. Điều gì đang xảy ra?</p>

<h2>Số liệu tháng 4: Giảm mạnh so với tháng trước</h2>

<p>Theo số liệu từ VAMA, tháng 4/2026 ghi nhận:</p>

<ul>
<li>Tổng doanh số thành viên VAMA: <strong>31.937 xe</strong> — tăng 7,95% so với tháng 4/2025 nhưng <strong>giảm 17%</strong> so với tháng 3/2026</li>
<li>Xe du lịch: 21.284 xe, giảm 14% so với tháng 3</li>
<li>Xe thương mại: 9.805 xe, giảm mạnh 26% so với tháng 3</li>
<li>Xe chuyên dụng: 848 xe, tăng 62% (phân khúc nhỏ, biến động lớn)</li>
</ul>

<h2>Nguyên nhân 1: Hiệu ứng kỳ nghỉ lễ 30/4</h2>

<p>Nguyên nhân trực tiếp và dễ thấy nhất là kỳ nghỉ lễ 30/4 – 1/5 kéo dài. Trong tuần lễ này, phần lớn showroom giảm tải hoặc đóng cửa, nhân viên tư vấn nghỉ phép, và các quy trình vay vốn ngân hàng bị gián đoạn. Với một thị trường mà nhiều thương vụ được "chốt" vào cuối tuần và ngày lễ để gặp gia đình cùng quyết định, tháng 4 tự nhiên chịu bất lợi lịch.</p>

<h2>Nguyên nhân 2: Tâm lý "chờ thêm" của người mua</h2>

<p>Trớ trêu thay, chính những thông tin về chính sách giảm thuế và ưu đãi mới trong 2026 đang khiến một bộ phận người mua... chờ thêm. Nhiều khách hàng biết rằng xe hybrid sẽ giảm thêm sau khi thuế TTĐB mới có hiệu lực đầy đủ, hoặc đang nghe ngóng thêm thông tin về lộ trình giảm lệ phí đăng ký. Nghịch lý "chờ giảm thêm rồi mua" là câu chuyện quen thuộc trong thị trường ô tô toàn cầu.</p>

<h2>Nguyên nhân 3: Phân hóa ngày càng rõ giữa EV và xe truyền thống</h2>

<p>Trong khi VinFast bán 24.774 xe điện, nhiều mẫu xe xăng/dầu của các thương hiệu truyền thống ghi nhận doanh số rất thấp dù đã giảm giá mạnh. Điều này phản ánh sự phân hóa cấu trúc trong sở thích người tiêu dùng: một bộ phận lớn đang dứt khoát chuyển sang xe điện, và họ không còn hứng thú với xe xăng dù giá có hấp dẫn đến đâu.</p>

<h2>Nguyên nhân 4: Hiệu ứng "bứt tốc tháng 3"</h2>

<p>Tháng 3/2026 là tháng bứt tốc mạnh sau Tết nguyên đán, khi nhu cầu dồn nén bùng phát. Tháng 4 giảm so với tháng 3 một phần đơn giản là do "kéo trước" nhu cầu tự nhiên từ tháng trước — không phải vì thị trường đang gặp vấn đề căn bản.</p>

<h2>Nhìn cả bức tranh: Vẫn đang tăng trưởng</h2>

<p>Dù giảm so với tháng 3, thị trường tháng 4/2026 vẫn tăng <strong>7,95% so với cùng kỳ 2025</strong>. Trong 4 tháng đầu năm, toàn thị trường tăng trưởng khoảng 25% so với cùng kỳ năm ngoái — một con số tích cực. Đà giảm tốc tháng 4 là "nhịp điều chỉnh tất yếu" chứ không phải tín hiệu đảo chiều.</p>""",
    "content_en": "<p>Vietnam's auto market fell 17% month-on-month in April 2026, driven by the long holiday break, a 'wait-and-see' buyer psychology around new tax policies, and a structural shift toward EVs that's leaving traditional models behind.</p>",
    "category": "news",
    "tags": ["thị trường ô tô", "VAMA", "doanh số", "phân tích", "2026"],
    "is_featured": False,
    "reading_time_minutes": 4,
  },

  # ─── BÀI 9 ──────────────────────────────────────────────────────
  {
    "title_vi": "Đánh giá VinFast VF8 2026: Nội thất mới, pin 510km — SUV điện D-segment đáng mua nhất?",
    "title_en": "Review VinFast VF8 2026: New Interior, 510km Range — Best D-SUV EV to Buy?",
    "slug_vi": "danh-gia-vinfast-vf8-2026-noi-that-moi-pin-510km",
    "slug_en": "review-vinfast-vf8-2026-new-interior-510km-range",
    "excerpt_vi": "VinFast VF8 2026 nhận bản nâng cấp toàn diện với nội thất mới hoàn toàn, màn hình 15,6 inch, HUD và pin phiên bản Plus đạt 510km WLTP. Chúng tôi đánh giá liệu mức giá từ 1,057 tỷ có xứng đáng.",
    "excerpt_en": "The VF8 2026 gets a comprehensive refresh — new interior, 15.6-inch screen, HUD, and 510km WLTP range on the Plus. We assess whether the 1.057 billion price tag is justified.",
    "content_vi": """<p>VinFast VF8 đã từng là mẫu xe gây nhiều tranh cãi khi ra mắt — chất lượng phần mềm không đồng đều, nội thất chưa tương xứng giá tiền. Bản 2026 là câu trả lời của VinFast cho những phê bình đó: một bản nâng cấp toàn diện từ trong ra ngoài, đặc biệt tập trung vào nội thất và hệ thống thông tin giải trí.</p>

<h2>Thiết kế ngoại thất: Tiến hóa có chọn lọc</h2>

<p>Ngoại thất VF8 2026 giữ nguyên ngôn ngữ thiết kế của thế hệ trước nhưng được tinh chỉnh ở một số chi tiết. Kích thước xe:</p>

<ul>
<li>Dài × Rộng × Cao: <strong>4.750 × 1.900 × 1.660 mm</strong></li>
<li>Chiều dài cơ sở: <strong>2.950 mm</strong> — thuộc hàng dài nhất phân khúc D-SUV</li>
<li>Khoang hành lý: 564 lít (gập hàng ghế sau đạt 1.638 lít)</li>
</ul>

<h2>Nội thất: Thay đổi toàn diện — điểm nhấn lớn nhất</h2>

<p>Đây là phần VinFast đầu tư nhiều nhất vào VF8 2026. Khoang cabin được thiết kế lại với triết lý tối giản:</p>

<ul>
<li><strong>Màn hình giải trí 15,6 inch</strong> tích hợp cùng đồng hồ lái kỹ thuật số, thay thế cụm đồng hồ truyền thống</li>
<li><strong>Hệ thống HUD (Head-Up Display)</strong> chiếu thông tin tốc độ và dẫn đường lên kính lái</li>
<li>Bảng điều khiển trung tâm được tối giản, giảm thiểu nút bấm vật lý</li>
<li>Ghế lái chỉnh điện 8 hướng (Eco) / 12 hướng (Plus), tích hợp sưởi ghế</li>
<li>Hệ thống âm thanh 9 loa Harman</li>
</ul>

<p>Chất liệu nội thất được cải thiện rõ rệt — da mềm hơn, ốp táp-lô giảm bề mặt bóng dễ bám bụi. Bản Plus có thêm 4 lựa chọn màu nội thất: Saddle Brown, Cotton Beige, Navy Blue và Black.</p>

<h2>Pin và tầm hoạt động</h2>

<p>VF8 2026 có hai phiên bản pin:</p>

<ul>
<li><strong>Eco:</strong> Tầm hoạt động 460 km (WLTP)</li>
<li><strong>Plus:</strong> Tầm hoạt động 510 km (WLTP)</li>
</ul>

<p>Cả hai đều sử dụng hệ truyền động 2 motor điện tổng công suất 300 kW (408 mã lực), cho phép tăng tốc 0–100 km/h trong khoảng 5,9 giây.</p>

<h2>An toàn: 11 túi khí, ADAS nâng cao</h2>

<p>VF8 2026 trang bị <strong>11 túi khí</strong> tiêu chuẩn — nhiều nhất trong phân khúc D-SUV tại Việt Nam. Hệ thống ADAS bao gồm: kiểm soát hành trình thích ứng ACC Stop &amp; Go, hỗ trợ giữ làn, cảnh báo va chạm, hỗ trợ đỗ xe thông minh.</p>

<h2>Giá bán và đánh giá tổng thể</h2>

<ul>
<li><strong>VF8 Eco:</strong> 1.057.100.000 đồng</li>
<li><strong>VF8 Plus:</strong> 1.237.500.000 đồng</li>
</ul>

<p>So với phiên bản trước, VF8 2026 là bước tiến thực sự — không còn những phàn nàn về nội thất "chưa tương xứng giá". Ở mức 1,057 tỷ, đây là một trong những SUV điện D-segment có tỷ lệ trang bị/giá tốt nhất Đông Nam Á. Điểm trừ duy nhất còn lại: mạng lưới dịch vụ sau bán hàng cần tiếp tục cải thiện ở các tỉnh thành nhỏ.</p>""",
    "content_en": "<p>The VinFast VF8 2026 delivers a comprehensive update with a redesigned interior, 15.6-inch infotainment, HUD, and up to 510km WLTP range — addressing most criticisms of the previous generation at a competitive price from 1.057 billion VND.</p>",
    "category": "review",
    "tags": ["VinFast", "VF8", "SUV điện", "đánh giá", "xe điện"],
    "is_featured": False,
    "score": 8,
    "score_design": 8,
    "score_performance": 8,
    "score_comfort": 8,
    "score_tech": 9,
    "score_value": 8,
    "pros": ["Nội thất mới toàn diện, vật liệu tốt hơn", "Tầm hoạt động 510km thực dụng", "11 túi khí — an toàn nhất phân khúc", "Giá cạnh tranh so với đối thủ ngoại"],
    "cons": ["Dịch vụ sau bán hàng tại tỉnh chưa đều", "Phần mềm còn một vài lỗi nhỏ"],
    "verdict_vi": "VF8 2026 là bản chuộc lỗi thuyết phục của VinFast — nội thất và công nghệ đã đủ sức cạnh tranh với xe nhập cùng phân khúc ở mức giá thấp hơn đáng kể.",
    "verdict_en": "The VF8 2026 is a convincing redemption arc for VinFast, with interior quality and technology now genuinely competitive against imported rivals at a significantly lower price.",
    "review_badge": "detailed_review",
    "reading_time_minutes": 6,
  },

  # ─── BÀI 10 ──────────────────────────────────────────────────────
  {
    "title_vi": "Đánh giá Volvo S90 2026: Sedan Bắc Âu sang trọng nhất, 462 mã lực — giá giữ nguyên",
    "title_en": "Review Volvo S90 2026: Most Luxurious Nordic Sedan, 462hp — Price Unchanged",
    "slug_vi": "danh-gia-volvo-s90-2026-plug-in-hybrid-462-ma-luc",
    "slug_en": "review-volvo-s90-2026-plug-in-hybrid-462hp",
    "excerpt_vi": "Volvo S90 2026 PHEV Ultra vừa ra mắt chính thức tại Việt Nam với hàng loạt nâng cấp đáng kể: đèn Thor Hammer kéo dài, màn hình 11,2 inch, hệ thống hybrid 462 mã lực và tầm hoạt động điện 100km — tất cả ở mức giá 2,75 tỷ được giữ nguyên.",
    "excerpt_en": "The Volvo S90 2026 PHEV Ultra launches in Vietnam with extended Thor Hammer lights, 11.2-inch screen, a 462hp hybrid system, and 100km EV range — all at the same 2.75 billion VND price.",
    "content_vi": """<p>Trong phân khúc sedan hạng sang cỡ lớn tại Việt Nam, Volvo S90 luôn là lựa chọn của những người không muốn đi theo đám đông Mercedes/BMW. Phiên bản 2026 là bản nâng cấp giữa vòng đời quan trọng nhất trong lịch sử S90 — và Volvo đã làm đúng điều người dùng mong đợi: nâng cấp đáng kể mà không tăng giá.</p>

<h2>Thiết kế: Đèn Búa Thor "mạnh hơn" bao giờ hết</h2>

<p>Đặc trưng nhận diện lớn nhất của S90 — cụm đèn chiếu sáng hình "Búa Thor" (Thor's Hammer) — được kéo dài hơn, ăn sâu vào lưới tản nhiệt. Đây là chi tiết tinh tế nhưng làm cho toàn bộ mặt trước trở nên hoàn thiện và đồng nhất hơn.</p>

<p>Ngoài ra, lưới tản nhiệt mới có kết cấu được gia công tinh xảo hơn, và vành xe 21 inch có thiết kế mới hơn. Tổng thể, S90 2026 trông <em>tinh tế hơn</em> thay vì mạnh mẽ hơn — đúng triết lý thiết kế Scandinavian truyền thống.</p>

<h2>Khoang nội thất: Đỉnh cao yên bình Bắc Âu</h2>

<p>Bước vào S90 2026 là bước vào một không gian khác biệt hoàn toàn so với xe Đức cùng phân khúc. Volvo không cạnh tranh bằng số lượng tính năng mà bằng chất lượng cảm nhận:</p>

<ul>
<li><strong>Da Nappa</strong> cao cấp, mềm mịn — xử lý thủ công theo tiêu chuẩn Bắc Âu</li>
<li>Ốp gỗ hoặc kim loại phay tinh xảo theo từng phiên bản</li>
<li><strong>Màn hình giải trí 11,2 inch</strong> (lớn hơn, đặt lồi về phía lái xe) — tích hợp Google Maps, Google Assistant và Google Play Store</li>
<li>Hệ thống âm thanh Bowers &amp; Wilkins 1.400W, 19 loa — một trong những hệ thống âm thanh xe hơi xuất sắc nhất thế giới</li>
<li>Cửa sổ trời toàn cảnh panorama mở ra tầm nhìn rộng lớn</li>
</ul>

<h2>Hệ thống hybrid: 462 mã lực, 0–100 trong 4,8 giây</h2>

<p>S90 2026 sử dụng hệ truyền động Plug-in Hybrid thế hệ mới, kết hợp động cơ xăng 2.0L tăng áp với motor điện công suất lớn:</p>

<ul>
<li>Tổng công suất hệ thống: <strong>462 mã lực</strong></li>
<li>Mô-men xoắn tổng: <strong>705 Nm</strong></li>
<li>Tăng tốc 0–100 km/h: <strong>4,8 giây</strong></li>
<li>Tầm hoạt động hoàn toàn bằng điện: <strong>100 km (WLTP)</strong></li>
<li>Kích thước: 5.090 × 1.903 × 1.450 mm, CSC 3.061 mm</li>
</ul>

<p>100 km chạy điện thuần đủ để người dùng tại Hà Nội hoặc TP.HCM đi làm cả tuần mà không cần đổ xăng — đồng thời có hàng trăm km dự phòng từ động cơ xăng khi cần đi xa.</p>

<h2>An toàn: Tiêu chuẩn Volvo — vốn là thương hiệu an toàn nhất thế giới</h2>

<p>Volvo duy trì cam kết không ai tử vong trong xe Volvo mới sau năm 2020. S90 2026 có:</p>

<ul>
<li>City Safety với nhận diện người đi bộ, xe đạp và động vật lớn</li>
<li>Pilot Assist (hỗ trợ lái bán tự động trên đường cao tốc)</li>
<li>Run-off Road Mitigation — hỗ trợ khi xe lao ra khỏi mặt đường</li>
<li>Hệ thống cảnh báo buồn ngủ và mất tập trung</li>
</ul>

<h2>Mức giá 2,75 tỷ: Đáng hay chưa?</h2>

<p>Ở Việt Nam, 2,75 tỷ là vùng giá của Mercedes E300 AMG và BMW 530i. S90 2026 cung cấp: tầm hoạt động điện 100km (hai đối thủ kia không có), công nghệ Google tích hợp, âm thanh Bowers &amp; Wilkins và thiết kế không bị trộn lẫn với bất kỳ xe nào khác trên đường phố Việt Nam. Với người coi xe là phản ánh cá tính — không phải địa vị — S90 là câu trả lời đúng.</p>""",
    "content_en": "<p>The Volvo S90 2026 PHEV Ultra offers 462hp, 100km of EV range, extended Thor's Hammer lighting, and an upgraded 11.2-inch Google infotainment system at the same 2.75 billion VND price — making it a compelling alternative to German rivals.</p>",
    "category": "review",
    "tags": ["Volvo", "S90", "sedan hạng sang", "hybrid", "PHEV", "đánh giá"],
    "is_featured": False,
    "score": 9,
    "score_design": 9,
    "score_performance": 9,
    "score_comfort": 10,
    "score_tech": 9,
    "score_value": 8,
    "pros": ["Tầm điện 100km thực dụng cho xe sang", "Âm thanh Bowers & Wilkins không có đối thủ", "Thiết kế sang trọng không bị lẫn", "Giá giữ nguyên dù nâng cấp nhiều"],
    "cons": ["Giá 2,75 tỷ vẫn là rào cản lớn", "Kích thước dài khó đỗ ở đô thị"],
    "verdict_vi": "S90 2026 là sedan hạng sang hay nhất đang bán tại Việt Nam nếu bạn coi chất lượng cảm nhận và sự yên bình là ưu tiên số một — không phải sự phô trương.",
    "verdict_en": "The S90 2026 is the finest luxury sedan currently sold in Vietnam if you prioritize perceived quality and serenity over ostentation.",
    "review_badge": "first_drive",
    "reading_time_minutes": 6,
  },

  # ─── BÀI 11 ──────────────────────────────────────────────────────
  {
    "title_vi": "Đánh giá Toyota Camry 2026: Sedan hạng D bền bỉ nhất — vẫn còn là \"vua\"?",
    "title_en": "Review Toyota Camry 2026: Most Reliable D-Segment Sedan — Still King?",
    "slug_vi": "danh-gia-toyota-camry-2026-sedan-hang-d",
    "slug_en": "review-toyota-camry-2026-d-segment-sedan",
    "excerpt_vi": "Toyota Camry 2026 thế hệ thứ 9 đến Việt Nam với 3 phiên bản, trong đó hai bản hybrid (HEV) tiết kiệm nhiên liệu vượt trội. Giá từ 1,22 tỷ đến 1,542 tỷ — chúng tôi đánh giá xe nào đáng mua nhất.",
    "excerpt_en": "The 9th-gen Camry arrives in Vietnam with two hybrid variants and Toyota Safety Sense 3.0. We evaluate all three trims to find the best value.",
    "content_vi": """<p>Toyota Camry là một trong những mẫu xe ít biến động nhất trong lịch sử ô tô Việt Nam. Dù thị trường thay đổi, Camry vẫn luôn là lựa chọn mặc định của doanh nhân, người mua xe lần đầu muốn "chắc ăn" và người cần xe giữ giá tốt. Phiên bản thế hệ thứ 9 được nhập khẩu từ Thái Lan vừa chính thức lên kệ.</p>

<h2>Ba phiên bản, giá từ 1,22 đến 1,542 tỷ</h2>

<ul>
<li><strong>Camry 2.0Q (xăng):</strong> 1.220.000.000 đồng — phiên bản tiêu chuẩn cho người ưu tiên ngân sách</li>
<li><strong>Camry HEV Mid (hybrid):</strong> 1.460.000.000 đồng — điểm ngọt ngào nhất về tỷ lệ trang bị/giá</li>
<li><strong>Camry HEV Top (hybrid cao cấp):</strong> 1.542.000.000 đồng — đầy đủ tính năng nhất</li>
</ul>

<h2>Động cơ: Xăng tốt, Hybrid xuất sắc</h2>

<p><strong>Phiên bản 2.0Q:</strong></p>
<ul>
<li>Động cơ 2.0L, 170 mã lực, 206 Nm, hộp số CVT</li>
<li>Tiêu thụ nhiên liệu: ~7,5L/100km</li>
</ul>

<p><strong>Phiên bản HEV:</strong></p>
<ul>
<li>Động cơ 2.5L + 2 motor điện, tổng <strong>231 mã lực</strong></li>
<li>Tiêu thụ nhiên liệu: <strong>~4,8L/100km</strong> — tiết kiệm đáng kể trong đô thị</li>
<li>Dẫn động cầu trước (FWD) trên HEV Mid; dẫn động 4 bánh (E-Four AWD) trên HEV Top</li>
</ul>

<h2>Kích thước và không gian</h2>

<p>Camry thế hệ 9 lớn hơn người tiền nhiệm:</p>
<ul>
<li>Dài × Rộng × Cao: <strong>4.915 × 1.840 × 1.445 mm</strong></li>
<li>Chiều dài cơ sở: <strong>2.825 mm</strong> — không gian hàng ghế sau rộng rãi bậc nhất phân khúc</li>
<li>Khoang hành lý: 493 lít</li>
</ul>

<h2>Toyota Safety Sense 3.0: Đáng tiền nhất phân khúc</h2>

<p>Đây là điểm mạnh tuyệt đối của Camry 2026. Gói TSS 3.0 bao gồm:</p>
<ul>
<li>Phanh khẩn cấp tự động với nhận diện người đi bộ, xe đạp và ngã tư</li>
<li>Đèn pha tự động điều chỉnh (Auto High Beam)</li>
<li>Kiểm soát hành trình thích ứng với phát hiện biển báo tốc độ</li>
<li>Hỗ trợ giữ làn chủ động (LTA)</li>
<li>Cảnh báo buồn ngủ (Driver Monitoring)</li>
</ul>

<h2>Vẫn là "vua" — nhưng với điều kiện</h2>

<p>Camry HEV Mid ở mức 1,46 tỷ vẫn là lựa chọn hợp lý nhất nếu bạn đề cao: độ bền, giữ giá, hệ thống đại lý/dịch vụ phủ rộng nhất cả nước và chi phí bảo dưỡng rõ ràng. Tuy nhiên, nếu bạn muốn cảm giác lái thú vị hơn hoặc thiết kế ấn tượng hơn ở tầm giá này, đối thủ như Mazda 6 hay Hyundai Sonata có thể phù hợp hơn. Camry là chiếc xe mua bằng lý trí — và ít khi khiến bạn thất vọng.</p>""",
    "content_en": "<p>The 9th-generation Toyota Camry arrives with two hybrid variants, Toyota Safety Sense 3.0, and a longer wheelbase. The HEV Mid at 1.46 billion remains the most rational choice in Vietnam's D-segment sedan market.</p>",
    "category": "review",
    "tags": ["Toyota", "Camry", "sedan", "hybrid", "đánh giá"],
    "is_featured": False,
    "score": 8,
    "score_design": 8,
    "score_performance": 8,
    "score_comfort": 9,
    "score_tech": 8,
    "score_value": 8,
    "pros": ["Hybrid 4.8L/100km tiết kiệm vượt trội", "Hệ thống đại lý phủ toàn quốc", "Giữ giá tốt nhất phân khúc", "Toyota Safety Sense 3.0 đầy đủ"],
    "cons": ["Thiết kế chưa táo bạo", "Cảm giác lái chưa thú vị bằng đối thủ Hàn", "Bản xăng 2.0Q thiếu cạnh tranh với giá 1,22 tỷ"],
    "verdict_vi": "Camry HEV Mid là lý do chính để mua Camry 2026 — tiết kiệm xăng vượt trội, độ bền Toyota, mạng đại lý phủ khắp. Mua bằng lý trí, không bao giờ hối hận.",
    "verdict_en": "The Camry HEV Mid is the reason to buy the 2026 Camry — outstanding fuel economy, Toyota reliability, and the widest service network in Vietnam.",
    "review_badge": "detailed_review",
    "reading_time_minutes": 5,
  },

  # ─── BÀI 12 ──────────────────────────────────────────────────────
  {
    "title_vi": "Đánh giá Hyundai Tucson 2026: SUV C-segment cá tính nhất — đủ sức đấu CR-V không?",
    "title_en": "Review Hyundai Tucson 2026: Most Distinctive C-SUV — Can It Beat the CR-V?",
    "slug_vi": "danh-gia-hyundai-tucson-2026-so-sanh-honda-crv",
    "slug_en": "review-hyundai-tucson-2026-vs-honda-crv",
    "excerpt_vi": "Hyundai Tucson 2026 giá từ 769 triệu đối mặt với Honda CR-V từ 1,029 tỷ. Thiết kế táo bạo hơn, nội thất màn hình kép, nhưng động cơ yếu hơn và giá bản hybrid chưa ngã ngũ. Chúng tôi so sánh chi tiết.",
    "excerpt_en": "The Tucson 2026 starting at 769M faces the CR-V from 1.029 billion. Bolder design, dual-screen cabin — but a weaker engine and unannounced hybrid pricing. We compare in detail.",
    "content_vi": """<p>Phân khúc C-SUV (SUV cỡ nhỏ 5 chỗ) là chiến trường nóng bỏng nhất tại thị trường ô tô Việt Nam. Hyundai Tucson và Honda CR-V là hai ứng cử viên hàng đầu — nhưng họ phục vụ hai nhóm người dùng hoàn toàn khác nhau. Chúng tôi đặt hai xe cạnh nhau để tìm ra cái nào phù hợp với bạn hơn.</p>

<h2>Thiết kế: Tucson thắng tuyệt đối về sự táo bạo</h2>

<p>Tucson 2026 mang ngôn ngữ thiết kế "Parametric Dynamics" của Hyundai với:</p>
<ul>
<li>Cụm đèn pha hình parabol sắc cạnh kéo dài sang cả lưới tản nhiệt</li>
<li>Bề mặt thân xe có nhiều đường nét hình học gợi cảm giác chuyển động ngay khi đứng yên</li>
<li>Đèn hậu LED full-width tạo nhận diện đêm cực kỳ mạnh</li>
</ul>

<p>CR-V 2026 ngược lại chọn phong cách trưởng thành, nhẹ nhàng hơn. Nếu bạn là người dưới 40 tuổi muốn xe có cá tính — Tucson gần như thắng ngay từ vòng thiết kế.</p>

<h2>Động cơ: CR-V vượt trội rõ rệt</h2>

<p><strong>Hyundai Tucson 2026:</strong></p>
<ul>
<li>2.0L SmarStream MPI, <strong>156 mã lực</strong>, 192 Nm, AT6 cầu trước</li>
<li>Tiêu thụ nhiên liệu: ~9L/100km</li>
</ul>

<p><strong>Honda CR-V e:HEV (bản hybrid phổ biến nhất):</strong></p>
<ul>
<li>1.5L Turbo + motor điện, <strong>188 mã lực</strong>, 243 Nm</li>
<li>Tiêu thụ nhiên liệu: ~6,0L/100km (hybrid)</li>
</ul>

<p>Chênh lệch 32 mã lực và mức tiêu thụ thấp hơn gần 50% là khoảng cách rất lớn — đặc biệt khi giá CR-V chỉ cao hơn khoảng 260–290 triệu.</p>

<h2>Nội thất: Tucson ấn tượng hơn, CR-V thực dụng hơn</h2>

<p>Tucson 2026 gây ấn tượng với cụm màn hình kép 12,3 inch (đồng hồ lái + giải trí), bàn phím điều khiển điện tử không nút bấm vật lý, vô lăng bọc da thể thao. CR-V có không gian hàng ghế sau rộng hơn đáng kể nhờ chiều dài cơ sở 2.700 mm (Tucson: 2.680 mm) và khoang hành lý lớn hơn.</p>

<h2>Tucson Hybrid 2026: "Bài tủ" chưa được đánh</h2>

<p>Tin quan trọng: Tucson Hybrid 2026 đang được Hyundai Thành Công chuẩn bị đưa về Việt Nam trong thời gian tới. Với hệ thống hybrid mới (tiêu thụ ~5,5L/100km) và ưu đãi thuế TTĐB 30% từ 1/1/2026, Tucson Hybrid có thể thay đổi hoàn toàn cuộc chơi trong phân khúc này.</p>

<h2>Vậy nên mua cái nào?</h2>

<ul>
<li><strong>Chọn Tucson</strong> nếu: ngân sách 769–989 triệu, muốn thiết kế ấn tượng, thường xuyên chở nhiều người ít hành lý</li>
<li><strong>Chọn CR-V</strong> nếu: sẵn sàng chi thêm 200–300 triệu, cần động cơ mạnh hơn, tiết kiệm xăng và ưu tiên tính thực dụng dài hạn</li>
<li><strong>Chờ Tucson Hybrid</strong> nếu: bạn muốn thiết kế Hyundai nhưng không chấp nhận được mức tiêu thụ 9L/100km của bản xăng</li>
</ul>""",
    "content_en": "<p>The Tucson 2026 wins on styling and value at 769-989M VND, while the CR-V counters with a more powerful engine and better fuel economy. An incoming Tucson Hybrid could reshape this segment entirely.</p>",
    "category": "review",
    "tags": ["Hyundai", "Tucson", "Honda", "CR-V", "SUV", "so sánh"],
    "is_featured": False,
    "score": 8,
    "score_design": 9,
    "score_performance": 7,
    "score_comfort": 8,
    "score_tech": 8,
    "score_value": 8,
    "pros": ["Thiết kế táo bạo, cá tính nhất phân khúc", "Giá cạnh tranh từ 769 triệu", "Màn hình kép 12.3 inch ấn tượng"],
    "cons": ["Động cơ 2.0L yếu hơn CR-V rõ rệt", "Tiêu thụ xăng cao hơn 9L/100km", "Chưa có bản Hybrid chính thức tại VN"],
    "verdict_vi": "Tucson 2026 là SUV C-segment có thiết kế đẹp nhất phân khúc — nhưng cần chờ phiên bản Hybrid mới đến để thực sự trở thành lựa chọn toàn diện.",
    "verdict_en": "The Tucson 2026 is the best-looking C-SUV in the segment — but the upcoming Hybrid variant is what could make it a truly complete package.",
    "review_badge": "comparison",
    "reading_time_minutes": 5,
  },

  # ─── BÀI 13 ──────────────────────────────────────────────────────
  {
    "title_vi": "Nên mua xe hybrid hay xe xăng năm 2026? Phân tích chi phí thực tế sau 5 năm",
    "title_en": "Hybrid or Petrol in 2026? Real 5-Year Cost Analysis for Vietnam",
    "slug_vi": "nen-mua-xe-hybrid-hay-xe-xang-2026-phan-tich-chi-phi",
    "slug_en": "hybrid-vs-petrol-2026-5-year-cost-analysis-vietnam",
    "excerpt_vi": "Xe hybrid hiện đang được giảm 30% thuế tiêu thụ đặc biệt tại Việt Nam. Chúng tôi làm phép tính chi tiết: sau 5 năm và 75.000 km, hybrid hay xe xăng mang lại lợi ích kinh tế tốt hơn?",
    "excerpt_en": "With Vietnam's new 30% excise tax break for HEVs, we run a detailed 5-year, 75,000km cost comparison between hybrid and equivalent petrol models.",
    "content_vi": """<p>Năm 2026 là thời điểm lý tưởng để đặt câu hỏi này: với ưu đãi thuế tiêu thụ đặc biệt mới cho xe hybrid (HEV), bài toán kinh tế đã thay đổi đáng kể so với chỉ một năm trước. Chúng tôi thực hiện phân tích chi phí sở hữu toàn diện (TCO - Total Cost of Ownership) dựa trên điều kiện thực tế tại Việt Nam.</p>

<h2>Điều kiện tính toán</h2>

<ul>
<li>Quãng đường hàng năm: 15.000 km (mức trung bình người đi làm tại đô thị)</li>
<li>Thời gian sở hữu: 5 năm (tổng 75.000 km)</li>
<li>Giá xăng tham chiếu: 23.000 đồng/lít (RON 95)</li>
<li>Mẫu so sánh: Toyota Corolla Cross bản xăng vs. Corolla Cross Hybrid</li>
</ul>

<h2>Chi phí mua ban đầu (sau ưu đãi thuế 2026)</h2>

<ul>
<li><strong>Corolla Cross 1.8V (xăng):</strong> ~870 triệu đồng</li>
<li><strong>Corolla Cross Hybrid:</strong> ~920 triệu đồng (sau khi áp ưu đãi HEV mới)</li>
<li>Chênh lệch ban đầu: <strong>~50 triệu đồng</strong> (giảm từ ~93 triệu trước đây)</li>
</ul>

<h2>Chi phí vận hành: Xăng 5 năm</h2>

<p><strong>Bản xăng 1.8V:</strong></p>
<ul>
<li>Tiêu thụ: ~8L/100km trong thực tế đô thị</li>
<li>Chi phí xăng/năm: 75.000 km/5 × 8L × 23.000đ = <strong>27,6 triệu/năm</strong></li>
<li>Tổng 5 năm: <strong>138 triệu đồng</strong></li>
</ul>

<p><strong>Bản Hybrid:</strong></p>
<ul>
<li>Tiêu thụ: ~5L/100km trong đô thị (hybrid nổi bật khi tắc đường)</li>
<li>Chi phí xăng/năm: 75.000 km/5 × 5L × 23.000đ = <strong>17,25 triệu/năm</strong></li>
<li>Tổng 5 năm: <strong>86,25 triệu đồng</strong></li>
</ul>

<p>→ <strong>Tiết kiệm xăng 5 năm: 51,75 triệu đồng</strong></p>

<h2>Chi phí bảo dưỡng</h2>

<p>Xe hybrid hiện đại không cần bảo dưỡng pin riêng — pin được đảm bảo bởi nhà sản xuất. Chi phí bảo dưỡng định kỳ xấp xỉ xe xăng, dao động 3–5,6 triệu/lần. Sự khác biệt về chi phí bảo dưỡng giữa hai phiên bản là <strong>không đáng kể</strong>.</p>

<h2>Kết quả tổng hợp sau 5 năm</h2>

<ul>
<li>Chênh lệch giá mua: hybrid cao hơn <strong>50 triệu</strong></li>
<li>Tiết kiệm xăng 5 năm: hybrid tiết kiệm được <strong>51,75 triệu</strong></li>
<li><strong>Kết luận: Sau 5 năm, xe hybrid lợi hơn ~1,75 triệu đồng</strong></li>
</ul>

<p>Điểm hòa vốn (break-even) thực tế là khoảng <strong>4,8 năm</strong> với quãng đường 15.000 km/năm. Nếu bạn đi nhiều hơn (20.000 km/năm), break-even rút xuống còn ~3,5 năm.</p>

<h2>Yếu tố không tính được bằng tiền</h2>

<ul>
<li><strong>Giá bán lại:</strong> Xe hybrid giữ giá tốt hơn trên thị trường xe cũ (~10–15% cao hơn bản xăng cùng đời)</li>
<li><strong>Trải nghiệm lái:</strong> Hybrid êm hơn, phản hồi mượt mà hơn trong đô thị — đặc biệt khi tắc đường</li>
<li><strong>Môi trường:</strong> Giảm ~35–40% lượng CO₂ so với xe xăng thuần</li>
</ul>

<h2>Khuyến nghị cuối cùng</h2>

<p>Nếu bạn đi <strong>trên 12.000 km/năm</strong> tại đô thị: <strong>mua hybrid</strong> — không cần suy nghĩ thêm. Nếu bạn đi dưới 10.000 km/năm hoặc chủ yếu đi cao tốc (nơi lợi thế hybrid giảm mạnh): xe xăng có thể hợp lý hơn về mặt thuần kinh tế. Tuy nhiên, với chính sách thuế 2026 và xu hướng thị trường, xe hybrid đang rõ ràng là hướng đi thông minh hơn.</p>""",
    "content_en": "<p>With Vietnam's 2026 HEV tax break reducing the initial price gap, a hybrid pays for itself in about 4.8 years of typical 15,000km/year urban driving — while also offering better resale value and a smoother urban experience.</p>",
    "category": "advice",
    "tags": ["xe hybrid", "tư vấn mua xe", "chi phí sở hữu", "so sánh", "Toyota"],
    "is_featured": False,
    "reading_time_minutes": 5,
  },

  # ─── BÀI 14 ──────────────────────────────────────────────────────
  {
    "title_vi": "Mua xe ô tô năm 2026: 5 chính sách giúp tiết kiệm đến 200 triệu so với 2025",
    "title_en": "Buying a Car in 2026: 5 Policies That Can Save You Up to 200M vs 2025",
    "slug_vi": "mua-xe-o-to-2026-chinh-sach-tiet-kiem-200-trieu",
    "slug_en": "buying-car-2026-5-policies-save-200-million",
    "excerpt_vi": "Năm 2026, người mua xe ô tô tại Việt Nam có thể tiết kiệm từ vài chục đến gần 200 triệu đồng nhờ 5 chính sách mới đồng loạt có hiệu lực. Chúng tôi tổng hợp đầy đủ để bạn không bỏ lỡ bất kỳ ưu đãi nào.",
    "excerpt_en": "Five overlapping policies in 2026 can save Vietnamese car buyers between tens and nearly 200 million VND. We compile the complete guide so you miss nothing.",
    "content_vi": """<p>Năm 2026 là năm có nhiều chính sách thuế và phí liên quan đến ô tô thay đổi nhất trong một thập kỷ qua tại Việt Nam. Điều đáng mừng: tất cả đều đi theo hướng có lợi cho người mua. Đây là hướng dẫn đầy đủ giúp bạn tận dụng tối đa.</p>

<h2>Chính sách 1: Giảm thuế nhập khẩu xe từ EU (EVFTA)</h2>

<p><strong>Áp dụng cho:</strong> BMW, Mercedes, Audi, Volkswagen, Volvo, Peugeot, Renault, Skoda...</p>

<p>Theo lộ trình EVFTA, từ 1/1/2026 thuế nhập khẩu xe nguyên chiếc (CBU) từ EU giảm xuống còn <strong>24–29%</strong> tùy chủng loại. Lộ trình tiếp tục giảm đến 0% vào 2030.</p>

<p><strong>Tiết kiệm ước tính:</strong></p>
<ul>
<li>Xe phổ thông (Volkswagen Golf, Peugeot 308): 50–80 triệu đồng</li>
<li>Xe hạng sang (Mercedes E-Class, BMW 5-Series): 150–250 triệu đồng</li>
<li>Volvo XC60/S90: 100–180 triệu đồng</li>
</ul>

<h2>Chính sách 2: Xe hybrid (HEV) giảm 30% thuế TTĐB</h2>

<p><strong>Áp dụng cho:</strong> Tất cả xe HEV tự sạc đạt điều kiện (tỷ trọng dùng xăng ≤ 70%)</p>

<p>Từ 1/1/2026, Luật Thuế TTĐB sửa đổi chính thức có hiệu lực. Xe HEV chịu thuế TTĐB bằng 70% xe xăng thuần cùng dung tích — đây là mức ưu đãi lớn nhất từ trước đến nay cho dòng xe này.</p>

<p><strong>Tiết kiệm ước tính:</strong></p>
<ul>
<li>Toyota Corolla Cross Hybrid: 70–90 triệu đồng</li>
<li>Toyota Camry HEV: 100–130 triệu đồng</li>
<li>Honda CR-V e:HEV: 80–110 triệu đồng</li>
<li>Lexus RX 350h: 180–220 triệu đồng</li>
</ul>

<h2>Chính sách 3: Giảm VAT từ 10% xuống 8%</h2>

<p><strong>Áp dụng cho:</strong> Tất cả xe ô tô (kéo dài đến hết 2026)</p>

<p>Chính sách giảm 2% VAT tiếp tục kéo dài — áp dụng trực tiếp lên giá bán lẻ:</p>
<ul>
<li>Xe 600 triệu: tiết kiệm ~12 triệu</li>
<li>Xe 1 tỷ: tiết kiệm ~18–20 triệu</li>
<li>Xe 2 tỷ: tiết kiệm ~36–38 triệu</li>
</ul>

<h2>Chính sách 4: Giảm lệ phí đăng ký biển số 30%</h2>

<p><strong>Áp dụng cho:</strong> Tất cả phương tiện đăng ký mới</p>

<p>Bộ Tài chính đề xuất giảm 30% lệ phí đăng ký cấp biển số. Tại Hà Nội và TP.HCM (mức cao nhất):</p>
<ul>
<li>Xe dưới 9 chỗ: từ 20 triệu → còn <strong>14 triệu</strong> (tiết kiệm 6 triệu)</li>
</ul>

<p>Tại các tỉnh khác mức giảm tương ứng nhưng số tuyệt đối thấp hơn.</p>

<h2>Chính sách 5: Xe điện miễn 100% lệ phí trước bạ</h2>

<p><strong>Áp dụng cho:</strong> Xe điện thuần (BEV) — đến 28/2/2027</p>

<p>Chủ xe điện tiếp tục được miễn hoàn toàn lệ phí trước bạ — khoản phí thông thường bằng 10–12% giá trị xe tại Hà Nội và TP.HCM:</p>
<ul>
<li>VinFast VF8 (1,057 tỷ): miễn ~105 triệu tiền trước bạ</li>
<li>VinFast VF9 (1,659 tỷ): miễn ~165 triệu tiền trước bạ</li>
</ul>

<h2>Tổng hợp: Ai được lợi nhiều nhất?</h2>

<ul>
<li>🏆 <strong>Người mua xe điện BEV:</strong> Miễn trước bạ + VAT thấp = tiết kiệm 120–200 triệu</li>
<li>🥈 <strong>Người mua xe hybrid HEV từ EU:</strong> Hưởng cả ưu đãi EVFTA + HEV = tiết kiệm 100–200 triệu</li>
<li>🥉 <strong>Người mua xe hybrid HEV sản xuất ASEAN:</strong> Ưu đãi HEV + VAT = tiết kiệm 80–130 triệu</li>
<li>💰 <strong>Người mua xe xăng ASEAN thông thường:</strong> Chỉ hưởng VAT giảm + biển số = tiết kiệm 20–40 triệu</li>
</ul>

<p>Lời khuyên thực tế: Nếu bạn đang phân vân giữa bản xăng và bản hybrid của cùng một dòng xe, năm 2026 là thời điểm nghiêng về <strong>hybrid</strong> một cách rõ ràng hơn bao giờ hết.</p>""",
    "content_en": "<p>Five overlapping tax and fee policies in 2026 create savings of 20–200 million VND depending on vehicle type. EV and hybrid buyers benefit most; here's a complete guide to maximizing every available incentive.</p>",
    "category": "advice",
    "tags": ["tư vấn mua xe", "chính sách thuế", "tiết kiệm", "2026", "EVFTA"],
    "is_featured": False,
    "reading_time_minutes": 5,
  },
]


def push_article(art):
    data = {
        "data": {
            "title_vi":  art["title_vi"],
            "title_en":  art["title_en"],
            "slug_vi":   art["slug_vi"],
            "slug_en":   art["slug_en"],
            "excerpt_vi": art["excerpt_vi"],
            "excerpt_en": art["excerpt_en"],
            "content_vi": art["content_vi"],
            "content_en": art["content_en"],
            "category":  art["category"],
            "tags":      art["tags"],
            "is_featured": art.get("is_featured", False),
            "reading_time_minutes": art.get("reading_time_minutes", 4),
            "author": {"connect": [AUTHOR_DOC_ID]},
        }
    }
    # Review-specific fields
    for field in ["score","score_design","score_performance","score_comfort","score_tech","score_value","pros","cons","verdict_vi","verdict_en","review_badge"]:
        if field in art:
            data["data"][field] = art[field]

    payload = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE}/api/articles",
        data=payload,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            doc_id = result["data"]["documentId"]
            # Publish
            pub_req = urllib.request.Request(
                f"{BASE}/api/articles/{doc_id}/actions/publish",
                data=b"{}",
                headers={
                    "Authorization": f"Bearer {TOKEN}",
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            try:
                urllib.request.urlopen(pub_req)
            except Exception:
                pass  # publish may return 200 without body
            print(f"  OK [{art['category'].upper()}] {art['slug_vi']}")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors='replace')
        print(f"  FAILED {art['slug_vi']}: {e.code} -- {body[:150]}")
        return False


if __name__ == "__main__":
    print(f"Pushing {len(ARTICLES)} articles to Strapi...")
    ok = sum(push_article(a) for a in ARTICLES)
    print(f"\nDone: {ok}/{len(ARTICLES)} articles published.")
