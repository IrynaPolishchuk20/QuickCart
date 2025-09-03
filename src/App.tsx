import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import CategoriesList from './pages/CategoriesList/CategoriesList'
import CategoriesProduct from './pages/CategoriesProduct/CategoriesProduct'
import Layout from './layout/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home/>} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/:categoryName" element={<CategoriesProduct />} />

        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;