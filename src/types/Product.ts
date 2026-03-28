export interface Product {
  id: number; // product id
  title: string; // product title
  price: number; // product price
  description: string; // product description
  category: string; // product category
  image: string; // product image
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}