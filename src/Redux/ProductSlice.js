// import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// let initialState={
//     brands:[],
//     categories[],
// }
// export let getBrands = createAsyncThunk(
//     "product/getBrands",
//    async function(){
//     let {data}=  await  axios.get("https://ecommerce.routemisr.com/api/v1/brands");
//     return data
//     },
//     "product/getCategories",
//    async function(){
//     let {data}=  await  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
//     return data
//     },
// )

// let productSlice = createSlice(
//     {
//         name:"product",
//         initialState,
//         reducers:{
//             increament:(state)=>{
//              state.counter ++;

//             },
//             decreament:(state)=>{
//                 state.counter--;
//             },
//             increamentByValue:(state, action)=>{
//                 state.counter += action.payload;
//                 // console.log(action);
//             },
//         },
//         extraReducers:(builder)=>{
//             builder.addCase(getBrands.fulfilled , (state, action)=>{
//               state.brands = action.payload
//             }
//         )
//         }
           
//     }
// )
// // export let {increament ,decreament,increamentByValue }= productSlice.actions;
// export let productReducer = productSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  brands: [],
  categories: [],
  counter: 0,
};

export const getBrands = createAsyncThunk(
  "product/getBrands",
  async function () {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return data;
  }
);

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async function () {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return data;
  }
);

let productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    incrementByValue: (state, action) => {
      state.counter += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { increment, decrement, incrementByValue } = productSlice.actions;
export const productReducer = productSlice.reducer;
