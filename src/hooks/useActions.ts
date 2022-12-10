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
} from '../redux/slices/tasksSlice';
import { addCategory, removeCategory, editCategory } from '../redux/slices/categoriesSlice';
import { useDispatch } from 'react-redux';

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(
        {
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
            removeTaskCategory,
            editCategory,
        },
        dispatch
    );
};
