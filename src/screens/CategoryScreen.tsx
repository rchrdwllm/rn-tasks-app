import type { CategoryScreenProps } from '../../App';

import { View, SafeAreaView, FlatList, Image } from 'react-native';
import Text from '../components/Text';
import BackButton from '../components/BackButton';
import TaskCard from '../components/TaskCard';

import { useSelector } from 'react-redux';
import { Category, selectCategoryById } from '../redux/slices/categoriesSlice';
import { selectByCategory, Task } from '../redux/slices/tasksSlice';

const CategoryScreen = ({
    route: {
        params: { id },
    },
}: CategoryScreenProps) => {
    const category = useSelector((state: any) => selectCategoryById(state, id));
    const categoryTasks: Task[] = useSelector((state: any) => selectByCategory(state, id));

    if (!category) return null;

    const { category: name, color } = category;

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
                renderItem={({ item }) => <TaskCard {...item} checkboxColor={color.color} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View className="px-6">
                        <BackButton />
                        <View className="mt-8">
                            <Text
                                twStyle="uppercase text-slate-400"
                                bold
                                style={{
                                    letterSpacing: 2,
                                }}
                            >
                                {categoryTasks.length} {categoryTasks.length === 1 ? 'task' : 'tasks'} for
                            </Text>
                            <Text twStyle="text-3xl mt-2 mb-8" bold>
                                {name}
                            </Text>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center pt-16">
                        <Image
                            source={require('../../assets/complete-tasks.png')}
                            style={{
                                height: 200,
                                width: 200,
                                resizeMode: 'contain',
                            }}
                        />
                        <Text twStyle="mt-6 text-slate-400">Looks like there's nothing left to do. Awesome!</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default CategoryScreen;
