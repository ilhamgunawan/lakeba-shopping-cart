import { create } from 'zustand'
import { Product } from '@/lib/product'

interface Cart {
  id: string
  product: Product
  quantity: number
}

interface CartState {
  cart: Cart[]
  totalQuantity: number
  showAddItemSuccessMessage: boolean
  addItem: (product: Product) => void
  hideSuccessMessage: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  cart: [],
  totalQuantity: 0,
  showAddItemSuccessMessage: false,
  addItem: (product) => set((state) => {
    if (isProductExist(product, state)) {
      return {
        ...state,
        cart: addExistingItem(product, state),
        totalQuantity: state.totalQuantity += 1,
        showAddItemSuccessMessage: true,
      }
    }
    return {
      ...state,
      cart: [
        ...state.cart,
        {
          id: crypto.randomUUID(),
          quantity: 1,
          product,
        },
      ],
      totalQuantity: state.totalQuantity += 1,
      showAddItemSuccessMessage: true,
    }
  }),
  hideSuccessMessage: () => set((state) => ({
    ...state,
    showAddItemSuccessMessage: false,
  })),
}))

const addExistingItem = (product: Product, state: CartState) => 
  state.cart.map(cartItem => {
    if (cartItem.product.id === product.id) {
      return {
        ...cartItem,
        quantity: cartItem.quantity += 1,
      }
    }
    return cartItem
  })

const isProductExist = (product: Product, state: CartState) => 
  Boolean(state.cart.find(cartItem => cartItem.product.id === product.id))

// function calculateTotalQuantity(cart: Cart[]) {
//   return cart.reduce((accumulator, cartItem) => 
//     accumulator + cartItem.quantity
//   , 0)
// }
