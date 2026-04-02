import { Product } from "../types/Product"; // import product type
const API_LINK = "https://api.escuelajs.co/api/v1"; //product api link

// fetch all products from api
export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_LINK}/products`);
  return res.json(); // return products
};

// fetch a single product from api
export const fetchSingleProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`${API_LINK}/products/${id}`);
  return res.json(); // return product
};

// fetch product by filter 
export const fetchProductsByFilterCategory = async (category: string): Promise<Product[]> => {
  const res = await fetch(`${API_LINK}/products/?categorySlug=${category.toLowerCase()}`);
  return res.json();
};

// when multiple category select
export const fetchProductsByMultipleCategories = async (categories: string[]): Promise<Product[]> => {
  try {
    const results = await Promise.all(
      categories.map((cat) =>
        fetch(`${API_LINK}/products/?categorySlug=${encodeURIComponent(cat.toLowerCase())}`).then((res) => {
          if (!res.ok) return [];
          return res.json();
        })
      )
    );

    return results.flat();
  } catch (error) {
    console.error("Error fetching multiple categories:", error);
    return [];
  }
};