import type { FunctionComponent } from 'react';

import Text from './Text';
import Pressable from './Pressable';
import { Checkbox } from 'react-native-paper';

import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useActions } from '../hooks/useActions';

interface TaskCardProps {
    title: string;
    description?: string;
    id: string;
    completed: boolean;
}

const TaskCard: FunctionComponent<TaskCardProps> = ({ title, id, completed }) => {
    const [checked, setChecked] = useState(completed);
    const navigation = useNavigation();
    const { checkTask, uncheckTask } = useActions();

    useEffect(() => {
        if (checked) {
            checkTask({ taskId: id });
        } else {
            uncheckTask({ taskId: id });
        }
    }, [checked]);

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
                status={checked ? 'checked' : 'unchecked'}
                color="rgb(59, 130, 246)"
                onPress={() => setChecked(!checked)}
            />
            <Text twStyle="text-lg ml-2">{title}</Text>
        </Pressable>
    );
};

export default TaskCard;
