import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    value: null,
  },
  reducers: {
    getshop: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { getshop } = shopSlice.actions

export default shopSlice.reducer