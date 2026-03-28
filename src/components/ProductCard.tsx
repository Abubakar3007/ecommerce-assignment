import React from "react";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../context/AppContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  // add and remove from cart logic
  
  const handleAddToCart = (id: number) => {
    const productInCart = cart.find((item:Product) => item.id === id);
    if (productInCart) {
      removeFromCart(id);
    } else {
      addToCart(product);
    }
  };

  // styles
  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
  };

  const cardImageBox: React.CSSProperties = {
    position: "relative",
  };

  const imageContainerStyle: React.CSSProperties = {
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "#f8f9fa",
  };

  const imageStyle: React.CSSProperties = {
    maxHeight: "180px",
    maxWidth: "100%",
    objectFit: "contain",
    cursor: "pointer",
    textDecoration: "none",
  };

  const addToCartButtonStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    background: "#982b3dff",
    color: "#ffffff",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  };

  const cardBodyStyle: React.CSSProperties = {
    padding: "16px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    textDecoration: "none",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "8px",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const cartButtonStyle = (isActive: boolean): React.CSSProperties => ({
    position: "absolute",
    bottom: "16px",
    right: "16px",
    width: "36px",
    height: "36px",
    overflow: "hidden",
    cursor: "pointer",
    border: "none",
    background: "#f7f7f7ff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    filter: "blur(0.2px)",
    borderRadius: "50%", 
  });

  const priceStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#982b3dff",
  };

  return (
    <div
      key={product.id}
      style={cardStyle}
    >
      {/* image container */}
      <div style={cardImageBox}>
        <Link
          title="View product details"
          to={`/product/${product.id}`}
          style={imageContainerStyle}
        >
          <img
            src={product.image}
            alt={product.title}
            style={imageStyle}
            loading="lazy"
            title={product.title}
          />
        </Link>

        {/* add cart button */}
        <button
          type="button"
          title="Add item cart"
          style={cartButtonStyle(cart.some((item:Product) => item.id === product.id))}
          onClick={() => handleAddToCart(product.id)}
        >
          <Heart
            size={20}
            stroke="#982b3dff"
            fill={cart.some((item:Product) => item.id === product.id) ? "#982b3dff" : "none"}
          />
        </button>
      </div>

      {/* text content */}
      <Link
        to={`/product/${product.id}`}
        style={cardBodyStyle}
        title="View product details"
      >
        <div style={cardTitleStyle}>{product.title}</div>
        <div style={priceStyle}>
          ${product.price.toFixed(2)}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;