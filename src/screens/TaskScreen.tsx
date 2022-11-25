import type { TaskScreenProps } from '../../App';
import type { Task } from '../redux/slices/tasksSlice';

import { View, SafeAreaView, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../components/Text';
import BackButton from '../components/BackButton';
import Label from '../components/Label';

import { useSelector } from 'react-redux';
import { selectTask } from '../redux/slices/tasksSlice';
import SubtaskCard from '../components/SubtaskCard';
import { useEffect } from 'react';

const TaskScreen = ({ route }: TaskScreenProps) => {
    const task: Task = useSelector((state: any) => selectTask(state, route.params.id));

    if (!task) return null;

    const { title, description, completed, subtasks, categories } = task;

    useEffect(() => {
        if (completed) {
            Alert.alert('Task Completed', 'Congratulations on completing this task!');
        }
    }, [completed]);

    return (
        <SafeAreaView
            className="flex-1 pt-16"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
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
                                {categories.map(id => (
                                    <Label key={id} id={id} />
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
            <StatusBar backgroundColor="#F9FAFF" />
        </SafeAreaView>
    );
};

export default TaskScreen;
