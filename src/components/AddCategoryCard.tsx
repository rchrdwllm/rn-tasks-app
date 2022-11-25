import type { FunctionComponent } from 'react';
import type { Category } from '../redux/slices/categoriesSlice';

import Pressable from './Pressable';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from './Text';

import { useState, useEffect } from 'react';

interface AddCategoryCardProps extends Category {
    setSelectedCategories: any;
    savedCategories: string[];
}

const AddCategoryCard: FunctionComponent<AddCategoryCardProps> = ({
    name,
    color,
    id,
    savedCategories,
    setSelectedCategories,
}) => {
    const [selected, setSelected] = useState(savedCategories.includes(id));

    const handlePress = () => {
        setSelected(!selected);
    };

    useEffect(() => {
        if (selected) {
            setSelectedCategories((prev: string[]) => [...prev, id]);
        } else {
            setSelectedCategories((prev: string[]) => prev.filter((item: string) => item !== id));
        }
    }, [selected]);

    useEffect(() => {
        if (savedCategories) setSelectedCategories(savedCategories);
    }, [savedCategories]);

    return (
        <Pressable onPress={handlePress}>
            <View className="flex-row items-center bg-white rounded-2xl mt-2 py-4 px-6 pl-4">
                <Checkbox status={selected ? 'checked' : 'unchecked'} color="rgb(59, 130, 246)" />
                <Text twStyle="flex-1">{name}</Text>
                <View className={`h-[50] w-[50] rounded-full ${color}`}></View>
            </View>
        </Pressable>
    );
};

export default AddCategoryCard;
