import axios from 'axios'
import { useEffect, useReducer } from 'react'
import { 
  Badge, 
  Button, 
  Card, 
  Col, 
  ListGroup, 
  ListGroupItem, 
  Row 
} from 'react-bootstrap'
import { useContext } from 'react'

import { Helmet } from 'react-helmet-async' 
import { useParams } from 'react-router-dom'
import { getError } from '../utils'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { Rating } from '../components/Rating'
import { Store } from '../Store'

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export function ProductScreen() {
  const params = useParams()
  const { slug } = params

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: ''
  })
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try{
        const result = await axios.get(`/api/products/slug/${slug}`)

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      }catch(error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
        
      }
    }

    fetchData()
  }, [slug])

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart } = state
  
  const addToCartHandler = async () => {
    const existItem = cart.cartItem.find((x) => x.id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if(data.countInStock < quantity) {
      alert('Sorry, product is out of stock')
      return
    }
    
    ctxDispatch({ 
      type: 'CART_ADD_ITEM', 
      payload: { ...product, quantity } 
    })
  }
  
  return loading ? (
    <LoadingBox />
  ): error ? (
    <MessageBox variant='danger'>{ error }</MessageBox>
  ): (
    <div>
      <Row>
        <Col md={6}>
          <img 
            className='img-large'
            src={product.image} 
            alt={product.name}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{ product.name }</title>
              </Helmet>
            </ListGroup.Item>
          </ListGroup>
          <Rating 
            rating={product.rating}
            numReviews={product.numReviews}
          />
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

          <ListGroup.Item>
            Description:
            <p>{ product.description }</p>
          </ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">in Stock</Badge>
                      ):(
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button onClick={addToCartHandler} variant='primary'>
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}