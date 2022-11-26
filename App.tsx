import 'react-native-get-random-values';
import type { DateData } from 'react-native-calendars';

import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import NewTaskScreen from './src/screens/NewTaskScreen';
import TaskScreen from './src/screens/TaskScreen';
import AddCategoryScreen from './src/screens/AddCategoryScreen';
import AddDateScreen from './src/screens/AddDateScreen';
import { Provider } from 'react-redux';

import {
    createStackNavigator,
    CardStyleInterpolators,
    TransitionSpecs,
    StackScreenProps,
} from '@react-navigation/stack';
import store from './src/redux/store';
import { useEffect } from 'react';

type RootStackParamList = {
    HomeScreen: undefined;
    NewTaskScreen: { selectedCategories: string[]; selectedDay: DateData };
    TaskScreen: { id: string };
    AddCategoryScreen: { selectedCategories: string[] };
    AddDateScreen: { prevSelectedDay: DateData };
};

export type TaskScreenProps = StackScreenProps<RootStackParamList, 'TaskScreen'>;
export type NewTaskScreenProps = StackScreenProps<RootStackParamList, 'NewTaskScreen'>;
export type AddCategoryScreenProps = StackScreenProps<RootStackParamList, 'AddCategoryScreen'>;
export type AddDateScreenProps = StackScreenProps<RootStackParamList, 'AddDateScreen'>;

export default function App() {
    const Stack = createStackNavigator<RootStackParamList>();

    useEffect(() => {
        setBackgroundColorAsync('#F9FAFF');
        setButtonStyleAsync('dark');
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="NewTaskScreen"
                        component={NewTaskScreen}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                            gestureDirection: 'vertical',
                            gestureEnabled: true,
                            headerShown: false,
                            transitionSpec: {
                                open: TransitionSpecs.TransitionIOSSpec,
                                close: TransitionSpecs.TransitionIOSSpec,
                            },
                        }}
                        initialParams={{ selectedCategories: [] }}
                    />
                    <Stack.Screen
                        name="TaskScreen"
                        component={TaskScreen}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            gestureDirection: 'horizontal',
                            gestureEnabled: true,
                            headerShown: false,
                            transitionSpec: {
                                open: TransitionSpecs.TransitionIOSSpec,
                                close: TransitionSpecs.TransitionIOSSpec,
                            },
                        }}
                    />
                    <Stack.Screen
                        name="AddCategoryScreen"
                        component={AddCategoryScreen}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                            gestureDirection: 'vertical',
                            gestureEnabled: true,
                            headerShown: false,
                            transitionSpec: {
                                open: TransitionSpecs.TransitionIOSSpec,
                                close: TransitionSpecs.TransitionIOSSpec,
                            },
                        }}
                    />
                    <Stack.Screen
                        name="AddDateScreen"
                        component={AddDateScreen}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                            gestureDirection: 'vertical',
                            gestureEnabled: true,
                            headerShown: false,
                            transitionSpec: {
                                open: TransitionSpecs.TransitionIOSSpec,
                                close: TransitionSpecs.TransitionIOSSpec,
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </Provider>
    );
}
