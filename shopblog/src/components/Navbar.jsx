import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <Link to="/">ShopBlog</Link>
      <div>
        <Link to="/blog">Blog</Link> |{" "}
        <Link to="/store">Store</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}
