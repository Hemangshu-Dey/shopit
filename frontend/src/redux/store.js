import {configureStore} from '@reduxjs/toolkit'
import { productApi } from './api/productsApi'

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware:(getDefautMiddleware) =>
        getDefautMiddleware().concat([productApi.middleware]),
});