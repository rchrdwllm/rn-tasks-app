import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';

interface CategoryCardProps {
    name: string;
    category: string;
    color: string;
    index: number;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({ name, category, color, index }) => {
    return (
        <Pressable>
            <View className={`bg-white rounded-2xl ml-6 ${index === 0 ? 'ml-0' : ''} p-5 w-44`}>
                <Text twStyle="text-500 text-gray-400" medium>
                    1 task
                </Text>
                <Text twStyle="text-2xl mt-1" bold>
                    {name}
                </Text>
                <View className="mt-2 rounded-full h-1 overflow-hidden">
                    <View className={`${color} flex-1`}></View>
                </View>
            </View>
        </Pressable>
    );
};

export default CategoryCard;
