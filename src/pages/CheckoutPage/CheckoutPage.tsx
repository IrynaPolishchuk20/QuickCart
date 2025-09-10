import './CheckoutPage.scss';
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Button from "@mui/material/Button";
import OrderModal from "../../components/OrderModal/OrderModal";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  )

  const handleCheckout = () => {
    clearCart();      // очищаємо кошик
    setOpenModal(true); // відкриваємо модалку
  }

  const handleModalClose = () => {
    setOpenModal(false);
    navigate("/");      // перекидаємо на головну сторінку
  };


  return (
    <div className="checkout-container container">
      <h1 className="checkout-title">Оформлення замовлення</h1>

      {/* Список товарів */}
      <section className="checkout-cart">
        <h2 className="section-title">Ваші товари</h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Кошик порожній</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-image"
                  />
                )}

                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-detail">
                    Ціна: ${item.price.toFixed(2)} 
                  </p>
                  <p className="cart-item-detail">
                    Кількість: {item.quantity}
                  </p>
                </div>

                <p className="cart-item-total">
                   ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="cart-summary">
              <span>Разом:</span>
              <span> ${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </section>

      {/* Дані покупця */}
      <section className="checkout-form">
        <h2 className="section-title">Дані покупця</h2>
        <form className="form-grid">
          <input type="text" placeholder="Ім’я" />
          <input type="text" placeholder="Прізвище" />
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Телефон" />
          <input type="text" placeholder="Місто" />
          <input type="text" placeholder="Поштовий індекс" />
          <input type="text" placeholder="Адреса Нової Пошти" />
        </form>
      </section>

      {/* Оплата */}
      <section className="checkout-payment">
        <h2 className="section-title">Спосіб оплати</h2>
        <div className="payment-options">
          <label>
            <input type="radio" name="payment" defaultChecked /> Готівка при
            отриманні
          </label>
          <label>
            <input type="radio" name="payment" /> Картка онлайн
          </label>
        </div>
      </section>

      {/* Підсумок */}
      <section className="checkout-summary">
        <div className="summary-total">
          <span>Загальна сума:</span>
          <span> ${total.toFixed(2)} </span>
        </div>

        <Button  
          variant="contained" 
          onClick={handleCheckout}
           sx={{
            backgroundColor: "#28a745",      
            color: "#fff",                   
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            textTransform: "capitalize",      
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", 
            transition: "background-color 0.3s ease, transform 0.2s ease",
            '&:hover': {
              backgroundColor: "#218838",   
              transform: "translateY(-2px)", 
            },
            '@media (max-width:768px)': {
              width: "100%",               
              fontSize: "14px", 
            }
          }}
        >
          Підтвердити замовлення
        </Button>
      </section>

      <OrderModal
        open={openModal}
        onClose={handleModalClose} 
      />
    </div>
  )
}
