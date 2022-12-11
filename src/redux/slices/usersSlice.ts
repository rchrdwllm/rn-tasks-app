import type { Task } from './tasksSlice';
import type { Category } from './categoriesSlice';

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export interface User {
    name: string;
    email: string | null;
    tasks: Task[];
    categories: Category[];
    id: string;
}

const usersAdapter = createEntityAdapter<User>();

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(),
    reducers: {
        userAdded: usersAdapter.addOne,
        userUpdated: usersAdapter.updateOne,
    },
});

export const { userAdded, userUpdated } = usersSlice.actions;

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectEntities: selectUserEntities,
    selectIds: selectUserIds,
    selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: any) => state.users);

export default usersSlice.reducer;
