export interface Product {
  id: number; // product id
  title: string; // product title
  price: number; // product price
  description: string; // product description
  category: {
    id: number;
    name: string;
    image: string;
  }; // product category
  images: string[]; // product image
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}