import type { Task } from '../redux/slices/tasksSlice';

import { View, Platform, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import Text from '../components/Text';
import Categories from '../components/Categories';
import { FlatList } from 'react-native';
import TaskCard from '../components/TaskCard';
import AddTaskButton from '../components/AddTaskButton';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Drawer from '../components/Drawer';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectTasks } from '../redux/slices/tasksSlice';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const tasks = useSelector(selectTasks);
    const [shouldOpen, setShouldOpen] = useState(false);
    const scale = useSharedValue(1);
    const borderRadius = useSharedValue(0);
    const xValue = useSharedValue(0);
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const drawerAnim = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withTiming(scale.value, {
                        duration: 750,
                        easing: Easing.bezier(0.16, 1, 0.3, 1),
                    }),
                },
                {
                    translateX: withTiming(xValue.value, {
                        duration: 750,
                        easing: Easing.bezier(0.16, 1, 0.3, 1),
                    }),
                },
            ],
            borderRadius: withTiming(borderRadius.value, {
                duration: 750,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
        }),
        []
    );

    useEffect(() => {
        if (shouldOpen) {
            scale.value = 0.85;
            borderRadius.value = 48;
            xValue.value = width * 0.9;

            setBackgroundColorAsync('#1e3a8a');
            setButtonStyleAsync('light');
        } else {
            scale.value = 1;
            borderRadius.value = 0;
            xValue.value = 0;

            setBackgroundColorAsync('#F9FAFF');
            setButtonStyleAsync('dark');
        }
    }, [shouldOpen]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setTimeout(() => {
                setShouldOpen(false);
            }, 500);
        });

        return unsubscribe;
    }, [navigation]);

    const renderFunction = ({ item }: { item: Task }) => <TaskCard {...item} />;

    return (
        <SafeAreaView className="flex-1 bg-blue-900">
            <Drawer onPress={() => setShouldOpen(!shouldOpen)} shouldOpen={shouldOpen} />
            <Animated.View
                style={[
                    {
                        backgroundColor: '#F9FAFF',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        flex: 1,
                        elevation: 30,
                    },
                    drawerAnim,
                ]}
            >
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Header onPress={() => setShouldOpen(!shouldOpen)} />
                            <Categories />
                            <View className="mt-4">
                                <Text
                                    twStyle="uppercase text-slate-400 ml-6 mb-12"
                                    bold
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    Today's tasks
                                </Text>
                            </View>
                        </>
                    }
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={renderFunction}
                    contentContainerStyle={{
                        paddingTop: Platform.OS === 'android' ? 16 * 4 : 0,
                        paddingBottom: 24,
                    }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center">
                            <Image
                                source={require('../../assets/complete-tasks.png')}
                                style={{
                                    height: 200,
                                    width: 200,
                                    resizeMode: 'contain',
                                }}
                            />
                            <Text twStyle="mt-6 text-slate-400">Looks like there's nothing left to do. Awesome!</Text>
                        </View>
                    }
                />
            </Animated.View>
            <AddTaskButton shouldOpen={shouldOpen} />
            <StatusBar style={shouldOpen ? 'light' : 'dark'} />
        </SafeAreaView>
    );
};

export default HomeScreen;
