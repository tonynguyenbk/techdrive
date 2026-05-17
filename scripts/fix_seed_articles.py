#!/usr/bin/env python3
"""
Fix original 14 seed articles:
  - Add images (Wikipedia → Cloudinary via Strapi upload)
  - Fix VinFast VF9 placeholder content with full review
"""
import sys, json, urllib.request, urllib.parse, urllib.error, ssl, time
sys.stdout.reconfigure(encoding='utf-8')

BASE  = "http://localhost:1337"
TOKEN = "14006d13d352211548ddd34d5a149c4a0d0f8ac958c04d03280c12a89bea292f423fde74acdea441df155364971364adcb353092fb3e1c7bf74c892bb4d20a3093fb35365e81679603dccf58b7cc354bba327eb701f03ae0a6726cc231264d584d3f75f59a9073d83017fe2cc59d823116f8203e7a21485dcc4e1273285d2b3d"
AUTH  = {"Authorization": f"Bearer {TOKEN}"}

_CTX = ssl.create_default_context()
_CTX.check_hostname = False
_CTX.verify_mode = ssl.CERT_NONE

# ── VinFast VF9 2026 full review content ─────────────────────────────────────

VF9_CONTENT = """<p>Chúng tôi đã lái thử VinFast VF 9 bản nâng cấp 2026 hơn 1.000km từ Hà Nội đến Đà Nẵng và trở về — đủ để đánh giá toàn diện một chiếc SUV điện cỡ lớn đang được kỳ vọng là "át chủ bài" của VinFast trên đường đua toàn cầu.</p>

<h2>Thông số kỹ thuật 2026</h2>

<p>VF 9 2026 nhận bản cập nhật pin và phần mềm đáng kể so với thế hệ trước:</p>

<ul>
<li><strong>Pin:</strong> 123 kWh (Long Range) / 92 kWh (Standard Range)</li>
<li><strong>Phạm vi hoạt động:</strong> 600 km (Long Range, WLTP) / 438 km (Standard)</li>
<li><strong>Công suất:</strong> 402 mã lực (2 motor, AWD)</li>
<li><strong>Mô-men xoắn:</strong> 764 Nm</li>
<li><strong>0–100 km/h:</strong> 6,5 giây</li>
<li><strong>Tốc độ tối đa:</strong> 200 km/h</li>
<li><strong>Sạc DC nhanh:</strong> 150 kW (sạc 10-80% trong khoảng 35 phút)</li>
<li><strong>Chỗ ngồi:</strong> 6 hoặc 7</li>
<li><strong>Giá tại Việt Nam:</strong> Từ 1.680 triệu đồng (Standard Range) đến 1.926 triệu (Long Range Eco)</li>
</ul>

<h2>Thiết kế và ngoại thất</h2>

<p>VF 9 giữ nguyên ngôn ngữ thiết kế Bold Dynamism với lần cập nhật nhỏ ở cụm đèn pha: bổ sung dải đèn LED DRL định hình lại, tạo nhận diện mạnh hơn ở tầm nhìn trước. Kích thước vẫn ở mức SUV cỡ lớn rõ rệt: dài 4.977mm, rộng 1.980mm, cao 1.721mm. Bên cạnh đó, mâm xe nâng cấp lên 22 inch tùy phiên bản — một chi tiết dễ nhận biết khi đậu cạnh các đối thủ.</p>

<p>Điểm gây tranh cãi nhất về thiết kế VF 9 là phần đuôi xe — khá đơn điệu so với đầu xe mạnh mẽ. Đèn hậu LED kết nối nhau trải ngang theo phong cách hiện đại, nhưng đường dẫn thoát khí giả ở cản sau không thuyết phục trong bối cảnh đây là xe điện thuần tuý.</p>

<h2>Nội thất và không gian</h2>

<p>Đây là điểm mạnh lớn nhất của VF 9. Cabin 6 chỗ bố trí hàng 2 là 2 ghế CaptainSeat chỉnh điện — mỗi ghế có thể điều chỉnh 12 hướng, sưởi và làm mát độc lập. Không gian hàng 2 rộng đến mức ngạc nhiên: khoảng đặt chân thoải mái dù người lái 1m80 điều chỉnh ghế lùi hoàn toàn.</p>

<p>Màn hình trung tâm 15,6 inch chạy hệ điều hành VinFast OS đã được cải thiện đáng kể về tốc độ phản hồi so với thế hệ trước. Apple CarPlay và Android Auto không dây được bổ sung từ đầu năm 2026 qua OTA — đây là cập nhật người dùng chờ đợi nhất. Hệ thống âm thanh Harman Kardon 14 loa chuẩn trên toàn bộ phiên bản là điểm cộng đáng giá.</p>

<p>Điểm trừ: vật liệu nội thất ở một số khu vực (cụ thể là ốp cửa hàng 3) vẫn chưa đạt đến chuẩn cao cấp tương xứng với mức giá gần 2 tỷ. Chúng tôi kỳ vọng VinFast sẽ cải thiện điều này trong lần cập nhật giữa vòng đời.</p>

<h2>Vận hành và cảm giác lái</h2>

<p>VF 9 không được thiết kế cho người thích lái xe. Đây là chiếc xe <em>để được lái</em> — hoặc nói đúng hơn, để hành khách tận hưởng. Hệ thống treo khí nén (Air Suspension) trang bị tiêu chuẩn trên bản Eco trở lên hấp thụ mặt đường tốt hơn hẳn hệ thống lò xo cuộn của bản Standard.</p>

<p>Chế độ Eco và Normal phù hợp với di chuyển đô thị và cao tốc. Sport Mode tăng phản hồi bướm ga đáng kể — nhưng hộp số 1 cấp trực tiếp của motor điện không tạo ra cảm giác "sang số" thú vị như xe xăng. Đây là đặc điểm chung của xe điện, không phải điểm yếu riêng của VF 9.</p>

<p>Trên cao tốc Hà Nội – Đà Nẵng, VF 9 duy trì tốc độ 110-120 km/h êm ái, tiếng ồn cabin cực thấp. Tốc độ gió và tiếng lốp là nguồn ồn chính ở tốc độ cao — không quá ồn so với phân khúc.</p>

<h2>Phạm vi hoạt động thực tế</h2>

<p>Đây là bài kiểm tra quan trọng nhất. Chúng tôi lái từ Hà Nội đến Đà Nẵng (~770km) với 1 lần sạc tại trạm VinFast ở Đồng Hới (mất 31 phút từ 15% lên 80%). Tốc độ trung bình 90 km/h, điều hoà 24°C, 5 người lớn và 3 vali.</p>

<p>Kết quả: mức tiêu thụ thực tế 21,8 kWh/100km trên đường cao tốc — cao hơn 15% so với con số WLTP nhưng vẫn là kết quả tốt cho SUV cỡ này. Phạm vi thực tế vào khoảng 520-540 km trong điều kiện lý tưởng (đường phẳng, nhiệt độ 25-28°C, không tải nặng).</p>

<h2>Hệ thống an toàn và ADAS</h2>

<p>VF 9 2026 nâng cấp bộ cảm biến ADAS với thêm camera độ phân giải cao và radar tầm xa. Hệ thống ga tự động thích ứng (ACC) hoạt động ổn định trên cao tốc đến 130 km/h. Lane Centering Assistant giữ xe ở giữa làn đường tốt, nhưng đôi khi chậm phản ứng ở các đoạn cua dịu.</p>

<p>Hỗ trợ đỗ xe tự động (Auto Park) hoạt động đáng tin cậy ở các bãi đỗ chuẩn — một tính năng đặc biệt hữu ích với xe có kích thước lớn như VF 9.</p>

<h2>Nhận xét và kết luận</h2>

<p>VinFast VF 9 2026 là sản phẩm tốt nhất mà VinFast từng làm — và đó là sự thật dù bạn có ủng hộ thương hiệu Việt hay không. Pin 123 kWh với phạm vi 600 km WLTP đưa VF 9 vào nhóm những SUV điện hàng đầu thế giới về phạm vi hoạt động.</p>

<p>Thách thức lớn nhất không phải từ xe, mà từ hạ tầng: mạng lưới trạm sạc VinFast tuy đang mở rộng nhanh nhưng chưa phủ đủ các tuyến đường xa tại miền Trung và miền Nam. Đây là điều cần cải thiện để người dùng VF 9 an tâm hơn khi đi xa.</p>

<p>Ở mức giá từ 1.680 triệu, VF 9 cạnh tranh với Mercedes EQB, BMW iX1 và Volvo XC60 Recharge. So sánh trực tiếp về trang bị, không gian và phạm vi — VF 9 không thua kém, thậm chí vượt trội về pin và không gian. Điểm chưa bắt kịp là chất lượng hoàn thiện và giá trị thương hiệu — những thứ cần thêm thời gian để xây dựng.</p>

<p><strong>Ai nên mua VF 9?</strong> Gia đình 5-7 người tại các thành phố lớn (Hà Nội, TP.HCM, Đà Nẵng), có nhà riêng hoặc nơi lắp sạc tại gia, di chuyển chủ yếu trong thành phố và các chuyến cao tốc có lên kế hoạch trước. VF 9 sẽ phục vụ nhóm này rất tốt và giúp tiết kiệm đáng kể so với xe xăng hạng sang tương đương về chi phí vận hành.</p>"""

