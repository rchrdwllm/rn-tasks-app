import type { RootStackParamList } from '../../../App';

import HomeScreen from './HomeScreen';
import NewTaskScreen from './NewTaskScreen';
import TaskScreen from './TaskScreen';
import AddCategoryScreen from './AddCategoryScreen';
import AddDateScreen from './AddDateScreen';
import EditDateScreen from './EditDateScreen';
import EditCategoryScreen from './EditCategoryScreen';
import CategoryScreen from './CategoryScreen';
import CategoriesScreen from './CategoriesScreen';
import NewCategoryScreen from './NewCategoryScreen';
import SelectCategoryColorScreen from './SelectCategoryColorScreen';
import SetNameScreen from './SetNameScreen';
import SetProfilePictureScreen from './SetProfilePictureScreen';

import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';

const UserStack = () => {
    const Stack = createStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SetNameScreen"
                component={SetNameScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SetProfilePictureScreen"
                component={SetProfilePictureScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
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
            <Stack.Screen
                name="EditDateScreen"
                component={EditDateScreen}
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
            <Stack.Screen
                name="EditCategoryScreen"
                component={EditCategoryScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: false,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
                }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
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
                name="CategoriesScreen"
                component={CategoriesScreen}
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
                name="NewCategoryScreen"
                component={NewCategoryScreen}
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
            <Stack.Screen
                name="SelectCategoryColorScreen"
                component={SelectCategoryColorScreen}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: false,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default UserStack;
