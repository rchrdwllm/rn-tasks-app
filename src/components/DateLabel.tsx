import type { FunctionComponent } from 'react';
import type { DateData } from 'react-native-calendars';

import { View } from 'react-native';
import Text from './Text';
import moment from 'moment';

interface DateLabelProps {
    date: DateData;
}

const currentDateString = moment(new Date(), 'YYYY-MM-DD').format().split('T')[0];

const DateLabel: FunctionComponent<DateLabelProps> = ({ date }) => {
    const parsedDate = moment(date.dateString).format('MMM D');
    const taskDate = date.dateString === currentDateString ? 'Today' : parsedDate;

    return (
        <View className={`px-2 py-1 rounded-md bg-blue-100 mr-2`}>
            <Text twStyle={`text-blue-600`}>{taskDate}</Text>
        </View>
    );
};

export default DateLabel;
