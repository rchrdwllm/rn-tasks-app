import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Pressable from './Pressable';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
    twStyle?: string;
    style?: {};
    onPress?: () => void;
    color?: string;
}

const BackButton: FunctionComponent<BackButtonProps> = ({ twStyle, style, onPress, color }) => {
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
                <ChevronLeftIcon size={24} color={color ? color : 'rgb(148, 163, 184)'} />
            </Pressable>
        </View>
    );
};

export default BackButton;
