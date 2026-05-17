'use strict';

const { seedAuthors, seedCarBrands, seedCarModels, seedArticles } = require('./seeds/seed-data');

function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

module.exports = {
  register({ strapi }) {},

  async bootstrap({ strapi }) {
    if (process.env.NODE_ENV !== 'development') return;

    strapi.log.info('🌱 Checking seed data...');
    let added = 0;

    // ── Authors ────────────────────────────────────────────────────────────
    const allAuthors = {};
    for (const a of seedAuthors) {
      const slug = toSlug(a.name);
      let author = await strapi.db.query('api::author.author').findOne({ where: { slug } });
      if (!author) {
        author = await strapi.db.query('api::author.author').create({ data: { ...a, slug } });
        strapi.log.info(`  + author: ${a.name}`);
        added++;
      }
      allAuthors[a.name] = author;
    }

    // ── Car Brands ─────────────────────────────────────────────────────────
    const allBrands = {};
    for (const b of seedCarBrands) {
      let brand = await strapi.db
        .query('api::car-brand.car-brand')
        .findOne({ where: { slug: b.slug } });
      if (!brand) {
        brand = await strapi.db.query('api::car-brand.car-brand').create({
          data: { ...b, is_active: true, publishedAt: new Date() },
        });
        strapi.log.info(`  + brand: ${b.name_en}`);
        added++;
      }
      allBrands[b.slug] = brand;
    }

    // ── Car Models ─────────────────────────────────────────────────────────
    for (const m of seedCarModels) {
      const { brandSlug, ...modelData } = m;
      const brand = allBrands[brandSlug];
      if (!brand) continue;
      const existing = await strapi.db
        .query('api::car-model.car-model')
        .findOne({ where: { slug: modelData.slug } });
      if (!existing) {
        await strapi.db.query('api::car-model.car-model').create({
          data: { ...modelData, brand: brand.id, publishedAt: new Date() },
        });
        strapi.log.info(`  + model: ${modelData.name}`);
        added++;
      }
    }

    // ── Articles ───────────────────────────────────────────────────────────
    for (const article of seedArticles) {
      const { authorName, ...articleData } = article;
      const author = allAuthors[authorName];
      const existing = await strapi.db
        .query('api::article.article')
        .findOne({ where: { slug_vi: articleData.slug_vi } });
      if (!existing) {
        await strapi.db.query('api::article.article').create({
          data: {
            ...articleData,
            author: author?.id,
            publishedAt: articleData.publishedAt || new Date(),
          },
        });
        strapi.log.info(`  + article: ${articleData.title_vi.substring(0, 60)}`);
        added++;
      }
    }

    if (added > 0) {
      strapi.log.info(`🌱 Seeding complete — added ${added} items.`);
    } else {
      strapi.log.info('🌱 All seed data already present — nothing to add.');
    }
  },
};
