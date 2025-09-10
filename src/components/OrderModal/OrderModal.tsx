import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const OrderModal: React.FC<OrderModalProps> = ({
  open,
  onClose,
  title = "Дякуємо за замовлення!",
  message = "Наш менеджер з вами зв'яжеться.",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="order-dialog-title"
      aria-describedby="order-dialog-description"
    >
      <DialogTitle id="order-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="order-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;