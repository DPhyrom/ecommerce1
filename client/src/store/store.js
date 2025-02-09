import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductSlice from './admin/product-slice' 
import shoppingProducts from './shop/products-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shoppingProducts
    },
})

export default store;