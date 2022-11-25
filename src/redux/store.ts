import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import categoriesSlice from './slices/categoriesSlice';

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        categories: categoriesSlice,
    },
});

export default store;
