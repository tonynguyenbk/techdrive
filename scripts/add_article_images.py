#!/usr/bin/env python3
"""
Download real car images and push them to Strapi article featured_image.
Uses Wikipedia REST API (no key needed) for model-specific photos.
"""
import sys, json, urllib.request, urllib.error, urllib.parse, ssl, time
sys.stdout.reconfigure(encoding='utf-8')

# Bypass SSL verification for external image downloads on Windows
_NO_VERIFY = ssl.create_default_context()
_NO_VERIFY.check_hostname = False
_NO_VERIFY.verify_mode = ssl.CERT_NONE

BASE  = "http://localhost:1337"
TOKEN = "14006d13d352211548ddd34d5a149c4a0d0f8ac958c04d03280c12a89bea292f423fde74acdea441df155364971364adcb353092fb3e1c7bf74c892bb4d20a3093fb35365e81679603dccf58b7cc354bba327eb701f03ae0a6726cc231264d584d3f75f59a9073d83017fe2cc59d823116f8203e7a21485dcc4e1273285d2b3d"
AUTH  = {"Authorization": f"Bearer {TOKEN}"}

# --- Image sources for each article ---
# Format: "wikipedia:<PageTitle>"  → fetch main image from Wikipedia REST API
#         "direct:<URL>"           → download directly from URL
ARTICLE_IMAGES = [
    # Bài 1 – VinFast tái cơ cấu 530 triệu USD
    ("vinfast-tai-co-cau-530-trieu-usd-chien-luoc",
     "wikipedia:VinFast_VF8", "vinfast-vf8-restructure.jpg"),

    # Bài 2 – VinFast doanh số tháng 4
    ("vinfast-doanh-so-thang-4-2026-so-1",
     "wikipedia:VinFast", "vinfast-sales-april.jpg"),

    # Bài 3 – Xe giảm giá trăm triệu
    ("xe-giam-gia-tram-trieu-2026-nen-mua-hay-cho",
     "wikipedia:Toyota_Vios", "car-discount-2026.jpg"),

    # Bài 4 – Xe hybrid ưu đãi thuế
    ("xe-hybrid-uu-dai-thue-tieu-thu-dac-biet-2026",
     "wikipedia:Toyota_Corolla_Cross", "hybrid-tax-incentive.jpg"),

    # Bài 5 – Subaru Forester 2026
    ("subaru-forester-2026-nhat-ban-dong-co-2-5l-gia-tang",
     "wikipedia:Subaru_Forester", "subaru-forester-2026.jpg"),

    # Bài 6 – Honda City 2026 facelift
    ("honda-city-2026-facelift-ra-mat-gia-499-trieu",
     "wikipedia:Honda_City", "honda-city-2026-facelift.jpg"),

    # Bài 7 – Cuộc đua trạm sạc xe điện
    ("cuoc-dua-tram-sac-xe-dien-viet-nam-2026",
     "wikipedia:Charging_station", "ev-charging-vietnam.jpg"),

    # Bài 8 – Thị trường ô tô tháng 4 giảm tốc
    ("thi-truong-o-to-thang-4-2026-giam-toc-nguyen-nhan",
     "wikipedia:Car_dealership", "auto-market-slowdown.jpg"),

    # Bài 9 – Đánh giá VinFast VF8 2026
    ("danh-gia-vinfast-vf8-2026-noi-that-moi-pin-510km",
     "wikipedia:VinFast_VF8", "vinfast-vf8-review-2026.jpg"),

    # Bài 10 – Đánh giá Volvo S90 2026
    ("danh-gia-volvo-s90-2026-plug-in-hybrid-462-ma-luc",
     "wikipedia:Volvo_S90", "volvo-s90-2026-review.jpg"),

    # Bài 11 – Đánh giá Toyota Camry 2026
    ("danh-gia-toyota-camry-2026-sedan-hang-d",
     "wikipedia:Toyota_Camry", "toyota-camry-2026-review.jpg"),

    # Bài 12 – Đánh giá Hyundai Tucson 2026 — DONE (media #4)
    # ("danh-gia-hyundai-tucson-2026-so-sanh-honda-crv",
    #  "wikipedia:Hyundai_Tucson", "hyundai-tucson-2026-review.jpg"),

    # Bài 13 – Nên mua xe hybrid hay xăng?
    ("nen-mua-xe-hybrid-hay-xe-xang-2026-phan-tich-chi-phi",
     "wikipedia:Hybrid_electric_vehicle", "hybrid-vs-petrol-2026.jpg"),

    # Bài 14 – Mua xe ô tô 2026 tiết kiệm
    ("mua-xe-o-to-2026-chinh-sach-tiet-kiem-200-trieu",
     "wikipedia:Automobile_dealership", "car-buying-guide-2026.jpg"),
]

