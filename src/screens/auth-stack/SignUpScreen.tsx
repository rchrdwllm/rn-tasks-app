import { View, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
    const [details, setDetails] = useState({
        email: '',
        password: '',
        error: '',
    });
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        setLoading(true);

        if (!details.email || !details.password) {
            setDetails({
                ...details,
                error: 'Email and password are required',
            });

            setLoading(false);

            return;
        }

        try {
            setLoading(true);

            await createUserWithEmailAndPassword(auth, details.email, details.password).then(() => {
                setLoading(false);
            });
        } catch (err: any) {
            setDetails({
                ...details,
                error: err.message,
            });

            Alert.alert('Error', err.message);

            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <Text twStyle="pt-16 text-center text-xl" bold>
                Sign up
            </Text>
            <View className="flex-1 justify-center items-stretch px-10">
                <Input
                    placeholder="Email"
                    value={details.email}
                    onChangeText={e =>
                        setDetails({
                            ...details,
                            email: e,
                        })
                    }
                />
                <Input
                    placeholder="Password"
                    value={details.password}
                    onChangeText={e =>
                        setDetails({
                            ...details,
                            password: e,
                        })
                    }
                    secureTextEnry
                />
                <Text twStyle="text-slate-400 mt-2 text-xs">
                    By signing up, you agree to our Terms & Conditions and Privacy Policy.
                </Text>
                <Button twStyle="mt-16" onPress={signUp}>
                    {loading ? <ActivityIndicator color="#fff" /> : 'Sign up'}
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;
