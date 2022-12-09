import type { FunctionComponent } from 'react';

import { View } from 'react-native';

import { useSelector } from 'react-redux';
import { selectCategoryById } from '../redux/slices/categoriesSlice';

interface CategoryIndicatorProps {
    id: string;
    index: number;
}

const CategoryIndicator: FunctionComponent<CategoryIndicatorProps> = ({ id, index }) => {
    const category = useSelector((state: any) => selectCategoryById(state, id));

    if (!category) return null;

    const { color } = category;

    return (
        <View
            className="rounded-full"
            style={{
                height: 20,
                width: 20,
                backgroundColor: color.color,
                marginLeft: index ? -10 : 0,
            }}
        ></View>
    );
};

export default CategoryIndicator;
