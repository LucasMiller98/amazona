import axios from 'axios'
import { bool, object } from 'prop-types'
import { useEffect, useReducer } from 'react'
import { Badge, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'

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

reducer.propTypes = {
  loading: bool
}

export function ProductScreen() {
  const params = useParams()
  const { slug } = params

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: ''
  })
  
  // const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try{
        const result = await axios.get(`/api/products/slug/${slug}`)

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      }catch(error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
        
      }
      // setProducts(result.data)
    }

    fetchData()
  }, [slug])
  
  return loading ? (
    <div>Loading...</div>
  ): error ? (
    <div>{ error }</div>
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
              <h1>{ product.name }</h1>
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
                      ${product.countInStock > 0 ? (
                        <Badge bg="success">Product in Stock</Badge>
                      ):(
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      ${product.countInStock > 0 ? (
                        <Badge bg="success">Product in Stock</Badge>
                      ):(
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

ProductScreen.propTypes = {
  product: object
}