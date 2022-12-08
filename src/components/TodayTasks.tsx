import type { FunctionComponent } from 'react';
import type { Task } from '../redux/slices/tasksSlice';

import { View, FlatList, Image, Platform } from 'react-native';
import Header from './Header';
import Categories from './Categories';
import Text from './Text';
import TaskCard from './TaskCard';
import UpcomingTasks from './UpcomingTasks';

import { useSelector } from 'react-redux';
import { useDate } from '../hooks/useDate';
import { selectTodayTasks } from '../redux/slices/tasksSlice';

interface TodayTasksProps {
    setShouldOpen: (shouldOpen: boolean) => void;
    shouldOpen: boolean;
}

const TodayTasks: FunctionComponent<TodayTasksProps> = ({ setShouldOpen, shouldOpen }) => {
    const { dateString } = useDate();
    const todayTasks: Task[] = useSelector((state: any) => selectTodayTasks(state, dateString));

    const renderFunction = ({ item }: { item: Task }) => <TaskCard {...item} />;

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Header onPress={() => setShouldOpen(!shouldOpen)} />
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
            data={todayTasks}
            keyExtractor={item => item.id}
            renderItem={renderFunction}
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
                    <Text twStyle="mt-6 text-slate-400">Nothing left for today. Awesome!</Text>
                </View>
            }
            ListFooterComponent={<UpcomingTasks />}
        />
    );
};

export default TodayTasks;
