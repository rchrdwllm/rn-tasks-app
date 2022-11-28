import { View } from 'react-native';
import Pressable from './Pressable';
import { Bars2Icon, MagnifyingGlassIcon, BellIcon } from 'react-native-heroicons/outline';
import Text from './Text';

const Header = () => {
    return (
        <View className="px-6">
            <View className="flex-row justify-between">
                <Pressable>
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
                What's up, William!
            </Text>
        </View>
    );
};

export default Header;
