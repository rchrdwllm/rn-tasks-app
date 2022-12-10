import 'react-native-get-random-values';
import type { DateData } from 'react-native-calendars';
import type { Color } from './src/constants/colors';
import type { StackScreenProps } from '@react-navigation/stack';

import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { Provider } from 'react-redux';
import RootNavigation from './src/screens/RootNavigation';

import store from './src/redux/store';
import { useEffect } from 'react';

export type RootStackParamList = {
    HomeScreen: undefined;
    NewTaskScreen: { selectedCategories: string[]; selectedDay: DateData };
    TaskScreen: { id: string };
    AddCategoryScreen: { selectedCategories: string[]; selectedDay: DateData };
    AddDateScreen: { prevSelectedDay: DateData; selectedCategories: [] };
    EditDateScreen: {
        id: string;
        title: string;
        description: string;
        categories: string[];
        selectedDay: DateData;
        subtasks: { subtask: string; id: string }[];
    };
    EditCategoryScreen: { currentCategories: string[]; id: string };
    CategoryScreen: { id: string };
    CategoriesScreen: undefined;
    NewCategoryScreen: { selectedColor: Color };
    SelectCategoryColorScreen: undefined;
    WelcomeScreen: undefined;
    SignUpScreen: undefined;
    SetNameScreen: undefined;
};

export type TaskScreenProps = StackScreenProps<RootStackParamList, 'TaskScreen'>;
export type NewTaskScreenProps = StackScreenProps<RootStackParamList, 'NewTaskScreen'>;
export type AddCategoryScreenProps = StackScreenProps<RootStackParamList, 'AddCategoryScreen'>;
export type AddDateScreenProps = StackScreenProps<RootStackParamList, 'AddDateScreen'>;
export type EditDateScreenProps = StackScreenProps<RootStackParamList, 'EditDateScreen'>;
export type EditCategoryScreenProps = StackScreenProps<RootStackParamList, 'EditCategoryScreen'>;
export type CategoryScreenProps = StackScreenProps<RootStackParamList, 'CategoryScreen'>;
export type NewCategoryScreenProps = StackScreenProps<RootStackParamList, 'NewCategoryScreen'>;

export default function App() {
    useEffect(() => {
        setBackgroundColorAsync('#F9FAFF');
        setButtonStyleAsync('dark');
    }, []);

    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    );
}
