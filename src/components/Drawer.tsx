import type { FunctionComponent } from 'react';

import { View, Image } from 'react-native';
import Text from './Text';
import DrawerTab from './DrawerTab';
import { ArrowRightIcon, CogIcon, RectangleGroupIcon } from 'react-native-heroicons/outline';
import BackButton from './BackButton';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { useWindowDimensions } from 'react-native';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../config/firebase';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';

interface DrawerProps {
    onPress: () => void;
    shouldOpen: boolean;
}

const Drawer: FunctionComponent<DrawerProps> = ({ onPress, shouldOpen }) => {
    const { width } = useWindowDimensions();
    const opacity = useSharedValue(0);
    const xValue = useSharedValue(-100);
    const navigation = useNavigation();
    const user = useAuth();

    const drawerAnim = useAnimatedStyle(
        () => ({
            opacity: withTiming(opacity.value, {
                duration: 750,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            transform: [
                {
                    translateX: withTiming(xValue.value, {
                        duration: 750,
                        easing: Easing.bezier(0.16, 1, 0.3, 1),
                    }),
                },
            ],
        }),
        []
    );

    const handleSignOut = () => {
        setBackgroundColorAsync('#F9FAFF');
        setButtonStyleAsync('dark');

        signOut(auth);
    };

    useEffect(() => {
        if (shouldOpen) {
            opacity.value = 1;
            xValue.value = 0;
        } else {
            opacity.value = 0;
            xValue.value = -100;
        }
    }, [shouldOpen]);

    if (!user) return null;

    const { displayName } = user;

    return (
        <Animated.View className="pt-20" style={drawerAnim}>
            <View className="pl-16">
                <View
                    className="flex-row justify-end"
                    style={{
                        paddingRight: width * 0.23,
                    }}
                >
                    <BackButton
                        twStyle="p-4 rounded-full"
                        style={{
                            borderWidth: 2,
                            borderColor: '#bfdbfe2f',
                        }}
                        onPress={onPress}
                        color="white"
                    />
                </View>
                <Image
                    source={require('../../assets/me.jpeg')}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',
                        borderRadius: 100,
                    }}
                />
            </View>
            <View className="mt-10">
                <Text twStyle="pl-16 text-4xl text-white leading-10" style={{ paddingRight: width * 0.2 }} bold>
                    {displayName}
                </Text>
                <View
                    className="mt-4 pl-12"
                    style={{
                        paddingRight: width * 0.23,
                    }}
                >
                    <DrawerTab
                        Icon={RectangleGroupIcon}
                        label="Categories"
                        onPress={() => navigation.navigate('CategoriesScreen')}
                    />
                    <DrawerTab
                        Icon={CogIcon}
                        label="Settings"
                        onPress={() => navigation.navigate('CategoriesScreen')}
                    />
                    <DrawerTab Icon={ArrowRightIcon} label="Logout" onPress={handleSignOut} />
                </View>
            </View>
        </Animated.View>
    );
};

export default Drawer;
