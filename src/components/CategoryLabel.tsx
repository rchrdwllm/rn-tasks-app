import type { FunctionComponent } from 'react';

import { View, Pressable } from 'react-native';
import Text from './Text';
import { XMarkIcon } from 'react-native-heroicons/outline';

import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { selectCategoryById } from '../redux/slices/categoriesSlice';

interface LabelProps {
    id: string;
    taskId: string;
}

const Label: FunctionComponent<LabelProps> = ({ id, taskId }) => {
    const category = useSelector((state: any) => selectCategoryById(state, id));
    const { removeTaskCategory } = useActions();

    if (!category) return null;

    const {
        category: name,
        color: { backgroundColor, textColor },
    } = category;

    const handleRemoveCategory = () => {
        removeTaskCategory({ taskId, categoryId: id });
    };

    return (
        <View
            className="flex-row items-center mb-2 px-2 py-1 rounded-md mr-2"
            style={{
                backgroundColor,
            }}
        >
            <Text
                style={{
                    color: textColor,
                }}
            >
                {name}
            </Text>
            <Pressable onPress={handleRemoveCategory} className="ml-1">
                <XMarkIcon size={16} color={textColor} />
            </Pressable>
        </View>
    );
};

export default Label;
