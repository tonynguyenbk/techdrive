export function formatPrice(amount: number, locale = "vi-VN"): string {
  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    return `${billions % 1 === 0 ? billions : billions.toFixed(1)} tỷ`;
  }
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${millions % 1 === 0 ? millions : millions.toFixed(0)} triệu`;
  }
  return new Intl.NumberFormat(locale).format(amount);
}

export function formatDate(date: string | Date, locale = "vi-VN"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateLong(date: string | Date, locale = "vi-VN"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatNumber(value: number, locale = "vi-VN"): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
