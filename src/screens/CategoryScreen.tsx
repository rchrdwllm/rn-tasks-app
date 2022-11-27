import type { CategoryScreenProps } from '../../App';

import { View, SafeAreaView, FlatList } from 'react-native';
import Text from '../components/Text';
import BackButton from '../components/BackButton';
import TaskCard from '../components/TaskCard';

import { useSelector } from 'react-redux';
import { Category, selectCategory } from '../redux/slices/categoriesSlice';
import { selectByCategory, Task } from '../redux/slices/tasksSlice';

const CategoryScreen = ({
    route: {
        params: { id },
    },
}: CategoryScreenProps) => {
    const category: Category = useSelector((state: any) => selectCategory(state, id));
    const categoryTasks: Task[] = useSelector((state: any) => selectByCategory(state, id));

    if (!category) return null;

    const { name, color } = category;

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    paddingTop: 64,
                }}
                data={categoryTasks}
                renderItem={({ item }) => <TaskCard {...item} checkboxColor={color} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View className="px-6">
                        <BackButton />
                        <View className="mt-8">
                            <Text
                                twStyle="uppercase text-gray-400"
                                bold
                                style={{
                                    letterSpacing: 2,
                                }}
                            >
                                {categoryTasks.length} {categoryTasks.length > 1 ? 'tasks' : 'task'} for
                            </Text>
                            <Text twStyle="text-3xl mt-2 mb-8" bold>
                                {name}
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default CategoryScreen;
