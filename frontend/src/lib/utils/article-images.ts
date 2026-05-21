const ARTICLE_IMAGES: Record<string, string> = {
  'lamborghini-urus-se-tettonero-capsule':
    'https://res.cloudinary.com/dhiykqhrp/image/upload/v1779010978/668202_d99f06cfb6.jpg',
  'vinfast-vf9-2026-danh-gia':
    'https://thuongtruong-fileserver.nvcms.net/IMAGES/2024/04/26/20240426194213-12anh-1.jpg',
  'mazda-cx5-2024-danh-gia':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mazda_CX-5_25S_L_Package_2WD_%286BA-KF5P%29_front.jpg/1280px-Mazda_CX-5_25S_L_Package_2WD_%286BA-KF5P%29_front.jpg',
  'ford-ranger-2024-danh-gia':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2024_Ford_Ranger_2.0_XL_4x4.jpg/1280px-2024_Ford_Ranger_2.0_XL_4x4.jpg',
  'kia-carnival-2024-danh-gia':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/2022_Kia_Carnival_LX_in_Silky_Silver%2C_front_left_%28cropped%29.jpg/1280px-2022_Kia_Carnival_LX_in_Silky_Silver%2C_front_left_%28cropped%29.jpg',
  'toyota-fortuner-2024-lai-thu':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Toyota_Fortuner_2.8_VRZ_4x2_Toyota_Safety_Sense_with_GR_Parts_Aero_Package_GUN166R_%2820241104%29.jpg/1280px-2024_Toyota_Fortuner_2.8_VRZ_4x2_Toyota_Safety_Sense_with_GR_Parts_Aero_Package_GUN166R_%2820241104%29.jpg',
  'hyundai-santa-fe-2024-danh-gia':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/2024_Hyundai_Santa_Fe_2.5_GLS_2WD_in_Abyss_Black_Pearl%2C_front_right.jpg/1280px-2024_Hyundai_Santa_Fe_2.5_GLS_2WD_in_Abyss_Black_Pearl%2C_front_right.jpg',
  'honda-crv-hybrid-2023-danh-gia':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2023_Honda_CR-V_Sport_in_Lunar_Silver_Metallic%2C_Front_Right%2C_11-12-2022.jpg/1280px-2023_Honda_CR-V_Sport_in_Lunar_Silver_Metallic%2C_Front_Right%2C_11-12-2022.jpg',
  'vinfast-vf3-ra-mat-gia-tu-235-trieu':
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/VinFast_VF_3_front_view.png',
  'top-10-xe-ban-chay-thang-4-2026':
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=450&fit=crop&q=80',
  'toyota-corolla-cross-2025-facelift-ra-mat':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/2024_Toyota_Corolla_Cross_LE_AWD_in_Wind_Chill_Pearl%2C_front_left.jpg/1280px-2024_Toyota_Corolla_Cross_LE_AWD_in_Wind_Chill_Pearl%2C_front_left.jpg',
  'hyundai-creta-2024-ky-luc-b-suv':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2024_Hyundai_Creta_Alpha.jpg/1280px-2024_Hyundai_Creta_Alpha.jpg',
  'thue-nhap-khau-o-to-asean-0-phan-tram-2026':
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=450&fit=crop&q=80',
  'so-sanh-cx5-tucson-crv-suv-tam-trung':
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=450&fit=crop&q=80',
  'so-sanh-veloz-xpander-carnival-mpv-gia-dinh':
    'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=450&fit=crop&q=80',
};

export function getArticleImage(slug: string): string | undefined {
  return ARTICLE_IMAGES[slug];
}
