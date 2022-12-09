import type { NewTaskScreenProps } from '../../App';

import { View, SafeAreaView } from 'react-native';
import Text from '../components/Text';
import { StatusBar } from 'expo-status-bar';
import Input from '../components/Input';
import Pressable from '../components/Pressable';
import { CalendarIcon, ArrowRightIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { FlatList } from 'react-native';
import CategoryIndicator from '../components/CategoryIndicator';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useActions } from '../hooks/useActions';
import { v4 } from 'uuid';
import moment from 'moment';
import { Shadow } from 'react-native-shadow-2';

interface Subtask {
    subtask: string;
    id: string;
}

const currentDateString = moment(new Date(), 'YYYY-MM-DD').format().split('T')[0];

const NewTaskScreen = ({
    route: {
        params: {
            selectedCategories,
            selectedDay = {
                dateString: currentDateString,
                day: new Date().getDate(),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                timestamp: new Date().getTime(),
            },
        },
    },
}: NewTaskScreenProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtask, setSubtask] = useState('');
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [shouldAddSubtask, setShouldAddSubtask] = useState(false);
    const navigation = useNavigation();
    const { addTask } = useActions();

    const handleAddTask = () => {
        if (!title) return;

        addTask({
            title,
            description,
            subtasks,
            id: v4(),
            categories: selectedCategories,
            date: selectedDay,
        });

        navigation.goBack();
    };

    const handleAddSubtask = () => {
        setSubtasks([...subtasks, { subtask, id: v4() }]);
        setSubtask('');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View
                className="mt-8 py-6 bg-white"
                style={{
                    position: 'absolute',
                    width: '100%',
                    zIndex: 1,
                }}
            >
                <Text twStyle="text-lg text-center" bold>
                    New task
                </Text>
            </View>
            <View className="flex-1 justify-center">
                <FlatList
                    data={subtasks}
                    ListHeaderComponent={
                        <>
                            <Input
                                value={title}
                                onChangeText={e => setTitle(e)}
                                placeholder="Enter new task"
                                twStyle="text-xl mt-40"
                                multiline
                            />
                            <View className="mt-10 flex-row items-center space-x-4">
                                <Pressable
                                    twStyle="flex-row items-center rounded-full p-4 border-gray-100"
                                    style={{ borderWidth: 2 }}
                                    onPress={() =>
                                        navigation.navigate('AddDateScreen', {
                                            prevSelectedDay: selectedDay,
                                            selectedCategories,
                                        })
                                    }
                                >
                                    <CalendarIcon size={20} color="rgb(156, 163, 175)" />
                                    <Text twStyle="text-gray-400 ml-2">
                                        {selectedDay.dateString === currentDateString
                                            ? 'Today'
                                            : moment(selectedDay.dateString).format('MMM D')}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('AddCategoryScreen', {
                                            selectedCategories,
                                            selectedDay,
                                        })
                                    }
                                    twStyle="rounded-full p-4 border-gray-100"
                                    style={{ borderWidth: 2 }}
                                >
                                    <FlatList
                                        data={selectedCategories}
                                        horizontal
                                        renderItem={({ item, index }) => <CategoryIndicator id={item} index={index} />}
                                        keyExtractor={item => item}
                                        ListEmptyComponent={
                                            <View
                                                className="rounded-full bg-gray-400"
                                                style={{ height: 20, width: 20 }}
                                            ></View>
                                        }
                                    />
                                </Pressable>
                            </View>
                            <Input
                                value={description}
                                onChangeText={e => setDescription(e)}
                                placeholder="Enter description"
                                twStyle="mt-4"
                                multiline
                            />
                        </>
                    }
                    contentContainerStyle={{ paddingHorizontal: 48, paddingBottom: 48 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center mt-2 space-x-2">
                            <ArrowRightIcon size={20} color="rgb(156, 163, 175)" />
                            <View>
                                <Text twStyle="text-gray-500">{item.subtask}</Text>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={
                        <>
                            {shouldAddSubtask && (
                                <View className="flex-row items-center space-x-2">
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
                            <View className="flex-row mt-4">
                                <Pressable
                                    onPress={() => {
                                        if (subtask) handleAddSubtask();

                                        setShouldAddSubtask(true);
                                    }}
                                    twStyle="rounded-full p-4 border-gray-100"
                                    style={{ borderWidth: 2 }}
                                >
                                    <Text twStyle="text-gray-400">Add subtask</Text>
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
                    right: 48,
                    elevation: 10,
                    height: 65,
                }}
            >
                <Pressable twStyle="justify-center items-center rounded-full h-[65]" onPress={handleAddTask}>
                    <Shadow
                        containerStyle={{
                            marginBottom: 32,
                        }}
                        distance={20}
                        startColor={'#67a1ff73'}
                        endColor={'#ffffff00'}
                        offset={[12, 15]}
                        style={{
                            borderRadius: 100,
                            height: 50,
                            width: 100,
                        }}
                    >
                        <View className="justify-center items-center rounded-full h-[65] w-[124] bg-blue-500">
                            <Text twStyle="text-white" bold>
                                Add task
                            </Text>
                        </View>
                    </Shadow>
                </Pressable>
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default NewTaskScreen;
