'use strict';

const { seedAuthors, seedCarBrands, seedCarModels } = require('./seeds/seed-data');

module.exports = {
  register({ strapi }) {},

  async bootstrap({ strapi }) {
    if (process.env.NODE_ENV !== 'development') return;

    const authorCount = await strapi.db.query('api::author.author').count();
    if (authorCount > 0) return;

    strapi.log.info('🌱 Seeding initial data...');

    const createdAuthors = {};
    for (const a of seedAuthors) {
      const slug = a.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      const author = await strapi.db.query('api::author.author').create({
        data: { ...a, slug },
      });
      createdAuthors[a.name] = author;
    }
    strapi.log.info(`✅ Seeded ${Object.keys(createdAuthors).length} authors`);

    const createdBrands = {};
    for (const b of seedCarBrands) {
      const brand = await strapi.db.query('api::car-brand.car-brand').create({ data: b });
      createdBrands[b.slug] = brand;
    }
    strapi.log.info(`✅ Seeded ${Object.keys(createdBrands).length} car brands`);

    for (const m of seedCarModels) {
      const { brandSlug, ...modelData } = m;
      const brand = createdBrands[brandSlug];
      if (!brand) continue;
      await strapi.db.query('api::car-model.car-model').create({
        data: { ...modelData, brand: brand.id },
      });
    }
    strapi.log.info(`✅ Seeded ${seedCarModels.length} car models`);

    const duc = createdAuthors['Nguyễn Minh Đức'];
    const vf9 = await strapi.db
      .query('api::car-model.car-model')
      .findOne({ where: { slug: 'vf-9' } });

    await strapi.db.query('api::article.article').create({
      data: {
        title_vi: 'VinFast VF 9 2026: SUV điện Việt Nam có đủ sức cạnh tranh toàn cầu?',
        title_en: "VinFast VF 9 2026: Can Vietnam's Electric SUV Compete Globally?",
        slug_vi: 'vinfast-vf9-2026-danh-gia',
        slug_en: 'vinfast-vf9-2026-review',
        excerpt_vi: 'Chúng tôi đã lái thử VF 9 bản nâng cấp 2026 hơn 1.000km từ Hà Nội đến Đà Nẵng.',
        excerpt_en: 'We drove the updated VF 9 2026 over 1,000km from Hanoi to Da Nang.',
        content_vi: '<p>Nội dung đánh giá chi tiết VinFast VF 9 2026...</p>',
        content_en: '<p>Full review content for VinFast VF 9 2026...</p>',
        category: 'review',
        review_badge: 'first_drive',
        score: 9,
        score_design: 9,
        score_performance: 8,
        score_comfort: 9,
        score_tech: 8,
        score_value: 9,
        pros: ['Không gian rộng rãi', 'Tầm hoạt động thực tế tốt', 'Mạng sạc phủ rộng'],
        cons: ['Infotainment đôi khi lag', 'Hàng 3 hẹp cho người lớn'],
        verdict_vi: 'VinFast VF 9 2026 là lựa chọn SUV điện 7 chỗ đáng giá nhất tầm 2 tỷ tại Việt Nam.',
        verdict_en: 'The VinFast VF 9 2026 is the most worthwhile 7-seat electric SUV around 2 billion VND in Vietnam.',
        is_featured: true,
        reading_time_minutes: 12,
        view_count: 42800,
        tags: ['VinFast', 'VF9', 'SUV điện', 'xe điện'],
        author: duc?.id,
        related_cars: vf9 ? [vf9.id] : [],
        publishedAt: new Date().toISOString(),
      },
    });
    strapi.log.info('✅ Seeded 1 featured article');
    strapi.log.info('🌱 Seeding complete!');
  },
};
