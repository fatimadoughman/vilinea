export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled';
export type OccasionTag  = 'birthday' | 'wedding' | 'mothers-day' | 'valentines' | 'engagement' | 'baby-shower' | 'graduation' | 'custom';

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface PriceVariant {
  label: string;       // e.g. 'Small', 'Medium', 'Large'
  labelAr: string;     // e.g. 'صغير', 'وسط', 'كبير'
  price: number;       // USD
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  categoryId: string;
  images: ProductImage[];
  variants: PriceVariant[];
  basePrice: number;            // lowest variant price — for display
  tags: OccasionTag[];
  isFeatured: boolean;
  isBestseller: boolean;
  isCustomizable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderRequest {
  productId: string;
  productName: string;
  variantLabel: string;
  price: number;
  quantity: number;
  occasion?: OccasionTag;
  customNote?: string;
  customerName: string;
  customerPhone: string;
}
