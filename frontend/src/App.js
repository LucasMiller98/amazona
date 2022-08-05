import { data } from './data';
import { object } from 'prop-types'

function App() {

  const { products } = data
  
  return (
    <div className="App">
      <header className="App-header">
        <a href='/'>amazona</a>
      </header>

      <main>
        <h1>Featured Products</h1>

        <div className='products'>
          { products.map(product => (
              <div className='product' key={product.slug}>
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                
                <div className='product-info'>
                  <a href={`/product/${product.slug}`}>
                    <p>{ product.name }</p>
                  </a>
                  
                  <p><strong>{ product.price }</strong></p>

                  <button type='button'>Add to cart</button>
                </div>
              </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;

App.propTypes = {
  data: object
}