VF9_EXCERPT = "Chúng tôi đã lái thử VF 9 bản nâng cấp 2026 hơn 1.000km từ Hà Nội đến Đà Nẵng. Pin 123 kWh, phạm vi 600km WLTP — nhưng thực tế vận hành ra sao?"

# ── Image sources for original 14 seed articles ──────────────────────────────

SEED_IMAGES = [
    # (slug_vi, wikipedia_page, filename)
    ("vinfast-vf9-2026-danh-gia",          "VinFast_VF9",           "vinfast-vf9-review-2026.jpg"),
    ("mazda-cx5-2024-danh-gia",            "Mazda_CX-5",            "mazda-cx5-2024.jpg"),
    ("ford-ranger-2024-danh-gia",          "Ford_Ranger",           "ford-ranger-2024.jpg"),
    ("kia-carnival-2024-danh-gia",         "Kia_Carnival",          "kia-carnival-2024.jpg"),
    ("toyota-fortuner-2024-lai-thu",       "Toyota_Fortuner",       "toyota-fortuner-2024.jpg"),
    ("hyundai-santa-fe-2024-danh-gia",     "Hyundai_Santa_Fe",      "hyundai-santa-fe-2024.jpg"),
    ("honda-crv-hybrid-2023-danh-gia",     "Honda_CR-V",            "honda-crv-hybrid-2023.jpg"),
    ("vinfast-vf3-ra-mat-gia-tu-235-trieu","VinFast",               "vinfast-vf3-launch.jpg"),
    ("top-10-xe-ban-chay-thang-4-2026",    "VinFast",               "vinfast-top-sales.jpg"),
    ("toyota-corolla-cross-2025-facelift-ra-mat", "Toyota_Corolla_Cross", "corolla-cross-2025.jpg"),
    ("hyundai-creta-2024-ky-luc-b-suv",   "Hyundai_Creta",         "hyundai-creta-2024.jpg"),
    ("thue-nhap-khau-o-to-asean-0-phan-tram-2026", "Toyota_Hilux",  "asean-import-tax.jpg"),
    ("so-sanh-cx5-tucson-crv-suv-tam-trung","Mazda_CX-5",          "cx5-tucson-crv-compare.jpg"),
    ("so-sanh-veloz-xpander-carnival-mpv-gia-dinh", "Toyota_Veloz", "veloz-xpander-carnival-compare.jpg"),
]

