import type { FunctionComponent } from 'react';

import Text from './Text';
import Pressable from './Pressable';
import { Checkbox } from 'react-native-paper';

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
    const { checkTask, uncheckTask } = useActions();
    const task = useSelector((state: any) => selectTask(state, id));

    const { title, completed } = task;

    const handleCheckTask = () => {
        if (!completed) {
            checkTask({ taskId: id });
        } else {
            uncheckTask({ taskId: id });
        }
    };

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('TaskScreen', {
                    id,
                })
            }
            twStyle="flex-row items-center bg-white rounded-3xl p-5 mx-6 mt-2"
        >
            <Checkbox.Android
                status={completed ? 'checked' : 'unchecked'}
                color="rgb(59, 130, 246)"
                onPress={handleCheckTask}
            />
            <Text twStyle="text-lg ml-2">{title}</Text>
        </Pressable>
    );
};

export default TaskCard;
