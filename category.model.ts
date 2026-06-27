export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

export const CATEGORIES: Pick<Category, 'name' | 'nameAr' | 'slug' | 'order'>[] = [
  { name: 'Flower Bouquets', nameAr: 'بوكيهات حلويات', slug: 'flower-bouquets', order: 1 },
  { name: 'Cakes & Sweets',  nameAr: 'كيك وحلويات',    slug: 'cakes-sweets',    order: 2 },
  { name: 'Gift Baskets',    nameAr: 'سلال الهدايا',    slug: 'gift-baskets',    order: 3 },
  { name: 'Balloons',        nameAr: 'بالونات',         slug: 'balloons',        order: 4 },
  { name: 'Occasions',       nameAr: 'توزيعات',         slug: 'occasions',       order: 5 },
  { name: 'Custom Order',    nameAr: 'طلب مخصص',        slug: 'custom-order',    order: 6 },
];