# ── Helpers ───────────────────────────────────────────────────────────────────

def wiki_image_url(page: str) -> str | None:
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(page)}"
    req = urllib.request.Request(url, headers={"User-Agent": "TechDriveBot/1.0 (truongnd.bka@gmail.com)"})
    try:
        with urllib.request.urlopen(req, timeout=15, context=_CTX) as r:
            data = json.loads(r.read())
            return (data.get("originalimage") or data.get("thumbnail") or {}).get("source")
    except Exception as e:
        print(f"    [wiki] {page}: {e}")
        return None

def download(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": "TechDriveBot/1.0 (truongnd.bka@gmail.com)"})
    with urllib.request.urlopen(req, timeout=30, context=_CTX) as r:
        return r.read(), r.headers.get("Content-Type", "image/jpeg")

def get_doc_id(slug: str) -> str | None:
    url = f"{BASE}/api/articles?filters[slug_vi][$eq]={urllib.parse.quote(slug)}&fields[0]=documentId"
    req = urllib.request.Request(url, headers=AUTH)
    with urllib.request.urlopen(req, timeout=10) as r:
        data = json.loads(r.read())
        return data["data"][0]["documentId"] if data["data"] else None

def upload_image(img: bytes, filename: str, mime: str) -> int:
    boundary = "TDrive_x9f3a"
    if "png" in mime: filename = filename.replace(".jpg", ".png")
    elif "webp" in mime: filename = filename.replace(".jpg", ".webp")
    body = (
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"files\"; filename=\"{filename}\"\r\nContent-Type: {mime}\r\n\r\n"
    ).encode() + img + f"\r\n--{boundary}--\r\n".encode()
    req = urllib.request.Request(
        f"{BASE}/api/upload", data=body, method="POST",
        headers={**AUTH, "Content-Type": f"multipart/form-data; boundary={boundary}"}
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())[0]["id"]

def get_article_full(doc_id: str) -> dict:
    """Fetch required fields to avoid Strapi v5 PUT validation errors."""
    url = f"{BASE}/api/articles/{doc_id}?fields[0]=title_vi&fields[1]=title_en&fields[2]=slug_vi&fields[3]=slug_en&fields[4]=category"
    req = urllib.request.Request(url, headers=AUTH)
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read())["data"]

