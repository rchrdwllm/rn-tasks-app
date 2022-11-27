import { FunctionComponent, ReactNode, useRef } from 'react';

import { Animated } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';
import { Checkbox } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { TrashIcon } from 'react-native-heroicons/outline';

import { useNavigation } from '@react-navigation/native';
import { useActions } from '../hooks/useActions';
import { useSelector } from 'react-redux';
import { selectTask } from '../redux/slices/tasksSlice';

interface TaskCardProps {
    id: string;
    completed: boolean;
}

const TaskCard: FunctionComponent<TaskCardProps> = ({ id }) => {
    const navigation = useNavigation();
    const { checkTask, uncheckTask, removeTask } = useActions();
    const task = useSelector((state: any) => selectTask(state, id));
    const swipeableRef = useRef<Swipeable>(null);

    const { title, completed } = task;

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
        <Swipeable
            ref={swipeableRef}
            containerStyle={{
                paddingHorizontal: 24,
            }}
            renderRightActions={rightSwipe}
        >
            <Pressable
                onPress={() =>
                    navigation.navigate('TaskScreen', {
                        id,
                    })
                }
                twStyle="flex-row items-center bg-white rounded-3xl p-5 mt-2"
            >
                <Checkbox.Android
                    status={completed ? 'checked' : 'unchecked'}
                    color="rgb(59, 130, 246)"
                    onPress={handleCheckTask}
                />
                <Text twStyle="text-lg ml-2">{title}</Text>
            </Pressable>
        </Swipeable>
    );
};

export default TaskCard;
