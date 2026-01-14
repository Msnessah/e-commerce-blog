import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { totals } = useCart();

  return (
    <div className="nav">
      <Link to="/" className="brand">ShopBlog</Link>

      <div className="navLinks">
        <Link to="/blog">Blog</Link>
        <Link to="/store">Store</Link>
        <Link to="/cart">Cart ({totals.count})</Link>
      </div>
    </div>
  );
}
