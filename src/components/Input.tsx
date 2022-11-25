import type { FunctionComponent } from 'react';

import { View, TextInput } from 'react-native';

import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    twStyle?: string;
    style?: {};
    multiline?: boolean;
}

const Input: FunctionComponent<InputProps> = ({ value, onChangeText, placeholder, twStyle, style, multiline }) => {
    const [fontsLoaded] = useFonts({
        Rubik: Rubik_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className={`${twStyle} py-4 px-1`}
                style={{ fontFamily: 'Rubik', ...style }}
                cursorColor="rgb(59, 130, 246)"
                underlineColorAndroid="rgb(193, 201, 214)"
                placeholderTextColor="rgb(156, 163, 175)"
                multiline={multiline}
            />
        </View>
    );
};

export default Input;
