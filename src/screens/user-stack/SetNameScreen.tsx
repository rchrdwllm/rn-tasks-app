import type { User } from '../../redux/slices/usersSlice';

import { View, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Pressable from '../../components/Pressable';
import { Shadow } from 'react-native-shadow-2';
import { ArrowRightIcon } from 'react-native-heroicons/outline';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';
import { useActions } from '../../hooks/useActions';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const SetNameScreen = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [user] = useAuth();
    const navigation = useNavigation();
    const { userAdded } = useActions();

    const handleUpdateName = () => {
        setLoading(true);

        if (user && name) {
            updateProfile(user, {
                displayName: name,
            }).then(async () => {
                const newUser: User = {
                    name,
                    id: user.uid,
                    email: user.email,
                    tasks: [],
                    categories: [],
                };

                await setDoc(doc(db, 'users', user.uid), newUser);

                userAdded(newUser);

                setLoading(false);

                navigation.navigate('HomeScreen');
            });
        } else {
            Alert.alert('Error', 'Please enter a name.');

            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.displayName) navigation.navigate('HomeScreen');
    }, [user, user?.displayName]);

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <View className="flex-1 justify-center items-stretch px-8">
                <Text bold twStyle="text-4xl">
                    What's your name?
                </Text>
                <Input twStyle="mt-4" placeholder="Name" value={name} onChangeText={e => setName(e)} />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    elevation: 10,
                    height: 65,
                    width: 65,
                }}
            >
                <Pressable onPress={handleUpdateName}>
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
                            {loading ? <ActivityIndicator color="#fff" /> : <ArrowRightIcon size={28} color="white" />}
                        </View>
                    </Shadow>
                </Pressable>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default SetNameScreen;
