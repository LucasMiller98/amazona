import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen  } from './pages/HomeScreen';
import { ProductScreen } from './pages/ProductScreen'
import { Container, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export function App() {

  
  return (
    <BrowserRouter>
    
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
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
