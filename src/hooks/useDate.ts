import type { DateData } from 'react-native-calendars';

import { useEffect, useState } from 'react';
import moment from 'moment';

export const useDate = () => {
    const currentDateString = moment(new Date(), 'YYYY-MM-DD').format().split('T')[0];
    const [date, setDate] = useState<DateData>({
        dateString: currentDateString,
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        timestamp: new Date().getTime(),
    });

    useEffect(() => {
        setDate({
            dateString: currentDateString,
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            timestamp: new Date().getTime(),
        });
    }, []);

    return date;
};
