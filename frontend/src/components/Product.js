import { object } from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Rating } from './Rating'

export function Product(props) {

  const { product } = props
  console.log(product)

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{ product.name }</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />
        
        <Card.Text>${ product.price }</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  )
  
}

Product.propTypes = {
  product: object
}