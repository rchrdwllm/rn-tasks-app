import type { FunctionComponent, ReactNode } from 'react';

import Text from './Text';
import Pressable from './Pressable';

interface ButtonProps {
    children: ReactNode;
    style?: {};
    twStyle?: string;
    onPress?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ children, style, twStyle, onPress = () => {} }) => {
    return (
        <Pressable onPress={onPress} twStyle={`py-4 rounded-full bg-blue-500 px-4 ${twStyle}`} style={style}>
            <Text twStyle="text-white text-center" bold>
                {children}
            </Text>
        </Pressable>
    );
};

export default Button;
