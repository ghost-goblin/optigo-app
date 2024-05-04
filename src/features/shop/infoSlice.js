import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    name: '',
    money: '£{{amount}}',
    description: '',
    slogan: '',
  },
  reducers: {
    addshopname: (state, action) => {
      state.name = action.payload
    },
    addmoneyformat: (state, action) => {
      state.money = action.payload
    },
    adddescription: (state, action) => {
      state.description = action.payload
    },
    addslogan: (state, action) => {
      state.slogan = action.payload
    },
  },
})


export const { addshopname, addmoneyformat, adddescription, addslogan } = shopSlice.actions

export default shopSlice.reducer