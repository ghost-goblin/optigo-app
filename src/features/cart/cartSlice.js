import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartid: null,
    totalitems: 0,
  },
  reducers: {
    addcartid: (state, action) => {
      state.cartid = action.payload
    },
    addcarttotalitem: (state, action) => {
      state.totalitems = action.payload
      },
  },
})


export const { addcartid, addcarttotalitem, addlineitems } = cartSlice.actions

export default cartSlice.reducer