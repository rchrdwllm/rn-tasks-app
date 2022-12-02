import type { Color } from '../../screens/SelectCategoryColorScreen';

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
    },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;

const categoriesSelectors = categoriesAdapter.getSelectors((state: any) => state.categories);

export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectEntities: selectCategoryEntities,
    selectIds: selectCategoryIds,
    selectTotal: selectTotalCategories,
} = categoriesSelectors;

export default categoriesSlice.reducer;
