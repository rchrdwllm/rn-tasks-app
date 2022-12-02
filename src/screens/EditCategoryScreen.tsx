import type { Category } from '../redux/slices/categoriesSlice';
import type { EditCategoryScreenProps } from '../../App';

import { View } from 'react-native';
import Text from '../components/Text';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AddCategoryCard from '../components/AddCategoryCard';
import Pressable from '../components/Pressable';

import { useSelector } from 'react-redux';
import { selectCategoryIds } from '../redux/slices/categoriesSlice';
import { useNavigation } from '@react-navigation/native';
import { useState, memo } from 'react';
import { useActions } from '../hooks/useActions';

const EditCategoryScreen = ({
    route: {
        params: { id, currentCategories },
    },
}: EditCategoryScreenProps) => {
    const categoryIds = useSelector(selectCategoryIds);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigation = useNavigation();
    const { editCategories } = useActions();

    const handleEditCategories = () => {
        editCategories({ taskId: id, categories: selectedCategories });

        navigation.goBack();
    };

    return (
        <View
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <Text twStyle="pt-10 text-center text-xl" bold>
                Edit categories
            </Text>
            <FlatList
                data={categoryIds}
                keyExtractor={item => item as string}
                renderItem={({ item }) => (
                    <AddCategoryCard
                        id={item as any}
                        savedCategories={currentCategories}
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
                    onPress={handleEditCategories}
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

export default memo(EditCategoryScreen);
