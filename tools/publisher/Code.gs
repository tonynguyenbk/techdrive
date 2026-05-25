/**
 * TechDrive Publisher — Google Docs → Strapi
 *
 * Setup:
 *   1. Open Google Docs → Extensions → Apps Script → paste this file
 *   2. Set STRAPI_URL and STRAPI_TOKEN in Script Properties
 *   3. Run setupMenu() once to add the TechDrive menu
 *
 * Usage:
 *   Format your Google Doc using one of the prompt templates in /tools/prompts/
 *   Then: TechDrive → Publish to Strapi (Draft)
 */

// ─── Config (set in Extensions → Apps Script → Project Settings → Script Properties) ────
const STRAPI_URL = "https://techdrive-strapi.onrender.com";
const STRAPI_TOKEN = PropertiesService.getScriptProperties().getProperty("STRAPI_TOKEN") || "";
const DEFAULT_AUTHOR_ID = 1; // ID của tài khoản author trong Strapi

// ─── Menu ─────────────────────────────────────────────────────────────────────

function onOpen() {
  DocumentApp.getUi()
    .createMenu("TechDrive")
    .addItem("Publish to Strapi (Draft)", "publishDraft")
    .addItem("Publish to Strapi (Live)", "publishLive")
    .addSeparator()
    .addItem("Preview Parsed Fields", "previewFields")
    .addItem("Help", "showHelp")
    .addToUi();
}

function setupMenu() {
  onOpen();
}

// ─── Main publish functions ────────────────────────────────────────────────────

function publishDraft() {
  _publish(false);
}

function publishLive() {
  const ui = DocumentApp.getUi();
  const confirm = ui.alert(
    "Xác nhận publish",
    "Bài viết sẽ được PUBLISH NGAY trên website. Tiếp tục?",
    ui.ButtonSet.YES_NO
  );
  if (confirm === ui.Button.YES) _publish(true);
}

function _publish(publishNow) {
  const ui = DocumentApp.getUi();

  if (!STRAPI_TOKEN) {
    ui.alert("Lỗi", "Chưa cấu hình STRAPI_TOKEN. Vào Project Settings → Script Properties để thêm.", ui.ButtonSet.OK);
    return;
  }

  const doc = DocumentApp.getActiveDocument();
  const text = doc.getBody().getText();

  let fields;
  try {
    fields = parseFields(text);
  } catch (e) {
    ui.alert("Lỗi parse", "Không thể đọc nội dung: " + e.message, ui.ButtonSet.OK);
    return;
  }

  // Validate required fields
  if (!fields.title_vi) {
    ui.alert("Thiếu TITLE_VI", "Bài viết phải có TITLE_VI.", ui.ButtonSet.OK);
    return;
  }
  if (!fields.content_vi) {
    ui.alert("Thiếu CONTENT_VI", "Bài viết phải có CONTENT_VI.", ui.ButtonSet.OK);
    return;
  }

  const payload = buildPayload(fields, publishNow);

  try {
    const result = postToStrapi(payload);
    const docId = result.data?.documentId || result.data?.id;
    const url = STRAPI_URL + "/dashboard/content-manager/collection-types/api::article.article/" + docId;

    ui.alert(
      publishNow ? "Đã publish!" : "Đã tạo draft!",
      "✅ Thành công!\n\nXem bài viết trong Strapi:\n" + url,
      ui.ButtonSet.OK
    );
  } catch (e) {
    ui.alert("Lỗi Strapi", e.message, ui.ButtonSet.OK);
  }
}

function previewFields() {
  const doc = DocumentApp.getActiveDocument();
  const text = doc.getBody().getText();
  let fields;
  try {
    fields = parseFields(text);
  } catch (e) {
    DocumentApp.getUi().alert("Parse error: " + e.message);
    return;
  }

  const preview = Object.entries(fields)
    .map(([k, v]) => {
      const val = typeof v === "string" ? v.substring(0, 100) + (v.length > 100 ? "..." : "") : JSON.stringify(v);
      return k + ": " + val;
    })
    .join("\n\n");

  DocumentApp.getUi().alert("Fields parsed:", preview, DocumentApp.getUi().ButtonSet.OK);
}

// ─── Parser ───────────────────────────────────────────────────────────────────

