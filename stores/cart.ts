import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@/lib/product'

export interface Cart {
  id: string
  product: Product
  quantity: number
  price: number
}

interface CartState {
  cart: Cart[]
  totalQuantity: number
  totalPrice: number
  showCartModal: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  decreaseItemQuantity: (product: Product) => void
  toggleCartModal: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalQuantity: 0,
      showCartModal: false,
      totalPrice: 0,
      addItem: (product) => set((state) => {
        if (isProductExist(product, state)) {
          const newCart = addExistingItem(product, state)
          return {
            ...state,
            cart: newCart,
            totalQuantity: state.totalQuantity += 1,
            totalPrice: calculateTotalPrice(newCart),
          }
        }
        return {
          ...state,
          cart: [
            {
              id: crypto.randomUUID(),
              quantity: 1,
              product,
              price: product.price,
            },
            ...state.cart,
          ],
          totalQuantity: state.totalQuantity += 1,
          totalPrice: state.totalPrice + product.price,
        }
      }),
      removeItem: (id) => set((state) => {
        const newCart = state.cart.filter((cartItem) => cartItem.id !== id)
        return {
          ...state,
          cart: newCart,
          totalQuantity: calculateTotalQuantity(newCart),
          totalPrice: calculateTotalPrice(newCart),
        }
      }),
      decreaseItemQuantity: (product) => set((state) => {
        const newCart = state.cart.map((cartItem) => {
          if (cartItem.product.id !== product.id) return cartItem
          return {
            ...cartItem,
            quantity: cartItem.quantity -= 1,
            price: cartItem.price - product.price,
          }
        })
        return {
          ...state,
          cart: newCart,
          totalQuantity: calculateTotalQuantity(newCart),
          totalPrice: calculateTotalPrice(newCart),
        }
      }),
      toggleCartModal: () => set((state) => ({
        ...state,
        showCartModal: !state.showCartModal
      })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

const addExistingItem = (product: Product, state: CartState) => 
  state.cart.map(cartItem => {
    if (cartItem.product.id !== product.id) return cartItem
    return {
      ...cartItem,
      quantity: cartItem.quantity += 1,
      price: cartItem.price + product.price,
    }
  })

const isProductExist = (product: Product, state: CartState) => 
  Boolean(state.cart.find(cartItem => cartItem.product.id === product.id))

const calculateTotalQuantity = (cart: Cart[]) => 
  cart.reduce((accumulator, cartItem) => 
    accumulator + cartItem.quantity
  , 0)

const calculateTotalPrice = (cart: Cart[]) => 
  cart.reduce((accumulator, cartItem) => 
    accumulator + cartItem.price
  , 0)
