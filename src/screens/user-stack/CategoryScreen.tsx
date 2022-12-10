import type { CategoryScreenProps } from '../../../App';

import { View, SafeAreaView, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../../components/Text';
import BackButton from '../../components/BackButton';
import TaskCard from '../../components/TaskCard';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectCategoryById } from '../../redux/slices/categoriesSlice';
import { selectByCategory, selectCompletedCategoryTasks, Task } from '../../redux/slices/tasksSlice';

const CategoryScreen = ({
    route: {
        params: { id },
    },
}: CategoryScreenProps) => {
    const category = useSelector((state: any) => selectCategoryById(state, id));
    const categoryTasks: Task[] = useSelector((state: any) => selectByCategory(state, id));
    const completedCategoryTasks: Task[] = useSelector((state: any) => selectCompletedCategoryTasks(state, id));
    const [viewWidth, setViewWidth] = useState(0);
    const progress = useSharedValue(0);

    if (!category) return null;

    const { category: name, color } = category;

    const renderFunction = ({ item }: { item: Task }) => <TaskCard {...item} checkboxColor={color.color} />;

    const progressAnim = useAnimatedStyle(
        () => ({
            width: withTiming(progress.value, { duration: 500 }),
        }),
        []
    );

    useEffect(() => {
        progress.value = (completedCategoryTasks.length / categoryTasks.length) * viewWidth;
    }, [completedCategoryTasks, categoryTasks, viewWidth]);

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <FlatList
                data={categoryTasks}
                renderItem={renderFunction}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View
                        className="px-6 pt-16 pb-6 mb-12"
                        style={{
                            backgroundColor: color.color,
                        }}
                    >
                        <BackButton color={color.backgroundColor} />
                        <View className="mt-8">
                            <Text
                                twStyle="uppercase"
                                bold
                                style={{
                                    letterSpacing: 2,
                                    color: color.backgroundColor,
                                }}
                            >
                                {categoryTasks.length} {categoryTasks.length === 1 ? 'task' : 'tasks'} for
                            </Text>
                            <Text twStyle="text-3xl mt-2 text-white" bold>
                                {name}
                            </Text>
                            <View
                                onLayout={e => setViewWidth(e.nativeEvent.layout.width)}
                                className="mt-2 rounded-full h-1 overflow-hidden"
                            >
                                <Animated.View className="h-1 flex-1 bg-white" style={progressAnim}></Animated.View>
                            </View>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center pt-16">
                        <Image
                            source={require('../../../assets/complete-tasks.png')}
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
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default CategoryScreen;