/**
 * Extracts structured fields from the Google Doc.
 *
 * Expected format (from prompt templates):
 *   **TITLE_VI:** Some title here
 *   **EXCERPT_VI:** Short excerpt
 *   **TAGS:** tag1, tag2, tag3
 *   **CONTENT_VI:**
 *   ## Heading...
 *   Body content...
 */
function parseFields(text) {
  const fields = {};

  // Single-line fields (everything after the marker on the same line)
  const singleLineFields = [
    "TITLE_VI", "TITLE_EN",
    "EXCERPT_VI", "EXCERPT_EN",
    "TAGS",
    "VERDICT_VI", "VERDICT_EN",
    "REVIEW_BADGE",
    "META_TITLE", "META_DESCRIPTION",
    "READING_TIME",
    "CATEGORY",
  ];

  // Score fields (decimal)
  const scoreFields = [
    "SCORE", "SCORE_DESIGN", "SCORE_INTERIOR",
    "SCORE_PERFORMANCE", "SCORE_COMFORT",
    "SCORE_TECH", "SCORE_VALUE",
  ];

  // Multi-line fields: content continues until the next **FIELD:** marker or EOF
  const multiLineFields = ["CONTENT_VI", "CONTENT_EN", "PROS", "CONS"];

  // Combined list of all markers for boundary detection
  const allMarkers = [...singleLineFields, ...scoreFields, ...multiLineFields];
  const markerPattern = new RegExp(
    "\\*\\*(" + allMarkers.join("|") + ")\\*\\*:?",
    "g"
  );

  // Find all marker positions
  const markers = [];
  let match;
  while ((match = markerPattern.exec(text)) !== null) {
    markers.push({ name: match[1], index: match.index, end: match.index + match[0].length });
  }

  for (let i = 0; i < markers.length; i++) {
    const m = markers[i];
    const nextStart = i + 1 < markers.length ? markers[i + 1].index : text.length;
    const raw = text.slice(m.end, nextStart).trim();

    if (multiLineFields.includes(m.name)) {
      fields[m.name.toLowerCase()] = raw;
    } else if (scoreFields.includes(m.name)) {
      const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
      if (!isNaN(num)) fields[m.name.toLowerCase()] = num;
    } else {
      // Take just first line for single-line fields
      fields[m.name.toLowerCase()] = raw.split("\n")[0].trim();
    }
  }

  // Parse TAGS into array
  if (fields.tags) {
    fields.tags = fields.tags.split(",").map((t) => t.trim()).filter(Boolean);
  }

  // Parse PROS / CONS into arrays (each line starting with - or number)
  if (fields.pros) {
    fields.pros = fields.pros.split("\n")
      .map((l) => l.replace(/^[-*•\d.]+\s*/, "").trim())
      .filter(Boolean);
  }
  if (fields.cons) {
    fields.cons = fields.cons.split("\n")
      .map((l) => l.replace(/^[-*•\d.]+\s*/, "").trim())
      .filter(Boolean);
  }

  // Parse READING_TIME to integer
  if (fields.reading_time) {
    const rt = parseInt(fields.reading_time);
    fields.reading_time_minutes = isNaN(rt) ? 5 : rt;
    delete fields.reading_time;
  }

  // Convert CONTENT_VI markdown → basic HTML (headings + paragraphs)
  if (fields.content_vi) {
    fields.content_vi = markdownToHtml(fields.content_vi);
  }
  if (fields.content_en) {
    fields.content_en = markdownToHtml(fields.content_en);
  }

  return fields;
}

// ─── Markdown → HTML (basic) ──────────────────────────────────────────────────

function markdownToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let inTable = false;
  let tableBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Table row
    if (line.trim().startsWith("|")) {
      if (!inTable) { inTable = true; tableBuffer = []; }
      tableBuffer.push(line);
      continue;
    } else if (inTable) {
      out.push(renderTable(tableBuffer));
      inTable = false;
      tableBuffer = [];
    }

    // Headings
    if (/^### /.test(line)) { out.push("<h3>" + esc(line.slice(4)) + "</h3>"); continue; }
    if (/^## /.test(line))  { out.push("<h2>" + esc(line.slice(3)) + "</h2>"); continue; }
    if (/^# /.test(line))   { out.push("<h2>" + esc(line.slice(2)) + "</h2>"); continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) { out.push("<hr>"); continue; }

    // Empty line → paragraph break
    if (!line.trim()) { out.push(""); continue; }

    // Inline formatting, then wrap in <p>
    line = inlineFormat(line);
    out.push("<p>" + line + "</p>");
  }

  if (inTable && tableBuffer.length) {
    out.push(renderTable(tableBuffer));
  }

  return out.join("\n");
}

function renderTable(rows) {
  const html = ["<table>"];
  rows.forEach((row, idx) => {
    // Skip separator rows like |---|---|
    if (/^\|[-| :]+\|$/.test(row.trim())) return;
    const cells = row.split("|").slice(1, -1).map((c) => c.trim());
    const tag = idx === 0 ? "th" : "td";
    html.push("<tr>" + cells.map((c) => "<" + tag + ">" + esc(c) + "</" + tag + ">").join("") + "</tr>");
  });
  html.push("</table>");
  return html.join("\n");
}

function inlineFormat(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function esc(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Strapi API ───────────────────────────────────────────────────────────────

function buildPayload(fields, publishNow) {
  const data = {
    title_vi: fields.title_vi,
    title_en: fields.title_en || null,
    excerpt_vi: fields.excerpt_vi || null,
    excerpt_en: fields.excerpt_en || null,
    content_vi: fields.content_vi || null,
    content_en: fields.content_en || null,
    tags: fields.tags || [],
    category: mapCategory(fields.category),
    verdict_vi: fields.verdict_vi || null,
    verdict_en: fields.verdict_en || null,
    pros: fields.pros || null,
    cons: fields.cons || null,
    review_badge: mapReviewBadge(fields.review_badge),
    score: fields.score || null,
    score_design: fields.score_design || null,
    score_performance: fields.score_performance || null,
    score_comfort: fields.score_comfort || null,
    score_tech: fields.score_tech || null,
    score_value: fields.score_value || null,
    reading_time_minutes: fields.reading_time_minutes || 5,
    meta_title: fields.meta_title || fields.title_vi?.substring(0, 60) || null,
    meta_description: fields.meta_description || fields.excerpt_vi?.substring(0, 160) || null,
    author: DEFAULT_AUTHOR_ID,
  };

  // Remove null values to avoid overwriting existing data
  Object.keys(data).forEach((k) => { if (data[k] === null || data[k] === undefined) delete data[k]; });

  return { data, status: publishNow ? "published" : "draft" };
}

function mapCategory(raw) {
  if (!raw) return "news";
  const lower = raw.toLowerCase();
  if (lower.includes("review") || lower.includes("đánh giá")) return "review";
  if (lower.includes("comparison") || lower.includes("so sánh")) return "comparison";
  if (lower.includes("advice") || lower.includes("tư vấn")) return "advice";
  if (lower.includes("video")) return "video";
  return "news";
}

function mapReviewBadge(raw) {
  if (!raw) return undefined;
  const allowed = ["first_drive", "detailed_review", "long_term", "comparison"];
  const lower = raw.toLowerCase().replace(/\s+/g, "_");
  return allowed.includes(lower) ? lower : undefined;
}

function postToStrapi(payload) {
  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + STRAPI_TOKEN },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(STRAPI_URL + "/api/articles", options);
  const code = response.getResponseCode();
  const body = JSON.parse(response.getContentText());

  if (code >= 400) {
    const msg = body?.error?.message || JSON.stringify(body);
    throw new Error("Strapi " + code + ": " + msg);
  }

  return body;
}

// ─── Help ─────────────────────────────────────────────────────────────────────

function showHelp() {
  DocumentApp.getUi().alert(
    "TechDrive Publisher — Hướng dẫn",
    "1. Viết bài theo prompt template trong /tools/prompts/\n" +
    "2. Copy output của AI vào Google Doc này\n" +
    "3. TechDrive → Preview Parsed Fields (kiểm tra)\n" +
    "4. TechDrive → Publish to Strapi (Draft)\n" +
    "5. Mở Strapi dashboard để thêm ảnh đại diện\n\n" +
    "Cần thiết lập: Project Settings → Script Properties\n" +
    "  STRAPI_TOKEN = [API token từ Strapi dashboard]\n\n" +
    "Xem README tại: github.com/techdrive-vn/tools/publisher/README.md",
    DocumentApp.getUi().ButtonSet.OK
  );
}
