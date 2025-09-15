import './CheckoutPage.scss';
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Button from "@mui/material/Button";
import OrderModal from "../../components/OrderModal/OrderModal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from '../../validation/validation';
import type { CheckoutFormValues } from '../../validation/validation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: { payment: "cash" }
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  )

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Form data:", data);
    clearCart();
    setOpenModal(true);
  }

  const handleModalClose = () => {
    setOpenModal(false);
    navigate("/");      // перекидаємо на головну сторінку
  }

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
      <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <input 
            type="text" 
            placeholder="Ім’я" 
            {...register("firstName")} 
            className={errors.firstName ? "input error-input" : "input"}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName.message}</span>
          )}
        </div>

        <div className="form-field">
          <input 
            type="text" 
            placeholder="Прізвище" 
            {...register("lastName")} 
            className={errors.lastName ? "input error-input" : "input"}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName.message}</span>
          )}
        </div>

        <div className="form-field">
          <input 
            type="email" 
            placeholder="Email" 
            {...register("email")}
            className={errors.email ? "input error-input" : "input"} 
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-field">
          <input 
            type="tel" 
            placeholder="Телефон" 
            {...register("phone")} 
            className={errors.phone ? "input error-input" : "input"}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>

        <div className="form-field">
          <input 
            type="text" 
            placeholder="Місто" 
            {...register("city")} 
            className={errors.city ? "input error-input" : "input"}
          />
          {errors.city && (
            <span className="error-message">{errors.city.message}</span>
          )}
        </div>

        <div className="form-field">
          <input 
            type="text" 
            placeholder="Поштовий індекс" 
            {...register("postalCode")} 
            className={errors.postalCode ? "input error-input" : "input"}
          />
          {errors.postalCode && (
            <span className="error-message">{errors.postalCode.message}</span>
          )}
        </div>

        <div className="form-field">
          <input 
            type="text" 
            placeholder="Адреса Нової Пошти" 
            {...register("address")} 
            className={errors.address ? "input error-input" : "input"}
          />
          {errors.address && (
            <span className="error-message">{errors.address.message}</span>
          )}
        </div>

        <section className="checkout-payment">
          <h2 className="section-title">Спосіб оплати</h2>
          <div className="payment-options">
            <label>
              <input 
                type="radio" 
                value="cash" 
                {...register("payment")} 
              />
              Готівка при отриманні
            </label>
            <label>
              <input 
                type="radio" 
                value="card" 
                {...register("payment")} 
              />
              Картка онлайн
            </label>
          </div>
          {errors.payment && (
            <span className="error-message">{errors.payment.message}</span>
          )}
        </section>

        <section className="checkout-summary">
          <div className="summary-total">
            <span>Загальна сума:</span>
            <span> ${total.toFixed(2)} </span>
          </div>

          <Button
            variant="contained"
            type="submit"
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
      </form>

      <OrderModal
        open={openModal}
        onClose={handleModalClose} 
      />
    </div>
  )
}
