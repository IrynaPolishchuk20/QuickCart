import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import CategoriesList from './pages/CategoriesList/CategoriesList'
import CategoriesProduct from './pages/CategoriesProduct/CategoriesProduct'
import Layout from './layout/Layout'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'

function App() {
  return (
    <CartProvider>
      <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<Home/>} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/:categoryName" element={<CategoriesProduct />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="checkout" element={<CheckoutPage/>} />
          </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </SearchProvider>
    </CartProvider>
  )
}

export default App;