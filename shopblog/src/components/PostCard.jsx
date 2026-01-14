import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="cardLink">
      <div className="card">
        <img className="cardImg" src={post.cover} alt={post.title} />
        <div className="cardBody">
          <div className="muted">
            {post.category} • {post.date} • {post.readTime}
          </div>
          <h3 style={{ margin: "0.4rem 0" }}>{post.title}</h3>
          <p className="muted" style={{ marginTop: 0 }}>{post.excerpt}</p>
          <span className="link">Read →</span>
        </div>
      </div>
    </Link>
  );
}
