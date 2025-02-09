import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isLoading: false,
    productList: []
}


export const fetchFilterProducts = createAsyncThunk('/products/fetchFilterProducts', async () => {
    const result = await axios.get('http://localhost:5000/api/shop/products/get')
    return result?.data
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilterProducts.pending, (state, action) => {
            state.isLoading = true

        }).addCase(fetchFilterProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.data

        }).addCase(fetchFilterProducts.rejected, (state,action)=>{
            state.isLoading = false
            state.productList = []
        })
    }
})

export default shoppingProductSlice.reducer