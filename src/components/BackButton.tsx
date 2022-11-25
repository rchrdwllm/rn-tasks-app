import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Pressable from './Pressable';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
    twStyle?: string;
    style?: {};
}

const BackButton: FunctionComponent<BackButtonProps> = ({ twStyle, style }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-row">
            <Pressable twStyle={twStyle} style={style} onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size={24} color="rgb(156, 163, 175)" />
            </Pressable>
        </View>
    );
};

export default BackButton;
