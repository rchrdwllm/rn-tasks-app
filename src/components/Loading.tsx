import type { FunctionComponent } from 'react';

import { SafeAreaView, View, ActivityIndicator } from 'react-native';

interface LoadingProps {
    loading: boolean;
}

const Loading: FunctionComponent<LoadingProps> = ({ loading }) => {
    if (!loading) return null;

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator color="#60a5fa" size="large" />
            </View>
        </SafeAreaView>
    );
};

export default Loading;
