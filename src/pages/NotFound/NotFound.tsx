import './NotFound.scss'
import { Link } from "react-router-dom"


export default function NotFound(){
    
    return(
<div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-badge">404</div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Not Found Product"
          className="notfound-image"
        />

        <h2 className="notfound-title">Схоже, що ви заблукали.</h2>
        <p className="notfound-text">
          Сторінка, яку ви шукаєте, не існує або була переміщена.
        </p>

        <Link to="/" className="notfound-button">
          🛍️ Продовжити покупки
        </Link>
      </div>
    </div>
  );

}