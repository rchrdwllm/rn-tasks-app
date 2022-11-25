import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export interface Category {
    name: string;
    category: string;
    id: string;
    color: string;
    backgroundColor: string;
    textColor: string;
    tasks: string[];
}

export const initialState: Category[] = [
    {
        name: 'School',
        category: 'school',
        color: 'bg-blue-400',
        backgroundColor: 'bg-pink-100',
        textColor: 'text-pink-600',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Work',
        category: 'work',
        color: 'bg-blue-400',
        backgroundColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Personal',
        category: 'personal',
        color: 'bg-blue-400',
        backgroundColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Shopping',
        category: 'shopping',
        color: 'bg-blue-400',
        backgroundColor: 'bg-teal-100',
        textColor: 'text-teal-600',
        id: v4(),
        tasks: [],
    },
];

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.push(action.payload);
        },
        removeCategory: (state, action) => {
            return state.filter(category => category.id !== action.payload.id);
        },
        addToCategory: (state, action) => {
            const category = state.find(category => category.id === action.payload.categoryId);

            if (category) {
                category.tasks.push(action.payload.taskId);
            }
        },
        removeFromCategory: (state, action) => {
            const category = state.find(category => category.id === action.payload.categoryId);

            if (category) {
                category.tasks = category.tasks.filter(task => task !== action.payload.taskId);
            }
        },
    },
});

export const { addCategory, removeCategory, addToCategory, removeFromCategory } = categoriesSlice.actions;
export const selectCategories = (state: any) => state.categories;
export const selectCategory = (state: any, id: string) =>
    state.categories.find((category: Category) => category.id === id);

export default categoriesSlice.reducer;
