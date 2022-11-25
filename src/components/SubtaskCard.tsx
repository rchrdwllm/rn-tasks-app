import { FunctionComponent, useEffect } from 'react';

import Text from './Text';
import Pressable from './Pressable';
import { Checkbox } from 'react-native-paper';

import { useState } from 'react';
import { useActions } from '../hooks/useActions';

interface SubtaskCardProps {
    id: string;
    subtask: string;
    completed: boolean;
    taskId: string;
}

const SubtaskCard: FunctionComponent<SubtaskCardProps> = ({ id, subtask, completed, taskId }) => {
    const [checked, setChecked] = useState(completed);
    const { checkSubtask, uncheckSubtask } = useActions();

    const handleCompleteSubtask = () => {
        setChecked(!checked);
    };

    useEffect(() => {
        if (checked) {
            checkSubtask({ subtaskId: id, taskId });
        } else {
            uncheckSubtask({ subtaskId: id, taskId });
        }
    }, [checked]);

    return (
        <Pressable onPress={handleCompleteSubtask} twStyle="flex-row items-center bg-white rounded-3xl px-5 py-3 mt-2">
            <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                color="rgb(59, 130, 246)"
                onPress={handleCompleteSubtask}
            />
            <Text twStyle="ml-2">{subtask}</Text>
        </Pressable>
    );
};

export default SubtaskCard;
