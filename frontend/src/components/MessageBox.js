import { Alert } from 'react-bootstrap'
import { object } from 'prop-types'

export function MessageBox(props) {

  const { variant, children } = props

  return <Alert variant={variant || 'info'}>{ children }</Alert>
}

MessageBox.propTypes = {
  props: object
}