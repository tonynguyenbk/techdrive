const ARTICLE_IMAGES: Record<string, string> = {
  'vinfast-vf9-2026-danh-gia':               'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=450&fit=crop&q=80',
  'mazda-cx5-2024-danh-gia':                 'https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=800&h=450&fit=crop&q=80',
  'ford-ranger-2024-danh-gia':               'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&q=80',
  'kia-carnival-2024-danh-gia':              'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=450&fit=crop&q=80',
  'toyota-fortuner-2024-lai-thu':            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=450&fit=crop&q=80',
  'hyundai-santa-fe-2024-danh-gia':          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=450&fit=crop&q=80',
  'honda-crv-hybrid-2023-danh-gia':          'https://images.unsplash.com/photo-1551830820-429a626e9c50?w=800&h=450&fit=crop&q=80',
  'vinfast-vf3-ra-mat-gia-tu-235-trieu':     'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&q=80',
  'top-10-xe-ban-chay-thang-4-2026':         'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=450&fit=crop&q=80',
  'toyota-corolla-cross-2025-facelift-ra-mat': 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=450&fit=crop&q=80',
  'hyundai-creta-2024-ky-luc-b-suv':         'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=450&fit=crop&q=80',
  'thue-nhap-khau-o-to-asean-0-phan-tram-2026': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=450&fit=crop&q=80',
  'so-sanh-cx5-tucson-crv-suv-tam-trung':    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=450&fit=crop&q=80',
  'so-sanh-veloz-xpander-carnival-mpv-gia-dinh': 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=450&fit=crop&q=80',
};

export function getArticleImage(slug: string): string | undefined {
  return ARTICLE_IMAGES[slug];
}
