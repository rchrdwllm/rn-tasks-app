import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Text from './Text';

import { useSelector } from 'react-redux';
import { selectCategory } from '../redux/slices/categoriesSlice';

interface LabelProps {
    id: string;
}

const Label: FunctionComponent<LabelProps> = ({ id }) => {
    const category = useSelector((state: any) => selectCategory(state, id));

    if (!category) return null;

    const { name, backgroundColor, textColor } = category;

    return (
        <View className={`px-2 py-1 rounded-md bg-blue-100 mr-2 ${backgroundColor}`}>
            <Text twStyle={`${textColor} text-blue-600`}>{name}</Text>
        </View>
    );
};

export default Label;
