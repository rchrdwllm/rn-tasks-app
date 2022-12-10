import { View, SafeAreaView, Image } from 'react-native';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView
            className="flex-1 justify-center items-center"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <Image
                source={require('../../../assets/welcome.png')}
                style={{
                    height: 250,
                    width: 250,
                    resizeMode: 'contain',
                }}
            />
            <Text bold twStyle="text-5xl mt-8">
                Welcome!
            </Text>
            <View className="w-full px-6 space-y-4 mt-8">
                <Button onPress={() => navigation.navigate('SignInScreen')}>Sign in</Button>
                <Button onPress={() => navigation.navigate('SignUpScreen')}>Sign up</Button>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default WelcomeScreen;
