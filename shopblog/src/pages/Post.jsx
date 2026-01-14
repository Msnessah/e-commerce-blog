import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Post() {
  const { id } = useParams();

  const post = useMemo(() => posts.find((p) => p.id === id), [id]);

  const recommended = useMemo(() => {
    if (!post) return [];
    return products.filter((pr) => post.productIds?.includes(pr.id));
  }, [post]);

  if (!post) {
    return (
      <div className="container">
        <div className="panel">
          <h2>Post not found</h2>
          <p className="muted">That article doesn’t exist.</p>
          <Link className="link" to="/blog">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link className="link" to="/blog">← Back to Blog</Link>

      <div className="postHero">
        <img className="postCover" src={post.cover} alt={post.title} />
        <div className="postMeta">
          <div className="muted">{post.category} • {post.date} • {post.readTime}</div>
          <h1 className="postTitle">{post.title}</h1>
          <p className="muted">{post.excerpt}</p>
        </div>
      </div>

      <div className="postBody panel" style={{ marginTop: "1rem" }}>
        {post.content.map((block, idx) => {
          if (block.type === "h3") return <h3 key={idx}>{block.text}</h3>;
          return <p key={idx} className="postP">{block.text}</p>;
        })}
      </div>

      <h2 style={{ marginTop: "2rem" }}>Recommended Products</h2>
      <div className="grid" style={{ marginTop: "1rem" }}>
        {recommended.length === 0 ? (
          <div className="panel">
            <p className="muted">No linked products for this post yet.</p>
          </div>
        ) : (
          recommended.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
