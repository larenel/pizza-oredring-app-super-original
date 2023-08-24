import { createSlice } from '@reduxjs/toolkit'

const initialState = { cart: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const alreadyInCart = state.cart.find(
        (el) => el.pizzaId === action.payload.pizzaId
      )

      if (alreadyInCart) {
        alreadyInCart.quantity++
        alreadyInCart.totalPrice =
          alreadyInCart.quantity * alreadyInCart.unitPrice
      } else {
        state.cart.push(action.payload)
      }
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload
      )
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload)

      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action)
      }
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((acc, el) => acc + el.totalPrice, 0)

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((acc, el) => acc + el.quantity, 0)

export const getCart = (store) => store.cart.cart

export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((el) => el.pizzaId === id)?.quantity ?? 0
