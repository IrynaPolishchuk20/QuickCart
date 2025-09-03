import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import CategoriesList from './pages/CategoriesList/CategoriesList'
import Layout from './layout/layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}> 
        <Route index element={<Home/>} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;