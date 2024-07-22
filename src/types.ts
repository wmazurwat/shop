export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: {
    url: string;
  };
}

export interface CartItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  image: string;
}
