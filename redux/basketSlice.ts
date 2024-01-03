import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface basketState {
  items: Product[],
}

const initialState: basketState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state: basketState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state: basketState, action: PayloadAction<{ id: string }>) => {
      const index = state.items.findIndex((items: Product) => items._id === action.payload.id)
      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      }
      else {
        console.log(`Can't remove Product (id: ${action.payload.id} as its not in basket!`)
      }
      state.items = newBasket
    } 
  
  }
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectedBasketItems = (state: RootState) => state.basket.items
export const selectedBasketItemsWithId = (state: RootState, id:string) => {
  state.basket.items.filter((item: Product) => item._id === id)
}
export const selectedBasketTotal = (state: RootState) => {
  state.basket.items.reduce(
    (total: number, item: Product) => (total += item.price),0
  )
    
}

export default basketSlice.reducer