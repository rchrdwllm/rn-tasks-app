import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Pressable from './Pressable';
import { Bars2Icon, MagnifyingGlassIcon, BellIcon } from 'react-native-heroicons/outline';
import Text from './Text';

import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
    onPress: (e?: any) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ onPress }) => {
    const user = useAuth();

    if (!user) return null;

    const { displayName } = user;

    return (
        <View className="px-6">
            <View className="flex-row justify-between">
                <Pressable onPress={onPress}>
                    <Bars2Icon size={26} color="rgb(148, 163, 184)" />
                </Pressable>
                <View className="flex-row space-x-6">
                    <Pressable>
                        <MagnifyingGlassIcon size={26} color="rgb(148, 163, 184)" />
                    </Pressable>
                    <Pressable>
                        <BellIcon size={26} color="rgb(148, 163, 184)" />
                    </Pressable>
                </View>
            </View>
            <Text twStyle="mt-6 text-4xl" bold>
                What's up, {displayName}!
            </Text>
        </View>
    );
};

export default Header;
