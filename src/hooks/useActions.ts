import { bindActionCreators } from '@reduxjs/toolkit';
import {
    addTask,
    removeTask,
    addTaskCategory,
    checkSubtask,
    uncheckSubtask,
    checkTask,
    uncheckTask,
} from '../redux/slices/tasksSlice';
import { addCategory, removeCategory, addToCategory, removeFromCategory } from '../redux/slices/categoriesSlice';
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
            addToCategory,
            removeFromCategory,
        },
        dispatch
    );
};
