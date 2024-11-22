import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios';




export const fetchProduct = createAsyncThunk('/products', async () => {

    const { data } = await instance.get('/products?populate=%2A');


    return data.data;
})



const initialState = {
    data: null,
    status: 'loading'
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;

            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'error';
                state.data = null;
            })

    },

});


export const productReducer = productSlice.reducer;

