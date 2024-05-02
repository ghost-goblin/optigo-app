import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    name: null,
    description: null,
    moneyFormat: null
  },
  reducers: {
    addshopname: (state, action) => {
      state.name = action.payload
    },
    addmoneyformat: (state, action) => {
      state.money = action.payload
    },
  },
})


export const { addshopname, addmoneyformat } = shopSlice.actions

export default shopSlice.reducer