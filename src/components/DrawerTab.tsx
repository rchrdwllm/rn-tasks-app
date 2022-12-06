import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';

import { useNavigation } from '@react-navigation/native';

interface DrawerTabProps {
    Icon: any;
    label: string;
    route: string;
}

const DrawerTab: FunctionComponent<DrawerTabProps> = ({ Icon, label, route }) => {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable
                onPress={() => navigation.navigate(route)}
                scale={0.97}
                twStyle="flex-row items-center space-x-4 py-3 px-4 rounded-lg"
            >
                <Icon size={20} color="#bfdbfe84" />
                <View>
                    <Text twStyle="text-white">{label}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default DrawerTab;
