import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './api/productsApi'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { orderApi } from './api/orderApi'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'

export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware:(getDefautMiddleware) =>
        getDefautMiddleware().concat([productApi.middleware,
            authApi.middleware,
            userApi.middleware,
            orderApi.middleware,
        ]),
});