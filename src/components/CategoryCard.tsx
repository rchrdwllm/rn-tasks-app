import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';

import { useNavigation } from '@react-navigation/native';
import { selectByCategory, Task } from '../redux/slices/tasksSlice';
import { useSelector } from 'react-redux';

interface CategoryCardProps {
    name: string;
    category: string;
    color: string;
    index: number;
    id: string;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({ name, color, index, id }) => {
    const navigation = useNavigation();
    const categoryTasks: Task[] = useSelector((state: any) => selectByCategory(state, id));

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('CategoryScreen', { id });
            }}
        >
            <View className={`bg-white rounded-2xl ml-6 ${index === 0 ? 'ml-0' : ''} p-5 w-44`}>
                <Text twStyle="text-500 text-gray-400" medium>
                    {categoryTasks.length} {categoryTasks.length === 1 ? 'task' : 'tasks'}
                </Text>
                <Text twStyle="text-2xl mt-1" bold>
                    {name}
                </Text>
                <View className="mt-2 rounded-full h-1 overflow-hidden">
                    <View
                        className="flex-1"
                        style={{
                            backgroundColor: color,
                        }}
                    ></View>
                </View>
            </View>
        </Pressable>
    );
};

export default CategoryCard;
