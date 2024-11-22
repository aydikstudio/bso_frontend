import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../axios';
import admininstance from '../../axios';
import { json } from 'stream/consumers';




export const fetchAuth = createAsyncThunk('/auth/login', async (params: any) => {

    const { data }: any = await instance.post('/auth/local', {
        identifier: params.email,
        password: params.password,
    })
        .then(response => {
            localStorage.setItem('token', response.data.jwt)
            return response
        })
        .catch(error => {
            console.log('An error occurred:', error.response);
        });

    data.basket = []

    return data;
})



export const fetchRegister = createAsyncThunk('/auth/register', async (params: any) => {


    const { data }: any = await instance.post('/auth/local/register', {
        email: params.email,
        username: params.username,
        password: params.password,
    })
        .then(response => {
            localStorage.setItem('token', response.data.jwt)
            return response
        })
        .catch(error => {
            console.log('An error occurred:', error.response);
        });


    data.basket = []
    return data;
})

export const fetchAuthMe = createAsyncThunk('/users/me', async (params) => {

    const { data }: any = await admininstance.get('/users/me')
        .catch(error => {
            console.log('An error occurred:', error.response);
        });


    if (!data.basket) {
        data.basket = []
    }


    return data;
})



const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('token')
            window.location.replace("/")
        },

        addBasket: (state: any, action) => {
            state.data.basket = addValue(state, action);
        },
        deleteBasket: (state: any, action) => {
            state.data.basket = deleteValue(state, action);
        },

    },
    extraReducers: builder => {

        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {

                state.status = 'loaded';
                state.data = action.payload.user;
                window.location.replace("/")

            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = 'error';
                state.data = null;
            })

            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {

                state.status = 'loaded';
                state.data = action.payload.user;
                window.location.replace("/")

            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'error';
                state.data = null;
            })


    },

});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);


export const authReducer = authSlice.reducer;

export const { logout, addBasket, deleteBasket } = authSlice.actions;


function deleteValue(state: any, action: any) {
    let new_array = [...state.data.basket].filter((item) => item.title !== action.payload.title);
    updateBasket(state, new_array)
    return new_array;
}




function addValue(state: any, action: any) {

    let new_array = [...state.data.basket];
    Object.freeze(action.payload);
    new_array.push(action.payload);
    updateBasket(state, new_array)
    return new_array;
}


async function updateBasket(state: any, arr: any) {
    await admininstance.put('/users/' + state.data.id, {
        basket: JSON.stringify(arr)
    })
        .catch(error => {
            console.log('An error occurred:', error.response);
        });
}