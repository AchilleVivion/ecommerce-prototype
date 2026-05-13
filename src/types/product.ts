export interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
