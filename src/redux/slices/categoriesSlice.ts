import type { Color } from '../../constants/colors';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export interface Category {
    category: string;
    id: string;
    color: Color;
    belongsToUser: string;
}

const categoriesAdapter = createEntityAdapter<Category>();

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState({
        loading: false,
    }),
    reducers: {
        addCategory: categoriesAdapter.addOne,
        removeCategory: categoriesAdapter.removeOne,
        editCategory: categoriesAdapter.updateOne,
        categoriesReceived(state, action) {
            categoriesAdapter.setAll(state, action.payload);
        },
        setCategoriesLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { addCategory, removeCategory, editCategory, categoriesReceived, setCategoriesLoading } =
    categoriesSlice.actions;

const categoriesSelectors = categoriesAdapter.getSelectors((state: any) => state.categories);

export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectEntities: selectCategoryEntities,
    selectIds: selectCategoryIds,
    selectTotal: selectTotalCategories,
} = categoriesSelectors;
export const selectCategoriesLoading = (state: any) => state.categories.loading as boolean;

export default categoriesSlice.reducer;
