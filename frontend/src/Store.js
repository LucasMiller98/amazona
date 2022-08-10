import { createContext } from 'react'
import { useReducer } from 'react'

export const Store = createContext()

const initialState = {
  cart: {
    cartItem: [],
  }
}

function reducer(state, action) {
  switch(action.type) {
    case 'CART_ADD_ITEM':
      return { 
        ...state, 
        cart: {
          ...state.cart, 
          cartItem: [...state.cart.cartItem, action.payload]
        } 
      }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const { children } = props

  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <Store.Provider value={
      value
    }>
      { children }
    </Store.Provider>
  )
}