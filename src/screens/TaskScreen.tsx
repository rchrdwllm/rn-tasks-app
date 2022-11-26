import type { TaskScreenProps } from '../../App';
import type { Task } from '../redux/slices/tasksSlice';

import { View, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../components/Text';
import BackButton from '../components/BackButton';
import CategoryLabel from '../components/CategoryLabel';
import DateLabel from '../components/DateLabel';
import SubtaskCard from '../components/SubtaskCard';
import Pressable from '../components/Pressable';
import { CheckIcon, XMarkIcon } from 'react-native-heroicons/outline';
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated';

import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { selectTask } from '../redux/slices/tasksSlice';

const TaskScreen = ({ route }: TaskScreenProps) => {
    const task: Task = useSelector((state: any) => selectTask(state, route.params.id));
    const { checkTask, uncheckTask } = useActions();

    if (!task) return null;

    const { title, description, completed, subtasks, categories, date, id } = task;

    const handleCheckTask = () => {
        if (!completed) {
            checkTask({ taskId: id });
        } else {
            uncheckTask({ taskId: id });
        }
    };

    return (
        <SafeAreaView
            className={`flex-1 ${!completed ? 'pt-16' : ''}`}
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            {completed && (
                <View className="bg-blue-500 pt-14 pb-8 mb-6">
                    <Text twStyle="text-white text-center">Task is done, congratulations!</Text>
                </View>
            )}
            <View
                className="flex-1"
                style={{
                    backgroundColor: '#F9FAFF',
                }}
            >
                <FlatList
                    data={subtasks}
                    renderItem={({ item }) => <SubtaskCard {...item} taskId={route.params.id} />}
                    ListEmptyComponent={() => <Text twStyle="mt-4">No subtasks provided.</Text>}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                    }}
                    ListHeaderComponent={
                        <>
                            <BackButton />
                            <Text twStyle="text-3xl mt-8" bold>
                                {title}
                            </Text>
                            <View className="flex-row items-center mt-6">
                                <DateLabel date={date} />
                                {categories.map(id => (
                                    <CategoryLabel key={id} id={id} />
                                ))}
                            </View>
                            <View className="mt-10">
                                <Text
                                    twStyle="uppercase text-gray-400"
                                    bold
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    Description
                                </Text>
                                <Text twStyle="mt-4">{description ? description : 'No description was provided.'}</Text>
                            </View>
                            <View className="mt-10 mb-4">
                                <Text
                                    twStyle="uppercase text-gray-400"
                                    bold
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    Subtasks
                                </Text>
                            </View>
                        </>
                    }
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    elevation: 10,
                    height: 65,
                    width: 65,
                }}
            >
                <Pressable
                    twStyle="justify-center items-center rounded-full h-[65] w-[65] bg-blue-500"
                    style={{
                        elevation: 10,
                    }}
                    onPress={handleCheckTask}
                >
                    {completed ? <XMarkIcon size={28} color="white" /> : <CheckIcon size={28} color="white" />}
                </Pressable>
            </View>
            <StatusBar style={completed ? 'light' : 'dark'} />
        </SafeAreaView>
    );
};

export default TaskScreen;
