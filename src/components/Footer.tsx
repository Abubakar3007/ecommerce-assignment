const Footer = () => {
  const currentYear = new Date().getFullYear();
  // inline style
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "8px",
    backgroundColor: "#f5f5f5",
    marginTop: "auto",
  };

  return (
    <footer style={footerStyle}>
      <p>© {currentYear} ShopEasy. All rights reserved.</p>
    </footer>
  )
}

export default Footer