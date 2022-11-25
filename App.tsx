import 'react-native-get-random-values';

import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import NewTaskScreen from './src/screens/NewTaskScreen';
import TaskScreen from './src/screens/TaskScreen';
import AddCategoryScreen from './src/screens/AddCategoryScreen';
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
    NewTaskScreen: { selectedCategories: string[] };
    TaskScreen: { id: string };
    AddCategoryScreen: { selectedCategories: string[] };
};

export type TaskScreenProps = StackScreenProps<RootStackParamList, 'TaskScreen'>;
export type NewTaskScreenProps = StackScreenProps<RootStackParamList, 'NewTaskScreen'>;
export type AddCategoryScreenProps = StackScreenProps<RootStackParamList, 'AddCategoryScreen'>;

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
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </Provider>
    );
}
