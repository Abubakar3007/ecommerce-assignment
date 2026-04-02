import { Link } from "react-router-dom";
import { useCart } from "../context/AppContext";
import { useEffect, useState } from "react";

const Cart = () => {
    const [width, setWidth] = useState(window.innerWidth); // for break points
    // check window width on resize
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth); // update width state
        window.addEventListener("resize", handleResize); // add event listener
        return () => window.removeEventListener("resize", handleResize); // remove event listener
    }, []);

    // make breakPoint
    const isDesktop = width >= 1024;
    const isTablet = width < 1024 && width >= 768;
    const isMobile = width < 768 && width >= 540;
    const isSmallMobile = width < 540;

    const { cart, removeFromCart, updateQuantity } = useCart();
    // total calcuate all price of all items
    const totalProductPrice = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    // remove product from cart
    const handleRemove = (id: number) => {
        removeFromCart(id);
    };

    // increase product quantity
    const handleIncrement = (id: number, quantity: number) => {
        updateQuantity(id, quantity);
    };

    // decrease product quantity
    const handleDecrement = (id: number, quantity: number) => {
        updateQuantity(id, -quantity);
    };

    // inline style
    const pageStyle: React.CSSProperties = {
        minHeight: "calc(100vh - 220px)",
        paddingTop:"24px",
        paddingBottom: "120px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#f1f3f6",
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        minHeight: "inherit"
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

    const mainLayoutStyle: React.CSSProperties = {
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        paddingTop: "40px",
        flexDirection: `${isDesktop ? "row" : "column"}`,
    };

    const leftColumnStyle: React.CSSProperties = {
        maxWidth: `${isDesktop ? "72%" : "100%"}`,
        width: "100%",
    };

    const rightColumnStyle: React.CSSProperties = {
        maxWidth: `${isDesktop ? "28%" : "100%"}`,
        width: "100%",
        position: "sticky",
        top: "20px",
    };

    const cartHeaderStyle: React.CSSProperties = {
        background: "#fff",
        padding: "16px 24px",
        borderRadius: "4px 4px 0 0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "600",
        fontSize: "1.1rem",
        color: "#1a1a2e",
    };

    const cartItemCardStyle = (isRemoving: boolean): React.CSSProperties => ({
        background: "#fff",
        padding: "20px 24px",
        borderTop: "1px solid #f0f0f0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        transition: "opacity 0.3s, transform 0.3s",
        opacity: isRemoving ? 0.4 : 1,
        transform: isRemoving ? "translateX(-20px)" : "translateX(0)",
    });

    const itemImageContainerStyle: React.CSSProperties = {
        width: "112px",
        minWidth: "112px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
    };

    const itemImageStyle: React.CSSProperties = {
        width: "112px",
        height: "112px",
        objectFit: "contain",
        borderRadius: "4px",
    };

    const qtyControlStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0",
        border: "1px solid #c2c2c2",
        borderRadius: "20px",
        overflow: "hidden",
    };

    const qtyBtnStyle = (disabled: boolean): React.CSSProperties => ({
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        background: disabled ? "#f0f0f0" : "#fff",
        color: disabled ? "#c2c2c2" : "#1a1a2e",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "14px",
        fontWeight: "700",
    });

    const qtyValueStyle: React.CSSProperties = {
        width: "36px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "700",
        borderLeft: "1px solid #c2c2c2",
        borderRight: "1px solid #c2c2c2",
        background: "#fff",
        height: "32px",
        display: "grid",
        placeItems: "center"
    };

    const itemDetailsStyle: React.CSSProperties = {
        flex: 1,
        minWidth: 0,
    };

    const itemTitleStyle: React.CSSProperties = {
        fontSize: "16px",
        fontWeight: "600",
        margin: "0 0 8px 0",
        color: "#333",
        lineHeight: "1.4",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textDecoration: "none",
    };

    const itemTitleLinkStyle: React.CSSProperties = {
        color: "#212121",
        textDecoration: "none",
    };

    const categoryTagStyle: React.CSSProperties = {
        display: "inline-block",
        fontSize: "0.72rem",
        color: "#878787",
        background: "#f0f0f0",
        padding: "2px 8px",
        borderRadius: "4px",
        marginBottom: "10px",
        textTransform: "capitalize",
    };

    const priceRowStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px",
        flexWrap: "wrap",
    };

    const currentPriceStyle: React.CSSProperties = {
        fontSize: "1.15rem",
        fontWeight: "700",
        color: "#212121",
    };

    const removeBtnStyle = {
        color: "#982b3dff",
        background: "none",
        border: "none",
        fontSize: "0.85rem",
        fontWeight: "600",
        cursor: "pointer",
        padding: "4px 0",
        textTransform: "uppercase",
    };

    const priceCardStyle = {
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        padding: "0",
        marginBottom: "24px"
    };

    const priceCardHeaderStyle = {
        padding: "16px 24px",
        borderBottom: "1px solid #f0f0f0",
        fontSize: "0.95rem",
        fontWeight: "700",
        color: "#878787",
        textTransform: "uppercase",
    };

    const priceRowDetailStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 24px",
        fontSize: "0.9rem",
        color: "#212121",
    };

    const totalRowStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 24px",
        fontSize: "1.05rem",
        fontWeight: "700",
        color: "#212121",
        borderTop: "2px dashed #e0e0e0",
    };

    const placeOrderBtnStyle = {
        width: "100%",
        padding: "16px",
        background: "#982b3dff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        fontWeight: "700",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: "background 0.2s",
        boxShadow: "0 2px 8px rgba(251,100,27,0.3)",
    };

    const secureInfoStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "16px",
        fontSize: "0.8rem",
        color: "#878787",
    };

    const emptyCartStyle = {
        textAlign: "center",
        padding: "60px 20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    };

    const emptyCartImageStyle: React.CSSProperties = {
        fontSize: "4rem",
        marginBottom: "16px",
    };

    const emptyCartTitleStyle: React.CSSProperties = {
        fontSize: "1.3rem",
        fontWeight: "600",
        color: "#212121",
        marginBottom: "8px",
    };

    const emptyCartSubStyle: React.CSSProperties = {
        fontSize: "0.9rem",
        color: "#878787",
        marginBottom: "24px",
    };

    const shopNowBtnStyle: React.CSSProperties = {
        display: "inline-block",
        padding: "12px 40px",
        background: "#982b3dff",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    };

    const addressBoxStyle = {
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        padding: "16px 24px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const addressTextStyle = {
        fontSize: "0.9rem",
        color: "#212121",
    };

    const addressBoldStyle = {
        fontWeight: "600",
    };

    const changeAddressBtnStyle = {
        background: "none",
        border: "none",
        color: "#2874f0",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        textTransform: "uppercase",
    };

    // check if cart is empty
    if (cart.length === 0) {
        return (
            <div style={pageStyle}>
                <div style={containerStyle}>
                    <div style={breadcrumbStyle}>
                        <Link to="/" style={breadcrumbLinkStyle}>Home</Link>
                        <span> &gt; My Cart</span>
                    </div>

                    <div style={{ display: "flex", minHeight: "inherit", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                        <div style={emptyCartImageStyle}>🛒</div>
                        <div style={emptyCartTitleStyle}>Your cart is empty!</div>
                        <div style={emptyCartSubStyle}>Add items to it now.</div>
                        <Link to="/" style={shopNowBtnStyle}>Shop Now</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                {/* Breadcrumb */}
                <div style={breadcrumbStyle}>
                    <Link to="/" style={breadcrumbLinkStyle}>Home</Link>
                    <span> &gt; My Cart</span>
                </div>

                <div style={mainLayoutStyle}>
                    {/* left box */}
                    <div style={leftColumnStyle}>
                        {/* delivery dummy address box */}
                        <div style={addressBoxStyle}>
                            <div style={addressTextStyle}>Deliver to: <span style={addressBoldStyle}>Guest User, 10001</span>
                                <br />
                                <span style={{ fontSize: "0.8rem", color: "#878787" }}>
                                    New York, United States
                                </span>
                            </div>
                            <button style={changeAddressBtnStyle}>Change</button>
                        </div>

                        {/* cart header */}
                        <div style={cartHeaderStyle}>
                            <h3 style={{ margin: 0 }}>My Cart ({cart.length})</h3>
                        </div>

                        {/* cart items */}
                        {cart.map((product: any) => {
                            return (
                                <div key={product.id} style={cartItemCardStyle(false)}>
                                    {/* Cart image and quantity */}
                                    <div style={itemImageContainerStyle}>
                                        {/* cart image */}
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={itemImageStyle}
                                        />
                                        <div style={qtyControlStyle}>
                                            {/* decrease quantity button */}
                                            <button
                                                style={qtyBtnStyle(product.quantity <= 1)}
                                                onClick={() => handleDecrement(product.id, 1)}
                                                disabled={product.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            {/* value show here */}
                                            <div style={qtyValueStyle}>{product.quantity}</div>
                                            {/* increase quantity button */}
                                            <button
                                                style={qtyBtnStyle(false)}
                                                onClick={() => handleIncrement(product.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Details */}
                                    <div style={itemDetailsStyle}>
                                        {/* title */}
                                        <Link
                                            to={`/product/${product.id}/details`}
                                            style={itemTitleLinkStyle}
                                        >
                                            <h3 style={itemTitleStyle}>{product.title}</h3>
                                        </Link>

                                        {/* category */}
                                        <div style={categoryTagStyle}>{product.category?.name}</div>

                                        {/* price */}
                                        <div style={priceRowStyle}>
                                            <span style={currentPriceStyle}>${product.price}</span>
                                        </div>

                                        {/* Remove cart item button */}
                                        <div>
                                            <button
                                                style={removeBtnStyle}
                                                onClick={() => handleRemove(product.id)}
                                            >
                                                Remove from Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* right side wrapper */}
                    <div style={rightColumnStyle}>
                        <div style={priceCardStyle}>
                            {/* heading */}
                            <div style={priceCardHeaderStyle}>Price Details</div>

                            {/* price */}
                            <div style={priceRowDetailStyle}>
                                <span>Price ({cart.length} {cart.length === 1 ? "item" : "items"})</span>
                                <span>${totalProductPrice.toFixed(2)}</span>
                            </div>

                            {/* total amount */}
                            <div style={totalRowStyle}>
                                <span>Total Amount</span>
                                <span>${totalProductPrice.toFixed(2)}</span>
                            </div>
                            {/* secure */}
                            <div style={secureInfoStyle}>
                                <span>🔒</span>
                                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div>
                        {/* pay button */}
                        <button style={placeOrderBtnStyle}>
                            Pay total ${totalProductPrice.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;