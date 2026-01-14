import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img className="cardImg" src={product.image} alt={product.name} />
      <div className="cardBody">
        <div className="muted">{product.category} • ⭐ {product.rating}</div>
        <h3 style={{ margin: "0.4rem 0" }}>{product.name}</h3>
        <p className="muted" style={{ marginTop: 0 }}>{product.short}</p>

        <div className="row">
          <strong>R{product.price}</strong>
          <button className="btn" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
