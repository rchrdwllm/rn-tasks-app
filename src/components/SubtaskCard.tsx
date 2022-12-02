import { FunctionComponent, useEffect, ReactNode, useRef } from 'react';

import Text from './Text';
import Pressable from './Pressable';
import { Checkbox } from 'react-native-paper';
import { Animated, View } from 'react-native';
import { TrashIcon } from 'react-native-heroicons/outline';
import { Swipeable } from 'react-native-gesture-handler';
import Input from './Input';
import { Shadow } from 'react-native-shadow-2';

import { useState, memo } from 'react';
import { useActions } from '../hooks/useActions';

interface SubtaskCardProps {
    id: string;
    subtask: string;
    completed: boolean;
    taskId: string;
}

const SubtaskCard: FunctionComponent<SubtaskCardProps> = ({ id, subtask, completed, taskId }) => {
    const [checked, setChecked] = useState(completed);
    const [newSubtask, setNewSubtask] = useState(subtask);
    const { checkSubtask, uncheckSubtask, removeSubtask, editSubtask } = useActions();
    const swipeableRef = useRef<Swipeable>(null);

    const handleCompleteSubtask = () => {
        setChecked(!checked);
    };

    const handleDeleteSubtask = () => {
        if (swipeableRef.current) {
            swipeableRef.current.close();

            setTimeout(() => {
                removeSubtask({ taskId, subtaskId: id });
            }, 500);
        }
    };

    const handleEditSubtask = () => {
        editSubtask({
            taskId,
            subtaskId: id,
            subtask: newSubtask,
        });
    };

    const rightSwipe = (_: any, dragX: any): ReactNode => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0.5, 0],
        });

        return (
            <Pressable onPress={handleDeleteSubtask} twStyle="flex-1 bg-red-500 w-20 mt-2 rounded-3xl">
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

    useEffect(() => {
        if (checked) {
            checkSubtask({ subtaskId: id, taskId });
        } else {
            uncheckSubtask({ subtaskId: id, taskId });
        }
    }, [checked]);

    useEffect(() => {
        handleEditSubtask();
    }, [newSubtask]);

    /*
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
                    */

    return (
        <View className="-mt-8">
            <Pressable onPress={handleCompleteSubtask}>
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
                    <Swipeable ref={swipeableRef} renderRightActions={rightSwipe}>
                        <View className="flex-row items-center bg-white rounded-3xl px-5 py-1 mt-2">
                            <Checkbox.Android
                                status={checked ? 'checked' : 'unchecked'}
                                color="rgb(59, 130, 246)"
                                onPress={handleCompleteSubtask}
                            />
                            <Input
                                value={newSubtask}
                                onChangeText={e => setNewSubtask(e)}
                                multiline
                                showUnderline={false}
                            />
                        </View>
                    </Swipeable>
                </Shadow>
            </Pressable>
        </View>
    );
};

export default memo(SubtaskCard);
