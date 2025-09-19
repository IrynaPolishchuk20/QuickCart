import './ShowInfo.scss';
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  images: string[];
  brand: string;
  stock: number;
}

interface Review {
  id: number;
  user: { id: number; username: string };
  body: string;
  rating: number;
}

export default function ShowInfo() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        //  Завантажуємо продукт
        const productRes = await fetch(`https://dummyjson.com/products/${id}`)
        if (!productRes.ok) throw new Error(`Failed to fetch product: ${productRes.status}`)
        const productData = await productRes.json()
        setProduct(productData)

        //  Завантажуємо відгуки з /posts
        const postRes = await fetch("https://dummyjson.com/posts")
        const postData = await postRes.json()

        // Вибираємо випадкові «відгуки» для цього продукту
        const productReviews: Review[] = postData.posts
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map((post: any) => ({
            id: post.id,
            user: { id: post.userId, username: `User${post.userId}` },
            body: post.body,
            rating: Math.floor(Math.random() * 5) + 1, // Випадковий рейтинг від 1 до 5
          }));

        setReviews(productReviews);
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductAndReviews()
  }, [id])

  if (loading) return <div className="loading">Loading...</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <main className="product-container container">
        <div className="header-row">
            <Link to="/" className="back-link">← Назад до товарів</Link>
        </div>

      <h1 className="product-title">{product.title}</h1>
        <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="main-image" 
        />
            <div className="product-price">
                <b>Price:</b> ${product.price.toFixed(2)}
            </div>
            <div className="product-brand">
                {product.brand && <p><b>Brand:</b> {product.brand}</p>}
            </div>
            <div className="product-category">
                <b>Category:</b> {product.category}
            </div>
            <div className="product-rating">
                ⭐ {product.rating}
            </div>
            <div className="product-stock">
                <b>Stock:</b> {product.stock}
            </div>
            <div className="product-description">
                {product.description}
            </div>

            <button
                className="buy"
                onClick={() =>
                addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                })
                }
            >
                🛒 Buy
            </button>

      {/* 🔹 Відгуки */}
      <section className="reviews-section">
        <h2>Відгуки</h2>
        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-card">
                <p className="review-user">👤 {review.user.username}</p>
                <p className="review-body">{review.body}</p>
                <p className="review-rating">⭐ {review.rating}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </main>
  )
}
