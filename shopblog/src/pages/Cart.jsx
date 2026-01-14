import { useMemo, useState } from "react";
import { useCart } from "../components/CartContext";

export default function Cart() {
  const { items, removeFromCart, changeQty, clearCart, totals } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const shipping = useMemo(() => {
    // simple rule: free shipping over R1000
    return totals.amount >= 1000 || totals.amount === 0 ? 0 : 89;
  }, [totals.amount]);

  const grandTotal = totals.amount + shipping;

  if (checkoutDone) {
    return (
      <div className="container">
        <div className="panel">
          <h2>Order confirmed ✅</h2>
          <p className="muted">
            This is a demo checkout. Your order wasn’t actually charged.
          </p>

          <div className="summaryRow">
            <span>Items</span>
            <strong>{totals.count}</strong>
          </div>
          <div className="summaryRow">
            <span>Total paid</span>
            <strong>R{grandTotal}</strong>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <button
              className="btn"
              onClick={() => {
                clearCart();
                setCheckoutDone(false);
              }}
            >
              Back to shop
            </button>

            <button className="btn ghost" onClick={() => setCheckoutDone(false)}>
              View cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Cart</h2>
      <p className="muted">Review items before checkout.</p>

      {items.length === 0 ? (
        <div className="panel">
          <h3>Your cart is empty</h3>
          <p className="muted">Go to the Store and add a few essentials.</p>
        </div>
      ) : (
        <div className="cartLayout">
          {/* Items */}
          <div className="panel">
            <div className="cartHeader">
              <h3 style={{ margin: 0 }}>Items ({totals.count})</h3>
              <button className="linkBtn" onClick={clearCart}>
                Clear cart
              </button>
            </div>

            <div className="cartList">
              {items.map((x) => (
                <div key={x.id} className="cartItem">
                  <img className="cartImg" src={x.image} alt={x.name} />

                  <div className="cartInfo">
                    <div className="muted">{x.category}</div>
                    <div className="cartTitle">{x.name}</div>
                    <div className="muted">R{x.price} each</div>
                  </div>

                  <div className="cartActions">
                    <label className="muted" style={{ fontSize: "0.85rem" }}>
                      Qty
                    </label>
                    <div className="qtyRow">
                      <button
                        className="qtyBtn"
                        onClick={() => changeQty(x.id, x.qty - 1)}
                        aria-label={`Decrease quantity of ${x.name}`}
                      >
                        −
                      </button>

                      <input
                        className="qtyInput"
                        value={x.qty}
                        onChange={(e) => changeQty(x.id, e.target.value)}
                        inputMode="numeric"
                        aria-label={`Quantity for ${x.name}`}
                      />

                      <button
                        className="qtyBtn"
                        onClick={() => changeQty(x.id, x.qty + 1)}
                        aria-label={`Increase quantity of ${x.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button className="danger" onClick={() => removeFromCart(x.id)}>
                      Remove
                    </button>
                  </div>

                  <div className="cartLineTotal">
                    <strong>R{x.price * x.qty}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="panel sticky">
            <h3 style={{ marginTop: 0 }}>Summary</h3>

            <div className="summaryRow">
              <span className="muted">Subtotal</span>
              <strong>R{totals.amount}</strong>
            </div>

            <div className="summaryRow">
              <span className="muted">Shipping</span>
              <strong>{shipping === 0 ? "Free" : `R${shipping}`}</strong>
            </div>

            <div className="divider" />

            <div className="summaryRow">
              <span>Total</span>
              <strong>R{grandTotal}</strong>
            </div>

            <button
              className="btn wide"
              onClick={() => setCheckoutDone(true)}
              aria-label="Proceed to checkout"
            >
              Checkout (demo)
            </button>

            <p className="muted" style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Free shipping on orders over R1000.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
