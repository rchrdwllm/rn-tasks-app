import { bindActionCreators } from '@reduxjs/toolkit';
import {
    addTask,
    removeTask,
    addTaskCategory,
    checkSubtask,
    uncheckSubtask,
    checkTask,
    uncheckTask,
    removeSubtask,
    editTask,
    editSubtask,
    editCategories,
    removeTaskCategory,
    tasksReceived,
} from '../redux/slices/tasksSlice';
import {
    addCategory,
    removeCategory,
    editCategory,
    categoriesReceived,
    setCategoriesLoading,
} from '../redux/slices/categoriesSlice';
import { userAdded, userUpdated } from '../redux/slices/usersSlice';
import { useDispatch } from 'react-redux';

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(
        {
            tasksReceived,
            addTask,
            removeTask,
            addTaskCategory,
            checkSubtask,
            uncheckSubtask,
            checkTask,
            uncheckTask,
            addCategory,
            removeCategory,
            removeSubtask,
            editTask,
            editSubtask,
            editCategories,
            categoriesReceived,
            removeTaskCategory,
            editCategory,
            userAdded,
            userUpdated,
            setCategoriesLoading,
        },
        dispatch
    );
};
