import type { Category } from '../redux/slices/categoriesSlice';
import type { AddCategoryScreenProps } from '../../App';

import { View, Image } from 'react-native';
import Text from '../components/Text';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AddCategoryCard from '../components/AddCategoryCard';
import Pressable from '../components/Pressable';
import DownButton from '../components/DownButton';
import { PlusIcon } from 'react-native-heroicons/outline';

import { useSelector } from 'react-redux';
import { selectAllCategories } from '../redux/slices/categoriesSlice';
import { useNavigation } from '@react-navigation/native';
import { useState, memo } from 'react';

const AddCategoryScreen = ({
    route: {
        params: { selectedCategories: savedCategories, selectedDay },
    },
}: AddCategoryScreenProps) => {
    const categories: Category[] = useSelector(selectAllCategories);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigation = useNavigation();

    const handleAddCategories = () => {
        navigation.navigate('NewTaskScreen', { selectedCategories, selectedDay });
    };

    return (
        <View
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <View className="flex-row items-center justify-between pt-10 px-6 pb-4">
                <Text twStyle="text-center text-xl" bold>
                    Add categories
                </Text>
                <DownButton />
            </View>
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <AddCategoryCard
                        {...item}
                        savedCategories={savedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                )}
                contentContainerStyle={{
                    padding: 24,
                }}
                ListFooterComponent={
                    <View>
                        <Pressable scale={0.97} onPress={() => navigation.navigate('NewCategoryScreen')}>
                            <View className="flex-row items-center space-x-3 rounded-3xl p-5 mt-2">
                                <View>
                                    <PlusIcon size={16} color="rgb(148, 163, 184)" />
                                </View>
                                <View>
                                    <Text twStyle="text-slate-400">Add category</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-20">
                        <Image
                            source={require('../../assets/complete-tasks.png')}
                            style={{
                                height: 200,
                                width: 200,
                                resizeMode: 'contain',
                            }}
                        />
                        <Text twStyle="mt-6 text-slate-400">No categories here. Maybe add some first?</Text>
                    </View>
                }
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    height: 65,
                    width: '100%',
                    paddingHorizontal: 24,
                }}
            >
                <Pressable
                    onPress={handleAddCategories}
                    twStyle="justify-center items-center rounded-full h-[65] px-6 bg-blue-500"
                >
                    <Text twStyle="text-white" bold>
                        Confirm
                    </Text>
                </Pressable>
            </View>
            <StatusBar style="light" />
        </View>
    );
};

export default memo(AddCategoryScreen);
