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
        color: '#f472b6',
        backgroundColor: '#fce7f3',
        textColor: '#db2777',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Work',
        category: 'work',
        color: '#60a5fa',
        backgroundColor: '#dbeafe',
        textColor: '#4f46e5',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Personal',
        category: 'personal',
        color: '#e879f9',
        backgroundColor: '#f3e8ff',
        textColor: '#c026d3',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Shopping',
        category: 'shopping',
        color: '#2dd4bf',
        backgroundColor: '#ccfbf1',
        textColor: '#0d9488',
        id: v4(),
        tasks: [],
    },
    {
        name: 'Other',
        category: 'other',
        color: '#34d399',
        backgroundColor: '#dcfce7',
        textColor: '#059669',
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
