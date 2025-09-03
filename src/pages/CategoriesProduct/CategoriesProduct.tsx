import './CategoriesProduct.scss'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


interface Product {
    id: number;
    title: string;
    category: string;
    thumbnail: string; 
    price: number;      
    rating: number;
}

interface ProductsResponse {
  products: Product[];
}

export default function CategoriesProduct() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) return;

      try {
        const res = await fetch("https://dummyjson.com/products?limit=300");
        const data: ProductsResponse = await res.json();

        // Порівнюємо точні назви категорій з API
        const filtered = data.products.filter(p => p.category === categoryName);
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <div>Завантаження...</div>;

  return (
   <div className="category-page container">
        <div className="category-header">
        <h2>Товари категорії: {categoryName}</h2>
        <Link to="/categories" className="back-link">← Назад до категорій</Link>
        </div>

        {products.length === 0 ? (
        <p>Товари відсутні</p>
        ) : (
        <div className='products-list'>
            {products.map(product => (
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
                <button className='buy'>Buy</button>
                </div>
            </div>
            ))}
        </div>
        )}
  </div>
  );
}
