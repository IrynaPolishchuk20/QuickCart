import { useState, useEffect } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    < >
        <main className="app-container">
          <div className="products-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                <p className="product-rating">
                  Rating: {product.rating}
                </p>
                <div>
                  <button className="buy">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </main>
    </>
  )
}

export default App;