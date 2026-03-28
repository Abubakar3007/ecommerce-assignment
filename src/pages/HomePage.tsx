import React, { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductsByFilterCategory, fetchProductsByMultipleCategories } from "../services/api";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import FilterProduct from "../components/FilterProduct";

const HomePage = () => {
  // all state
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("");

  // fetch categories products from filter
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let data: Product[]; // empty data store
        // check if select category is 0 or All
        if (selectedCategories.length === 0) {
          data = await fetchAllProducts();
        }
        else if (selectedCategories.length === 1) {
          data = await fetchProductsByFilterCategory(selectedCategories[0]); // if user select single category like - electronics
        }
        else {
          data = await fetchProductsByMultipleCategories(selectedCategories); // if user select multiple category like - men's cloths & electronics
        }
        setProducts(data); // set data is state
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false); // once data fetching done then loading will complete
      }
    };

    fetchProducts();
  }, [selectedCategories]); // dependency array with selected category

  // sort products from select sort
  const sortedProducts = [...products].sort((from, to) => {
    switch (sortBy) {
      case "price-asc":
        return from.price - to.price;
      case "price-desc":
        return to.price - from.price;
      case "title-asc":
        return from.title.localeCompare(to.title);
      case "title-desc":
        return to.title.localeCompare(from.title);
      default:
        return 0;
    }
  });

  // all inline styles
  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: "100px",
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    paddingTop: "40px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 8px 0",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: "#666",
    margin: 0,
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "24px",
  };

  return (
    <section>
      <div style={containerStyle}>
        {/* header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>🛒 ShopEasy</h1>
          <p style={subtitleStyle}>
            Browse our collection of amazing products
          </p>
        </div>
        <div>
          {/* filter product */}
          <FilterProduct
            categories={[
              "All",
              "Men's clothing",
              "Jewelery",
              "Electronics",
              "Women's clothing",
            ]}
            selectedCategories={selectedCategories}
            sortBy={sortBy}
            onCategoryFilterChange={({ selectedCategories, sortBy }) => {
              if (selectedCategories.includes("All")) { // check if selected category include all
                setSelectedCategories([]);
              } else { // otherwise all categories
                setSelectedCategories(selectedCategories);
              }
              setSortBy(sortBy); // set sort by
            }}
          />
        </div>

        {/* products grid*/}
        <div style={gridStyle}>
          {
            sortedProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              loading ? (
                <p>Products are loading...</p>
              ) : (
                sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )
            )
          }
        </div>
      </div>
    </section>
  );
}

export default HomePage;