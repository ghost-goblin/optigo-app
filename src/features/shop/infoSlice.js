import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    value: null,
    description: null,
  },
  reducers: {
    addshopname: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { addshopname } = shopSlice.actions

export default shopSlice.reducer