# ── Wikipedia helper ─────────────────────────────────────────────────────────

def get_wikipedia_image_url(page_title: str) -> str | None:
    api = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(page_title)}"
    req = urllib.request.Request(api, headers={"User-Agent": "TechDriveBot/1.0 (truongnd.bka@gmail.com)"})
    try:
        with urllib.request.urlopen(req, timeout=15, context=_NO_VERIFY) as r:
            data = json.loads(r.read())
            src = (data.get("originalimage") or data.get("thumbnail") or {}).get("source")
            return src
    except Exception as e:
        print(f"    [wiki err] {page_title}: {e}")
        return None

# ── Download helper ───────────────────────────────────────────────────────────

def download_image(url: str) -> bytes:
    req = urllib.request.Request(url, headers={
        "User-Agent": "TechDriveBot/1.0 (truongnd.bka@gmail.com)",
        "Accept": "image/webp,image/apng,image/*,*/*",
    })
    with urllib.request.urlopen(req, timeout=30, context=_NO_VERIFY) as r:
        content_type = r.headers.get("Content-Type", "image/jpeg")
        return r.read(), content_type

# ── Strapi: get article documentId by slug ────────────────────────────────────

def get_doc_id(slug_vi: str) -> str | None:
    url = f"{BASE}/api/articles?filters[slug_vi][$eq]={urllib.parse.quote(slug_vi)}&fields[0]=documentId"
    req = urllib.request.Request(url, headers=AUTH)
    with urllib.request.urlopen(req, timeout=10) as r:
        data = json.loads(r.read())
        if data["data"]:
            return data["data"][0]["documentId"]
    return None

# ── Strapi: upload image to media library ─────────────────────────────────────

def upload_image(img_bytes: bytes, filename: str, mime: str = "image/jpeg") -> int:
    boundary = "TechDriveBoundary_x8f3a"
    header = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="files"; filename="{filename}"\r\n'
        f"Content-Type: {mime}\r\n\r\n"
    ).encode()
    footer = f"\r\n--{boundary}--\r\n".encode()
    body = header + img_bytes + footer

    req = urllib.request.Request(
        f"{BASE}/api/upload", data=body, method="POST",
        headers={
            **AUTH,
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        }
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        result = json.loads(r.read())
        return result[0]["id"]

# ── Strapi: link media to article ─────────────────────────────────────────────

def link_image(doc_id: str, media_id: int) -> None:
    data = json.dumps({"data": {"featured_image": media_id}}).encode()
    req = urllib.request.Request(
        f"{BASE}/api/articles/{doc_id}", data=data, method="PUT",
        headers={**AUTH, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        r.read()

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print(f"Adding images to {len(ARTICLE_IMAGES)} articles...\n")
    ok = fail = 0

    for i, (slug_vi, source, filename) in enumerate(ARTICLE_IMAGES):
        if i > 0:
            time.sleep(2)  # respect Wikimedia rate limits
        print(f"  [{slug_vi[:40]}]", end=" ", flush=True)
        try:
            # 1. Resolve image URL
            if source.startswith("wikipedia:"):
                page = source[len("wikipedia:"):]
                img_url = get_wikipedia_image_url(page)
                if not img_url:
                    print("SKIP (no wiki image)")
                    fail += 1
                    continue
            elif source.startswith("direct:"):
                img_url = source[len("direct:"):]
            else:
                img_url = source

            # 2. Download
            img_bytes, mime = download_image(img_url)
            # Force jpeg content type for Wikipedia SVG/PNG if needed
            if "jpeg" not in mime and "jpg" not in mime:
                filename = filename.replace(".jpg", ".png")
                mime = "image/png" if "png" in mime else mime

            # 3. Upload to Strapi
            doc_id = get_doc_id(slug_vi)
            if not doc_id:
                print("SKIP (article not found in Strapi)")
                fail += 1
                continue

            media_id = upload_image(img_bytes, filename, mime)

            # 4. Link to article
            link_image(doc_id, media_id)

            ok += 1
            print(f"OK (media #{media_id}, {len(img_bytes)//1024}KB)")

        except Exception as e:
            fail += 1
            msg = str(e)[:120]
            print(f"FAILED: {msg}")

    print(f"\nDone: {ok}/{ok+fail} articles updated with images.")

if __name__ == "__main__":
    main()
