import type { Task } from '../redux/slices/tasksSlice';

import { FlatList, View } from 'react-native';
import Text from './Text';
import TaskCard from './TaskCard';

import { useSelector } from 'react-redux';
import { useDate } from '../hooks/useDate';
import { selectUpcomingTasks } from '../redux/slices/tasksSlice';

const UpcomingTasks = () => {
    const { dateString } = useDate();
    const upcomingTasks: Task[] = useSelector((state: any) => selectUpcomingTasks(state, dateString));

    const renderFunction = ({ item }: { item: Task }) => <TaskCard {...item} />;

    return (
        <FlatList
            className="mt-8"
            ListHeaderComponent={
                <View>
                    <Text
                        twStyle="uppercase text-slate-400 ml-6 mb-12"
                        bold
                        style={{
                            letterSpacing: 2,
                        }}
                    >
                        Upcoming tasks
                    </Text>
                </View>
            }
            data={upcomingTasks}
            keyExtractor={item => item.id}
            renderItem={renderFunction}
        />
    );
};

export default UpcomingTasks;
