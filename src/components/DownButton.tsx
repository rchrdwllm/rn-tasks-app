import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Pressable from './Pressable';
import { ChevronDownIcon } from 'react-native-heroicons/outline';

import { useNavigation } from '@react-navigation/native';

interface DownButtonProps {
    twStyle?: string;
    style?: {};
    onPress?: () => void;
    color?: string;
}

const DownButton: FunctionComponent<DownButtonProps> = ({ twStyle, style, onPress, color }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-row">
            <Pressable
                twStyle={twStyle}
                style={style}
                onPress={() => {
                    onPress ? onPress() : navigation.goBack();
                }}
            >
                <ChevronDownIcon size={24} color={color ? color : 'rgb(148, 163, 184)'} />
            </Pressable>
        </View>
    );
};

export default DownButton;
