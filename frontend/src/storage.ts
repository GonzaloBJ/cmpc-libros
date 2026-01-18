import { configureStore } from '@reduxjs/toolkit';
import { librosReducer } from './modules/libros/store/libros.slice';

export const store = configureStore({
    reducer: {
        libros: librosReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
