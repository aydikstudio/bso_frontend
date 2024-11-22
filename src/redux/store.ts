import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './slices/product';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer
    }
})


export default store;
