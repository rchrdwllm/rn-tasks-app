import type { FunctionComponent } from 'react';
import type { DateData } from 'react-native-calendars';

import Text from './Text';
import { CalendarIcon } from 'react-native-heroicons/outline';
import Pressable from './Pressable';

import moment from 'moment';

interface DateLabelProps {
    date: DateData;
    onPress: () => void;
}

const currentDateString = moment(new Date(), 'YYYY-MM-DD').format().split('T')[0];

const DateLabel: FunctionComponent<DateLabelProps> = ({ date, onPress }) => {
    const parsedDate = moment(date.dateString).format('MMM D');
    const taskDate = date.dateString === currentDateString ? 'Today' : parsedDate;

    return (
        <Pressable onPress={onPress} twStyle="flex-row px-2 py-1 rounded-md bg-slate-100 mr-2 items-center">
            <CalendarIcon size={16} color="rgb(100, 116, 139)" />
            <Text twStyle="text-slate-600 ml-2">{taskDate}</Text>
        </Pressable>
    );
};

export default DateLabel;
