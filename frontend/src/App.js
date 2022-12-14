import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen  } from './pages/HomeScreen';
import { ProductScreen } from './pages/ProductScreen'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';

export function App() {

  const { state } = useContext(Store)

  const { cart } = state
  
  return (
    <BrowserRouter>
    
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>

              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  { cart.cartItem.length > 0 && (
                    <Badge pill bg='danger'>
                      { cart.cartItem.reduce((a, c) => a + c.quantity, 0) }
                    </Badge>
                  ) }                  
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={ <ProductScreen/>} />
              <Route path='/' element={ <HomeScreen/> } />
            </Routes>
          </Container>

        </main>

        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
