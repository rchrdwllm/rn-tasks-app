import type { DateData } from 'react-native-calendars';

import { createSlice } from '@reduxjs/toolkit';

interface Subtask {
    subtask: string;
    id: string;
    completed: boolean;
}

export interface Task {
    title: string;
    description: string;
    completed: boolean;
    subtasks: Subtask[];
    id: string;
    categories: string[];
    date: DateData;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        removeTask: (state, action) => {
            // console.log(action.payload.taskId);
            return state.filter(task => task.id !== action.payload.taskId);
        },
        editTask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                task.title = action.payload.title;
                task.description = action.payload.description;
                task.date = action.payload.date;
                task.categories = action.payload.categories;
            }
        },
        addTaskCategory: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                task.categories = [...task.categories, action.payload.categoryIds];
            }
        },
        checkSubtask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                const subtask = task.subtasks.find(subtask => subtask.id === action.payload.subtaskId);

                if (subtask) subtask.completed = true;
            }
        },
        uncheckSubtask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                const subtask = task.subtasks.find(subtask => subtask.id === action.payload.subtaskId);

                if (subtask) subtask.completed = false;
            }
        },
        removeSubtask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                const subtask = task.subtasks.find(subtask => subtask.id === action.payload.subtaskId);

                if (subtask) task.subtasks = task.subtasks.filter(subtask => subtask.id !== action.payload.subtaskId);
            }
        },
        editSubtask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                const subtask = task.subtasks.find(subtask => subtask.id === action.payload.subtaskId);

                if (subtask) subtask.subtask = action.payload.subtask;
            }
        },
        checkTask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                task.completed = true;
            }
        },
        uncheckTask: (state, action) => {
            const task = state.find(task => task.id === action.payload.taskId);

            if (task) {
                task.completed = false;
            }
        },
    },
});

export const {
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
} = tasksSlice.actions;
export const selectTasks = (state: any) => state.tasks;
export const selectTask = (state: any, id: string) => state.tasks.find((task: Task) => task.id === id);

export default tasksSlice.reducer;
