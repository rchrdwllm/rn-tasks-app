import type { FunctionComponent, ReactNode } from 'react';

import { Pressable as RNPressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface PressableProps {
    children: ReactNode;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    twStyle?: string;
    style?: {};
    scale?: number;
}

const Pressable: FunctionComponent<PressableProps> = ({
    children,
    onPress = () => {},
    onPressIn = () => {},
    onPressOut = () => {},
    twStyle,
    style,
    scale = 0.95,
}) => {
    const scaleValue = useSharedValue(1);

    const scaleAnim = useAnimatedStyle(
        () => ({
            transform: [{ scale: withTiming(scaleValue.value, { duration: 100 }) }],
        }),
        []
    );

    return (
        <Animated.View style={scaleAnim}>
            <RNPressable
                className={`${twStyle}`}
                style={style}
                onPress={onPress}
                onPressIn={() => {
                    scaleValue.value = scale;

                    onPressIn();
                }}
                onPressOut={() => {
                    scaleValue.value = 1;

                    onPressOut();
                }}
            >
                {children}
            </RNPressable>
        </Animated.View>
    );
};

export default Pressable;
