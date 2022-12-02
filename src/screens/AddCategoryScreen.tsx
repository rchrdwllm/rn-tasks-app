import type { Category } from '../redux/slices/categoriesSlice';
import type { AddCategoryScreenProps } from '../../App';

import { View } from 'react-native';
import Text from '../components/Text';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AddCategoryCard from '../components/AddCategoryCard';
import Pressable from '../components/Pressable';

import { useSelector } from 'react-redux';
import { selectAllCategories } from '../redux/slices/categoriesSlice';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

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
            <Text twStyle="pt-10 text-center text-xl" bold>
                Add categories
            </Text>
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
                    paddingTop: 24,
                    paddingHorizontal: 32,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    height: 65,
                    width: '100%',
                    paddingHorizontal: 32,
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

export default AddCategoryScreen;
