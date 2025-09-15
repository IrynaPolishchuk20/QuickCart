import './Home.scss'
import { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "../../components/Pagination/Pagination";
import { useCart } from "../../context/CartContext";
import type { Product as CartProduct } from "../../context/CartContext";
import { SearchContext } from '../../context/SearchContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
}

export default function Home() {
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const { query } = useContext(SearchContext)

  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  // Фільтрація продуктів за пошуком
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  )

  // Пагінація по відфільтрованих продуктах
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=300");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <main className='app-container container'>
        <div className='products-list'>
          {currentProducts.map(product => (
            <div key={product.id} className='product-card'>
              <img
                src={product.thumbnail}
                alt={product.title}
                className='product-image'
              />
              <h3 className='product-title'>{product.title}</h3>
              <p className='product-price'>Price: ${product.price.toFixed(2)}</p>
              <p className='product-rating'>⭐ {product.rating}</p>
              <div>
                <button
                  className='buy'
                  onClick={() => addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail
                  } as CartProduct)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
