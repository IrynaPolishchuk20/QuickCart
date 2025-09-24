import { NavLink, Link } from 'react-router-dom'
import './Header.scss'
import { useCart } from '../../context/CartContext';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

export default function Header() {
  const { cart } = useCart()
  const { query, setQuery } = useContext(SearchContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Тогглер */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>

          {/* Бренд */}
        </button>
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ QuickCart
        </Link>


        {/* Меню (колапс) */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                Головна
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Каталог
              </NavLink>
            </li>
          </ul>

          <form className="d-flex me-3" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Пошук..."
              aria-label="Пошук"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Кошик завжди видимий */}
        <Link to="/cart" className="btn btn-warning cart-btn">
          🛒 ({cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0)})
        </Link>
      </div>
    </nav>
  )
}
