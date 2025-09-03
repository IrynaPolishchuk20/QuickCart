import './CategoriesList.scss'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  category: string;
  [key: string]: any;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=300")
        const data: ProductsResponse = await res.json()

        const uniqueCategories: string[] = Array.from(
          new Set(data.products.map((p) => p.category))
        );

        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Помилка при завантаженні продуктів:', err);
      } finally {
        setLoading(false)
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <div className="categories-container">
        <h2 className="categories-title">Категорії продуктів</h2>
        <div className="categories-grid">
            {categories.map((cat) => (
            <Link key={cat} to={`${cat}`} className="category-card">
              <div className="category-name">{cat}</div>
            </Link>
          ))}
        </div>
    </div>
  )
}