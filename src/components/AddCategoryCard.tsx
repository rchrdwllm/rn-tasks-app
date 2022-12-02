import type { FunctionComponent } from 'react';
import type { Category } from '../redux/slices/categoriesSlice';

import Pressable from './Pressable';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from './Text';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryById } from '../redux/slices/categoriesSlice';

interface AddCategoryCardProps extends Category {
    setSelectedCategories: any;
    savedCategories: string[];
}

const AddCategoryCard: FunctionComponent<AddCategoryCardProps> = ({ id, savedCategories, setSelectedCategories }) => {
    const [selected, setSelected] = useState(savedCategories.includes(id));
    const category = useSelector((state: any) => selectCategoryById(state, id));

    if (!category) return null;

    const { category: name, color } = category;

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
                <Checkbox status={selected ? 'checked' : 'unchecked'} color={color.color} />
                <Text twStyle="flex-1">{name}</Text>
                <View
                    className="h-[50] w-[50] rounded-full"
                    style={{
                        backgroundColor: color.color,
                    }}
                ></View>
            </View>
        </Pressable>
    );
};

export default AddCategoryCard;
