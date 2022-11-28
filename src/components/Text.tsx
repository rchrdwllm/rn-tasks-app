import type { FunctionComponent, ReactNode } from 'react';

import { Text as RNText } from 'react-native';

import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold } from '@expo-google-fonts/rubik';

interface TextProps {
    twStyle?: string;
    style?: {};
    bold?: boolean;
    medium?: boolean;
    children: ReactNode;
}

const Text: FunctionComponent<TextProps> = ({ twStyle, style, bold, medium, children }) => {
    const [fontsLoaded] = useFonts({
        Rubik: Rubik_400Regular,
        RubikMedium: Rubik_500Medium,
        RubikBold: Rubik_600SemiBold,
    });

    if (!fontsLoaded) return null;

    return (
        <RNText
            className={`text-slate-800 ${twStyle}`}
            style={{
                fontFamily: bold ? 'RubikBold' : medium ? 'RubikMedium' : 'Rubik',
                ...style,
            }}
        >
            {children}
        </RNText>
    );
};

export default Text;
