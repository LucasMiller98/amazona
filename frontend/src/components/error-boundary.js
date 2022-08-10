import { Component } from 'react'
import { object } from 'prop-types'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    message: ''
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }
  
  render() {
    const { hasError, message } = this.state
    const { children } = this.props
    
    if(hasError) {
      return <h1>Ocorreu o seguinte error: { message }</h1>
    }

    return children
  }
  
}

ErrorBoundary.propTypes = {
  state: object
}

export { ErrorBoundary }