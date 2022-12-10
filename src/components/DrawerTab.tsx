import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';

interface DrawerTabProps {
    Icon: any;
    label: string;
    onPress: () => void;
}

const DrawerTab: FunctionComponent<DrawerTabProps> = ({ Icon, label, onPress }) => {
    return (
        <View>
            <Pressable onPress={onPress} scale={0.97} twStyle="flex-row items-center space-x-4 py-3 px-4 rounded-lg">
                <Icon size={20} color="#bfdbfe84" />
                <View>
                    <Text twStyle="text-white">{label}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default DrawerTab;
