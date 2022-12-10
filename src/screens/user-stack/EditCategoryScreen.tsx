import type { EditCategoryScreenProps } from '../../../App';

import { View } from 'react-native';
import Text from '../../components/Text';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AddCategoryCard from '../../components/AddCategoryCard';
import Pressable from '../../components/Pressable';
import DownButton from '../../components/DownButton';
import { PlusIcon } from 'react-native-heroicons/outline';

import { useSelector } from 'react-redux';
import { selectCategoryIds } from '../../redux/slices/categoriesSlice';
import { useNavigation } from '@react-navigation/native';
import { useState, memo } from 'react';
import { useActions } from '../../hooks/useActions';

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
            <View className="flex-row items-center justify-between pt-10 px-6 pb-4">
                <Text twStyle="text-center text-xl" bold>
                    Edit categories
                </Text>
                <DownButton />
            </View>
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
                    padding: 24,
                    paddingBottom: 124,
                }}
                className="-mt-4"
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
