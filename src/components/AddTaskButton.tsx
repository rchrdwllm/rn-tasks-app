import { FunctionComponent, useEffect } from 'react';

import Pressable from './Pressable';
import { PlusIcon } from 'react-native-heroicons/outline';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';

interface AddTaskButtonProps {
    shouldOpen: boolean;
}

const AddTaskButton: FunctionComponent<AddTaskButtonProps> = ({ shouldOpen }) => {
    const navigation = useNavigation();
    const opacity = useSharedValue(1);

    const buttonAnim = useAnimatedStyle(
        () => ({
            opacity: withTiming(opacity.value),
        }),
        []
    );

    useEffect(() => {
        if (shouldOpen) {
            opacity.value = 0;
        } else {
            opacity.value = 1;
        }
    });

    return (
        <>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        bottom: 24,
                        right: 24,
                        elevation: 10,
                        height: 65,
                        width: 65,
                    },
                    buttonAnim,
                ]}
            >
                <Pressable onPress={() => navigation.navigate('NewTaskScreen')}>
                    <Shadow
                        containerStyle={{
                            marginBottom: 32,
                        }}
                        distance={20}
                        startColor={'#67a1ff73'}
                        endColor={'#ffffff00'}
                        offset={[7, 20]}
                        style={{
                            borderRadius: 100,
                            height: 50,
                            width: 50,
                        }}
                    >
                        <View className="justify-center items-center rounded-full h-[65] w-[65] bg-blue-500">
                            <PlusIcon size={28} color="white" />
                        </View>
                    </Shadow>
                </Pressable>
            </Animated.View>
        </>
    );
};

export default AddTaskButton;
