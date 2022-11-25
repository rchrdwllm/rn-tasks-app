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
            return state.filter(task => task.id !== action.payload.taskId);
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

export const { addTask, removeTask, addTaskCategory, checkSubtask, uncheckSubtask, checkTask, uncheckTask } =
    tasksSlice.actions;
export const selectTasks = (state: any) => state.tasks;
export const selectTask = (state: any, id: string) => state.tasks.find((task: Task) => task.id === id);

export default tasksSlice.reducer;
