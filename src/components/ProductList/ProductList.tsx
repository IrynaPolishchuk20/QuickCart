import './ProductList.scss'; 

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }:  ProductListProps) {
  return (
    <main className='app-container container'>
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
    </main>
  )
}

