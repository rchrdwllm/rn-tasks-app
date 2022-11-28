import type { FunctionComponent } from 'react';

import { View, TextInput } from 'react-native';

import { useFonts, Rubik_400Regular, Rubik_600SemiBold } from '@expo-google-fonts/rubik';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    twStyle?: string;
    style?: {};
    multiline?: boolean;
    showUnderline?: boolean;
    bold?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
    value,
    showUnderline = true,
    onChangeText,
    placeholder,
    twStyle,
    style,
    multiline,
    bold,
}) => {
    const [fontsLoaded] = useFonts({
        Rubik: Rubik_400Regular,
        RubikBold: Rubik_600SemiBold,
    });

    if (!fontsLoaded) return null;

    return (
        <View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className={`py-4 px-1 ${twStyle}`}
                style={{ fontFamily: bold ? 'RubikBold' : 'Rubik', ...style }}
                cursorColor="rgb(59, 130, 246)"
                underlineColorAndroid={showUnderline ? 'rgb(193, 201, 214)' : 'transparent'}
                placeholderTextColor="rgb(148, 163, 184)"
                multiline={multiline}
            />
        </View>
    );
};

export default Input;
