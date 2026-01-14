import { useMemo, useState } from "react";
import { posts } from "../data/posts";
import PostCard from "../components/PostCard";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="container">
      <h2>Blog • Home & Kitchen</h2>
      <p className="muted">Guides, comparisons, and tips that help you shop smarter.</p>

      <div className="controls">
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts: pans, storage, air fryer…"
          aria-label="Search blog posts"
        />

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter posts by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <h3>No posts found</h3>
          <p className="muted">Try a different search or choose “All”.</p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: "1rem" }}>
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
