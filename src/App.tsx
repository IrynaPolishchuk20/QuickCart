import { useState, useEffect } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header'
import Pagination from './components/Pagination/Pagination'
import ProductList from './components/ProductList/ProductList'


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const totalPages = Math.ceil(products.length / productsPerPage)

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=300')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data.products)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    };

    fetchProducts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Header />
      <ProductList products={currentProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  )
}

export default App;