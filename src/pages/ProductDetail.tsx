import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSingleProductById } from "../services/api";
import { Product } from "../types/Product";
import { useParams } from "react-router-dom";
import { useCart } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams(); // product url params id
  const [product, setProduct] = React.useState<Product | null>(null);
  // find product by id
  useEffect(() => {
    fetchSingleProductById(Number(id)).then((product) => {
      setProduct(product);
    });
  }, [id]);

  const { cart, addToCart, removeFromCart } = useCart();

  // add or remove product from cart
  const handleAddToCart = (id: number) => {
    const productInCart = cart.find((item: Product) => item.id === id); // find product which one is current open in cart
    // check is product already in cart
    if (productInCart) {
      removeFromCart(id); // remove product from cart
    } else {
      addToCart(product); // add product to cart
    }
  };

  // inine styles
  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: "100px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardContainer: React.CSSProperties = {
    maxWidth: "850px",
    width: "100%",
    margin: "40px auto 0 auto",

  };

  const breadcrumbStyle: React.CSSProperties = {
    fontSize: "0.85rem",
    color: "#878787",
    marginBottom: "12px",
  };

  const breadcrumbLinkStyle: React.CSSProperties = {
    color: "#982b3dff",
    textDecoration: "none",
    fontWeight: "500",
  };

  const backButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 20px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#1a1a2e",
    fontSize: "0.95rem",
    fontWeight: "500",
    marginBottom: "24px",
    transition: "background 0.2s",
  };

  const detailCardStyle: React.CSSProperties = {
    display: "flex",
    gap: "40px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "32px",
    flexWrap: "wrap",
  };

  const imageContainerStyle: React.CSSProperties = {
    flex: "1 1 300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "30px",
    minHeight: "300px",
  };

  const imageStyle: React.CSSProperties = {
    maxHeight: "350px",
    maxWidth: "100%",
    objectFit: "contain",
  };

  const infoStyle: React.CSSProperties = {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "16px",
    lineHeight: "1.3",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#e94560",
    marginBottom: "24px",
  };

  const addButtonStyle = (addedAnimation: boolean): React.CSSProperties => {
    return {
      padding: "14px 32px",
      background: addedAnimation ? "#27ae60" : "#e94560",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: addedAnimation ? "scale(1.05)" : "scale(1)",
    };
  };

  const notFoundStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "60px",
    color: "#666",
  };

  // check if product does't find
  if (!product) {
    return (
      <div style={containerStyle}>
        <Link to="/" style={backButtonStyle}>
          ← Back to Home
        </Link>
        <div style={notFoundStyle}>
          <h2>Product not found</h2>
          <p>Please go back to the home page to browse products.</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div style={containerStyle}>
        {/* back to home navigation */}
        {/* breadcrumb */}
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>Home</Link>
          <span> &gt; {product.title}</span>
        </div>

        <div style={cardContainer}>
          <div style={detailCardStyle}>
            {/* product image */}
            <div style={imageContainerStyle}>
              <img src={product.image} alt={product.title} style={imageStyle} />
            </div>

            {/* product info */}
            <div style={infoStyle}>
              <h1 style={titleStyle}>{product.title}</h1>
              <p style={descriptionStyle}>{product.description}</p>
              <div style={priceStyle}>${product.price.toFixed(2)}</div>
              {/* add cart button */}
              <button
                style={addButtonStyle(cart.some((item: Product) => item.id === product.id))}
                onClick={() => handleAddToCart(product.id)}
              >
                {cart.some((item: Product) => item.id === product.id) ? (
                  <>
                    <span>✓</span>
                    <span style={{ marginLeft: "8px" }}>Added to Cart!</span>
                  </>
                ) : 
                (
                  <span>
                    <span><ShoppingCart /></span>
                    <span style={{ marginLeft: "8px" }}>Add to Cart</span>
                  </span>
                )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;