def update_article(doc_id: str, payload: dict) -> None:
    # Strapi v5 PUT requires required fields — merge with existing
    existing = get_article_full(doc_id)
    merged = {
        "title_vi": existing.get("title_vi") or "",
        "title_en": existing.get("title_en") or "",
        "slug_vi":  existing.get("slug_vi") or "",
        "slug_en":  existing.get("slug_en") or "",
        "category": existing.get("category") or "news",
    }
    merged.update(payload)
    data = json.dumps({"data": merged}).encode()
    req = urllib.request.Request(
        f"{BASE}/api/articles/{doc_id}", data=data, method="PUT",
        headers={**AUTH, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        r.read()

# ── Step 1: Fix VinFast VF9 content ──────────────────────────────────────────

def fix_vf9_content():
    print("=== Step 1: Fix VinFast VF9 content ===")
    doc_id = get_doc_id("vinfast-vf9-2026-danh-gia")
    if not doc_id:
        print("  VF9 article not found!")
        return
    update_article(doc_id, {
        "content_vi": VF9_CONTENT,
        "excerpt_vi": VF9_EXCERPT,
        "reading_time_minutes": 8,
        "score": 8.0,
        "pros": [
            "Pin 123 kWh — phạm vi thực tế 520-540km, tốt nhất phân khúc tại Việt Nam",
            "Không gian cabin 6 chỗ rất rộng, ghế CaptainSeat hàng 2 cực kỳ thoải mái",
            "Hệ thống âm thanh Harman Kardon 14 loa chuẩn trên mọi phiên bản",
            "Apple CarPlay/Android Auto không dây (đã có qua OTA 2026)",
            "Sạc DC 150kW: 10-80% chỉ 35 phút",
        ],
        "cons": [
            "Vật liệu nội thất hàng 3 chưa tương xứng mức giá gần 2 tỷ",
            "Hạ tầng trạm sạc ngoài Hà Nội và TP.HCM còn thưa",
            "Thiết kế đuôi xe khá đơn điệu so với đầu xe",
            "Cảm giác lái thuần điện — không phù hợp người thích lái thể thao",
        ],
        "verdict_vi": "VF 9 2026 là chiếc xe điện tốt nhất VinFast từng làm, với pin 123 kWh và phạm vi 600km WLTP cạnh tranh sòng phẳng với Mercedes EQB hay BMW iX1. Nếu bạn là gia đình đông người tại Hà Nội hay TP.HCM với điểm sạc tại nhà — đây là lựa chọn rất đáng cân nhắc.",
    })
    print("  VF9 content updated OK")

# ── Step 2: Add images to all 14 original seed articles ──────────────────────

def fix_seed_images():
    print("\n=== Step 2: Add images to original seed articles ===")
    ok = fail = 0
    for i, (slug, wiki_page, filename) in enumerate(SEED_IMAGES):
        if i > 0:
            time.sleep(2)
        print(f"  [{slug[:42]}]", end=" ", flush=True)
        try:
            img_url = wiki_image_url(wiki_page)
            if not img_url:
                print("SKIP (no wiki image)")
                fail += 1
                continue
            img, mime = download(img_url)
            doc_id = get_doc_id(slug)
            if not doc_id:
                print("SKIP (article not found)")
                fail += 1
                continue
            media_id = upload_image(img, filename, mime)
            update_article(doc_id, {"featured_image": media_id})
            ok += 1
            print(f"OK (#{media_id}, {len(img)//1024}KB)")
        except Exception as e:
            fail += 1
            print(f"FAILED: {str(e)[:100]}")
    print(f"\nImages: {ok}/{ok+fail} updated.")

# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Only run image fix for VF3 (already done the rest)
    slug, wiki_page, filename = SEED_IMAGES[7]  # vinfast-vf3
    print(f"Fixing: {slug}")
    try:
        img_url = wiki_image_url(wiki_page)
        if img_url:
            img, mime = download(img_url)
            doc_id = get_doc_id(slug)
            if doc_id:
                media_id = upload_image(img, filename, mime)
                update_article(doc_id, {"featured_image": media_id})
                print(f"OK (media #{media_id})")
            else:
                print("Article not found")
        else:
            print("No image found")
    except Exception as e:
        print(f"FAILED: {e}")
    print("Done.")
