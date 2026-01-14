import { products } from "../data/products";
import { posts } from "../data/posts";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const featuredPosts = posts.slice(0, 2);

  return (
    <div className="container">
      <h1>ShopBlog • Home & Kitchen</h1>
      <p>Discover products through practical home tips and kitchen guides.</p>

      <div style={{ display: "flex", gap: "1rem", margin: "1.5rem 0" }}>
        <Link className="pill" to="/store">Shop Store</Link>
        <Link className="pill outline" to="/blog">Read Blog</Link>
      </div>

      <h2>Featured Products</h2>
      <div className="grid">
        {featuredProducts.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} className="cardImg" />
            <div className="cardBody">
              <div className="muted">{p.category}</div>
              <h3>{p.name}</h3>
              <p className="muted">{p.short}</p>
              <div className="row">
                <strong>R{p.price}</strong>
                <Link to="/store" className="link">View in store →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "2rem" }}>Latest Articles</h2>
      <div className="grid">
        {featuredPosts.map((b) => (
          <div key={b.id} className="card">
            <img src={b.cover} alt={b.title} className="cardImg" />
            <div className="cardBody">
              <div className="muted">{b.category} • {b.date}</div>
              <h3>{b.title}</h3>
              <p className="muted">{b.excerpt}</p>
              <Link to="/blog" className="link">Read more →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
