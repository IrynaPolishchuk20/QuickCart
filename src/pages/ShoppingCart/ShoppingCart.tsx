import './ShoppingCart.scss'
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + (item.price * (item.quantity ?? 1)),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Кошик порожній</h2>
        <Link to="/">← Повернутися до товарів</Link>
      </div>
    )
  }

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <h2>Ваш кошик</h2>
        <Link to="/" className="back-link">← Продовжити покупки</Link>
      </div>

      <div className="cart-list">
        {cart.map(item => (
          <div key={item.id} className="cart-item-card">
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />
            )}

            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>

              <div className="quantity-control">
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>

              <p className="cart-item-total">
                Сума: ${(item.price * (item.quantity ?? 1)).toFixed(2)}
              </p>
            </div>

            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Всього: ${total.toFixed(2)}</h3>
        <div className="cart-actions">
          <button className="cart-clear" onClick={clearCart}>
            Очистити кошик
          </button>
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
}
