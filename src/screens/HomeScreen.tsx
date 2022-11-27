import { View, Platform, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import Text from '../components/Text';
import Categories from '../components/Categories';
import { FlatList } from 'react-native';
import TaskCard from '../components/TaskCard';
import AddTaskButton from '../components/AddTaskButton';

import { useSelector } from 'react-redux';
import { selectTasks } from '../redux/slices/tasksSlice';

const HomeScreen = () => {
    const tasks = useSelector(selectTasks);

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <View className="flex-1">
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Header />
                            <Categories />
                            <View className="mt-10">
                                <Text
                                    twStyle="uppercase text-gray-400 ml-6 mb-4"
                                    bold
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    Today's tasks
                                </Text>
                            </View>
                        </>
                    }
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TaskCard {...item} />}
                    contentContainerStyle={{
                        paddingTop: Platform.OS === 'android' ? 16 * 4 : 0,
                        paddingBottom: 24,
                    }}
                />
            </View>
            <AddTaskButton />
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default HomeScreen;
