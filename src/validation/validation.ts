import * as yup from "yup";

export const checkoutSchema = yup.object({
  firstName: yup.string().required("Введіть ім’я"),
  lastName: yup.string().required("Введіть прізвище"),
  email: yup.string().email("Некоректний email").required("Введіть email"),
  phone: yup.string()
        .matches(/^\+?\d{10,13}$/, "Некоректний телефон")
        .required("Введіть телефон"),
  city: yup.string().required("Вкажіть місто"),
  postalCode: yup.string()
              .matches(/^\d{4,6}$/, "Некоректний індекс")
              .required("Вкажіть поштовий індекс"),
  address: yup.string().required("Вкажіть адресу Нової Пошти"),
  payment: yup.string()
          .oneOf(["cash", "card"] as const, "Оберіть спосіб оплати")
          .required("Оберіть спосіб оплати"),
})

export type CheckoutFormValues = yup.InferType<typeof checkoutSchema>;
