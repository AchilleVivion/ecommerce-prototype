export interface Product {
  slug: string;
  name: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
