// import { data } from '../data';
import { object, array } from 'prop-types'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

export function HomeScreen() {
  // const { products } = data

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products')
      setProducts(result.data)
    }

    fetchData()
  }, [])
  
  return (
    <div>
      <h1>Featured Products</h1>

      <div className='products'>
        { products.map(product => (
          <div className='product' key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            
            <div className='product-info'>
              <Link to={`/product/${product.slug}`}>
                <p>{ product.name }</p>
              </Link>
              
              <p><strong>${ product.price }</strong></p>

              <button type='button'>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


HomeScreen.propTypes = {
  data: object,
  product: array
}