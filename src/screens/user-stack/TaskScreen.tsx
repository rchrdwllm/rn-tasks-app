import type { TaskScreenProps } from '../../../App';
import type { Task } from '../../redux/slices/tasksSlice';

import { View, SafeAreaView, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../../components/Text';
import BackButton from '../../components/BackButton';
import CategoryLabel from '../../components/CategoryLabel';
import DateLabel from '../../components/DateLabel';
import SubtaskCard from '../../components/SubtaskCard';
import Pressable from '../../components/Pressable';
import { CheckIcon, XMarkIcon, TrashIcon, PlusSmallIcon, ArrowRightIcon } from 'react-native-heroicons/outline';
import Input from '../../components/Input';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useNavigation } from '@react-navigation/native';
import { selectTask } from '../../redux/slices/tasksSlice';
import { v4 } from 'uuid';

const TaskScreen = ({ route }: TaskScreenProps) => {
    const task: Task | undefined = useSelector((state: any) => selectTask(state, route.params.id));
    const [shouldAddSubtask, setShouldAddSubtask] = useState(false);
    const [subtask, setSubtask] = useState('');
    const { checkTask, uncheckTask, removeTask, editTask } = useActions();
    const navigation = useNavigation();

    if (!task) return null;

    const { title, description, completed, subtasks, categories, date, id } = task;

    const handleCheckTask = () => {
        if (!completed) {
            checkTask({ taskId: id });
        } else {
            uncheckTask({ taskId: id });
        }
    };

    const handleRemoveTask = () => {
        Alert.alert('Remove Task', 'Are you sure you want to remove this task?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Remove',
                style: 'destructive',
                onPress: () => {
                    removeTask({ taskId: id });
                    navigation.goBack();
                },
            },
        ]);
    };

    const handleAddSubtask = () => {
        editTask({
            taskId: id,
            title,
            description,
            date,
            categories,
            subtasks: [...subtasks, { id: v4(), subtask, completed: false }],
        });

        setSubtask('');
        setShouldAddSubtask(false);
    };

    return (
        <SafeAreaView
            className={`flex-1 `}
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            {completed && (
                <View className="bg-blue-500 pt-14 pb-8">
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
                    ListEmptyComponent={() => <Text twStyle="text-slate-400 -mt-8 mb-8">No subtasks provided.</Text>}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: 24,
                    }}
                    ListHeaderComponent={
                        <View className={`${!completed ? 'pt-16' : 'pt-8'}`}>
                            <View className="flex-row justify-between">
                                <BackButton />
                                <Pressable onPress={handleRemoveTask}>
                                    <TrashIcon size={24} color="rgb(156, 163, 175)" />
                                </Pressable>
                            </View>
                            <Input
                                multiline
                                value={title}
                                onChangeText={e => {
                                    editTask({
                                        taskId: id,
                                        title: e,
                                        description,
                                        date,
                                        categories,
                                        subtasks,
                                    });
                                }}
                                showUnderline={false}
                                twStyle="p-0 text-3xl mt-8"
                                bold
                                placeholder="Untitled"
                            />
                            <View className="mt-6">
                                <View className="flex-row items-center">
                                    <DateLabel
                                        onPress={() => {
                                            navigation.navigate('EditDateScreen', {
                                                id,
                                                title,
                                                description,
                                                categories,
                                                selectedDay: date,
                                                subtasks,
                                            });
                                        }}
                                        date={date}
                                    />
                                    <Text twStyle="text-slate-500">
                                        {subtasks.length} {subtasks.length === 1 ? 'subtask' : 'subtasks'}
                                    </Text>
                                </View>
                                <View className="flex-row flex-wrap mt-2 items-center">
                                    {categories.map(categoryId => (
                                        <CategoryLabel id={categoryId} taskId={id} key={categoryId} />
                                    ))}
                                    <Pressable
                                        onPress={() =>
                                            navigation.navigate('EditCategoryScreen', {
                                                currentCategories: categories,
                                                id,
                                            })
                                        }
                                        twStyle="flex-row items-center bg-slate-100 px-2 py-1 rounded-md mb-2"
                                    >
                                        <PlusSmallIcon size={16} color="rgb(100, 116, 139)" />
                                        <Text twStyle="text-slate-600"> Add</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View className="mt-10">
                                <Text
                                    twStyle="uppercase text-slate-400"
                                    bold
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    Description
                                </Text>

                                <Input
                                    multiline
                                    value={description}
                                    onChangeText={e => {
                                        editTask({
                                            taskId: id,
                                            title,
                                            description: e,
                                            date,
                                            categories,
                                            subtasks,
                                        });
                                    }}
                                    showUnderline={false}
                                    twStyle="mt-3 p-0"
                                    placeholder="Enter a description for this task"
                                />
                            </View>
                            <View className="mt-10 mb-12">
                                <Text
                                    twStyle="uppercase text-slate-400"
                                    bold
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    Subtasks
                                </Text>
                            </View>
                        </View>
                    }
                    ListFooterComponent={
                        <>
                            {shouldAddSubtask && (
                                <View className="flex-row items-center space-x-2 mb-4">
                                    <View className="flex-row space-x-2">
                                        <Pressable
                                            onPress={() => {
                                                setSubtask('');
                                                setShouldAddSubtask(false);
                                            }}
                                        >
                                            <XMarkIcon size={20} color="rgb(156, 163, 175)" />
                                        </Pressable>
                                        <ArrowRightIcon size={20} color="rgb(156, 163, 175)" />
                                    </View>
                                    <View className="flex-1">
                                        <Input
                                            value={subtask}
                                            onChangeText={e => setSubtask(e)}
                                            placeholder="Add subtask"
                                        />
                                    </View>
                                </View>
                            )}
                            <View className="flex-row">
                                <Pressable
                                    onPress={() => {
                                        if (subtask) handleAddSubtask();

                                        setShouldAddSubtask(true);
                                    }}
                                    twStyle="rounded-full p-4 border-slate-100"
                                    style={{ borderWidth: 2 }}
                                >
                                    <Text twStyle="text-slate-400">Add subtask</Text>
                                </Pressable>
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
