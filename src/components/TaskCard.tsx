import { FunctionComponent, ReactNode, useRef } from 'react';

import { Animated, View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';
import { Checkbox } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { TrashIcon } from 'react-native-heroicons/outline';
import { Shadow } from 'react-native-shadow-2';

import { useNavigation } from '@react-navigation/native';
import { useActions } from '../hooks/useActions';
import { useSelector } from 'react-redux';
import { selectTask, Task } from '../redux/slices/tasksSlice';
import { Category, selectCategory } from '../redux/slices/categoriesSlice';

interface TaskCardProps {
    id: string;
    checkboxColor?: string;
}

const TaskCard: FunctionComponent<TaskCardProps> = ({ id, checkboxColor }) => {
    const navigation = useNavigation();
    const { checkTask, uncheckTask, removeTask } = useActions();
    const task: Task = useSelector((state: any) => selectTask(state, id));
    const swipeableRef = useRef<Swipeable>(null);

    const { title, completed, categories } = task;

    const category: Category = useSelector((state: any) => selectCategory(state, categories[0]));

    const handleCheckTask = () => {
        if (!completed) {
            checkTask({ taskId: id });
        } else {
            uncheckTask({ taskId: id });
        }
    };

    const handleDeleteTask = () => {
        if (swipeableRef.current) {
            swipeableRef.current.close();

            setTimeout(() => {
                removeTask({ taskId: id });
            }, 500);
        }
    };

    const rightSwipe = (_: any, dragX: any): ReactNode => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0.5, 0],
        });

        return (
            <Pressable onPress={handleDeleteTask} twStyle="flex-1 bg-red-500 mr-6 w-20 mt-2 rounded-3xl">
                <Animated.View
                    style={{
                        transform: [{ scale: scale }],
                    }}
                    className="flex-1 justify-center items-center"
                >
                    <TrashIcon size={24} color="white" />
                </Animated.View>
            </Pressable>
        );
    };

    return (
        <View className="-mt-8">
            <Pressable
                onPress={() =>
                    navigation.navigate('TaskScreen', {
                        id,
                    })
                }
            >
                <Shadow
                    containerStyle={{
                        marginBottom: 32,
                    }}
                    distance={10}
                    startColor={'#dbeafe24'}
                    endColor={'#ffffff00'}
                    offset={[0, 10]}
                    style={{
                        borderRadius: 20,
                    }}
                    stretch
                >
                    <Swipeable
                        ref={swipeableRef}
                        containerStyle={{
                            paddingHorizontal: 24,
                        }}
                        renderRightActions={rightSwipe}
                    >
                        <View className="flex-row items-center bg-white rounded-3xl p-5 mt-2">
                            <Checkbox.Android
                                status={completed ? 'checked' : 'unchecked'}
                                color={checkboxColor ? checkboxColor : category ? category.color : 'rgb(156, 163, 175)'}
                                onPress={handleCheckTask}
                                style={{
                                    borderRadius: 100,
                                }}
                            />
                            <Text twStyle="text-lg ml-2">{title}</Text>
                        </View>
                    </Swipeable>
                </Shadow>
            </Pressable>
        </View>
    );
};

export default TaskCard;
