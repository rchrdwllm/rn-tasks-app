import type { Color } from '../../constants/colors';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export interface Category {
    category: string;
    id: string;
    color: Color;
}

const categoriesAdapter = createEntityAdapter<Category>({});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState(),
    reducers: {
        addCategory: categoriesAdapter.addOne,
        removeCategory: categoriesAdapter.removeOne,
        editCategory: categoriesAdapter.updateOne,
    },
});

export const { addCategory, removeCategory, editCategory } = categoriesSlice.actions;

const categoriesSelectors = categoriesAdapter.getSelectors((state: any) => state.categories);

export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectEntities: selectCategoryEntities,
    selectIds: selectCategoryIds,
    selectTotal: selectTotalCategories,
} = categoriesSelectors;

export default categoriesSlice.reducer;
