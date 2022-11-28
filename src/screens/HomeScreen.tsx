import { View, Platform, SafeAreaView, Image } from 'react-native';
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
                            <View className="mt-4">
                                <Text
                                    twStyle="uppercase text-slate-400 ml-6 mb-12"
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
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center">
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
            </View>
            <AddTaskButton />
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default HomeScreen;
