import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Pressable from './Pressable';
import Text from './Text';
import { XMarkIcon } from 'react-native-heroicons/outline';

import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { useNavigation } from '@react-navigation/native';
import { selectCategoryById } from '../redux/slices/categoriesSlice';
import { memo } from 'react';

interface LabelProps {
    id: string;
    taskId: string;
}

const Label: FunctionComponent<LabelProps> = ({ id, taskId }) => {
    const category = useSelector((state: any) => selectCategoryById(state, id));
    const navigation = useNavigation();
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
        <Pressable
            onPress={() => navigation.navigate('CategoryScreen', { id })}
            twStyle="flex-row items-center mb-2 px-2 py-1 rounded-md mr-2"
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
        </Pressable>
    );
};

export default memo(Label);
