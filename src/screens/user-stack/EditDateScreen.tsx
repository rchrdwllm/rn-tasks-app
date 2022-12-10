import type { EditDateScreenProps } from '../../../App';

import { View } from 'react-native';
import Text from '../../components/Text';
import { StatusBar } from 'expo-status-bar';
import { Calendar } from 'react-native-calendars';
import Pressable from '../../components/Pressable';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useActions } from '../../hooks/useActions';

const EditDateScreen = ({
    route: {
        params: { id, title, description, categories, selectedDay, subtasks },
    },
}: EditDateScreenProps) => {
    const [newDay, setNewDay] = useState(selectedDay);
    const { editTask } = useActions();
    const navigation = useNavigation();

    const handleEditDate = () => {
        editTask({
            taskId: id,
            title,
            description,
            categories,
            date: newDay,
            subtasks,
        });

        navigation.goBack();
    };

    return (
        <View
            className="flex-1 text-gray-400"
            style={{
                backgroundColor: 'rgb(59, 130, 246)',
            }}
        >
            <Text twStyle="pt-16 text-center text-xl text-white" bold>
                Edit date
            </Text>
            <View
                className="mt-10 flex-1 rounded-t-3xl overflow-hidden pt-6 px-4"
                style={{
                    backgroundColor: '#F9FAFF',
                }}
            >
                <Calendar
                    markedDates={{
                        [newDay.dateString]: {
                            selected: true,
                        },
                    }}
                    theme={{
                        calendarBackground: '#F9FAFF',
                        todayBackgroundColor: 'rgb(59, 130, 246)',
                        todayTextColor: '#F9FAFF',
                        selectedDayBackgroundColor: '#F9FAFF',
                        selectedDayTextColor: 'rgb(59, 130, 246)',
                        dotColor: 'rgb(59, 130, 246)',
                        arrowColor: 'rgb(59, 130, 246)',
                        indicatorColor: 'rgb(59, 130, 246)',
                        dayTextColor: 'rgb(107, 114, 128)',
                        textSectionTitleColor: 'black',
                        textDayFontFamily: 'Rubik',
                        textMonthFontFamily: 'RubikBold',
                        textDayHeaderFontFamily: 'Rubik',
                    }}
                    markingType={'custom'}
                    onDayPress={day => setNewDay(day)}
                    enableSwipeMonths
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    height: 65,
                    width: '100%',
                    paddingHorizontal: 32,
                }}
            >
                <Pressable
                    onPress={handleEditDate}
                    twStyle="justify-center items-center rounded-full h-[65] px-6 bg-blue-500"
                >
                    <Text twStyle="text-white" bold>
                        Confirm
                    </Text>
                </Pressable>
            </View>
            <StatusBar style="light" />
        </View>
    );
};

export default EditDateScreen;
