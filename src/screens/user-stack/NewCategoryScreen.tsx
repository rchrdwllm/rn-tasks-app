import type { NewCategoryScreenProps } from '../../../App';

import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import Text from '../../components/Text';
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/Input';
import Pressable from '../../components/Pressable';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCategoriesLoading } from '../../redux/slices/categoriesSlice';
import { useAuth } from '../../hooks/useAuth';
import { useActions } from '../../hooks/useActions';
import { doc, setDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { Shadow } from 'react-native-shadow-2';
import { db } from '../../config/firebase';

const NewCategoryScreen = ({
    route: {
        params = {
            selectedColor: {
                id: v4(),
                color: '#60a5fa',
                backgroundColor: '#dbeafe',
                textColor: '#2563eb',
                name: 'Blue',
            },
        },
    },
}: NewCategoryScreenProps) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const { addCategory, setCategoriesLoading } = useActions();
    const [user] = useAuth();
    const loading = useSelector(selectCategoriesLoading);

    if (!user) return null;

    const handleAddCategory = async () => {
        setCategoriesLoading(true);

        const id = v4();
        const newCategory = {
            id,
            color: params.selectedColor,
            category: name,
            belongsToUser: user.uid,
        };

        await setDoc(doc(db, 'categories', id), newCategory);

        addCategory(newCategory);
        setCategoriesLoading(false);

        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View
                className="mt-8 py-6 bg-white"
                style={{
                    position: 'absolute',
                    width: '100%',
                    zIndex: 1,
                }}
            >
                <Text twStyle="text-lg text-center" bold>
                    New category
                </Text>
            </View>
            <View className="flex-1 justify-center px-12 -mt-20">
                <Input
                    value={name}
                    onChangeText={e => setName(e)}
                    placeholder="Enter new category name"
                    twStyle="text-xl mt-40"
                    multiline
                />
                <View className="mt-10 flex-row items-center space-x-4">
                    <Pressable
                        onPress={() => navigation.navigate('SelectCategoryColorScreen')}
                        twStyle="rounded-full p-4 border-gray-100"
                        style={{ borderWidth: 2 }}
                    >
                        <View
                            className="rounded-full"
                            style={{
                                height: 20,
                                width: 20,
                                backgroundColor: params.selectedColor.color,
                            }}
                        ></View>
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 48,
                    elevation: 10,
                    height: 65,
                }}
            >
                <Pressable onPress={handleAddCategory} twStyle="justify-center items-center rounded-full h-[65]">
                    <Shadow
                        containerStyle={{
                            marginBottom: 32,
                        }}
                        distance={20}
                        startColor={'#67a1ff73'}
                        endColor={'#ffffff00'}
                        offset={[12, 15]}
                        style={{
                            borderRadius: 100,
                            height: 50,
                            width: 125,
                        }}
                    >
                        <View className="justify-center items-center rounded-full h-[65] w-[150] bg-blue-500">
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text twStyle="text-white" bold>
                                    Add category
                                </Text>
                            )}
                        </View>
                    </Shadow>
                </Pressable>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default NewCategoryScreen;
