import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/AppContext";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
    // set cart count from context
    const { cart } = useCart();
    const cartCount = cart.length; // find total items in cart

    // inline styles
    const headerStyle: React.CSSProperties = {
        backgroundColor: "#f8f9fa",
        backdropFilter: "blur(10px)",
        padding: "16px 4px",
        textAlign: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 auto",
        padding: "0 20px",
    };

    const headingStyle: React.CSSProperties = {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        textDecoration: "none",
    }

    const cartButtonStyle: React.CSSProperties = {
        position: "relative",
        background: "none",
        border: "none",
        cursor: "pointer",
    }

    const cartCountStyle: React.CSSProperties = {
        position: "absolute",
        top: "-8px",
        right: "-8px",
        backgroundColor: "#982b3dff",
        color: "white",
        borderRadius: "50%",
        width: 18,
        height: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: "bold",
    }

    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                <Link to="/" style={headingStyle}>ShopEasy</Link>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <Link to="/cart" style={cartButtonStyle}>
                        <ShoppingCart size={22} color="#333" />
                        <span style={cartCountStyle}>{cartCount}</span>
                    </Link>
                    <Link to="/cart">
                        <User size={22} color="#333" />
                    </Link>
                </div>

            </div>
        </header>
    );
}

export default Header;