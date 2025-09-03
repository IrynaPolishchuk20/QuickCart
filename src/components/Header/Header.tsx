import { NavLink, Link } from 'react-router-dom'
import './Header.scss'

export default function Header(){
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ QuickCart
        </Link>

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
        </button>

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

          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Пошук..."
              aria-label="Пошук"
            />
            <button className="btn btn-outline-light search" type="submit">
              Пошук
            </button>
          </form>

          <button className="btn btn-warning">
            🛒 Кошик (0)
          </button>
        </div>
      </div>
    </nav>
  )
}


