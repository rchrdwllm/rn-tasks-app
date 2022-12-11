import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import categoriesSlice from './slices/categoriesSlice';
import usersSlice from './slices/usersSlice';

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        categories: categoriesSlice,
        users: usersSlice,
    },
});

export default store;
