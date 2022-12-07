import { View, FlatList } from 'react-native';
import Text from './Text';
import CategoryCard from './CategoryCard';
import Pressable from './Pressable';
import { Shadow } from 'react-native-shadow-2';
import { PlusIcon } from 'react-native-heroicons/outline';

import { useSelector } from 'react-redux';
import { selectCategoryIds } from '../redux/slices/categoriesSlice';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
    const categoryIds = useSelector(selectCategoryIds);
    const navigation = useNavigation();

    if (!categoryIds) return null;

    const renderFunction = ({ item }: { item: string }) => <CategoryCard id={item} />;

    return (
        <View className="mt-6">
            <View className="flex-row justify-between px-6">
                <Text
                    twStyle="uppercase text-slate-400"
                    bold
                    style={{
                        letterSpacing: 2,
                    }}
                >
                    Categories
                </Text>
                <Pressable onPress={() => navigation.navigate('CategoriesScreen')}>
                    <Text
                        twStyle="uppercase text-slate-400"
                        bold
                        style={{
                            letterSpacing: 2,
                        }}
                    >
                        View all
                    </Text>
                </Pressable>
            </View>
            <FlatList
                className="mt-6"
                horizontal
                data={categoryIds as string[]}
                keyExtractor={item => item as string}
                renderItem={renderFunction}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 24, paddingBottom: 24 }}
                ListEmptyComponent={
                    <View>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('NewCategoryScreen');
                            }}
                        >
                            <Shadow
                                containerStyle={{
                                    marginRight: 24,
                                }}
                                distance={20}
                                startColor={'#dbeafe37'}
                                endColor={'#ffffff00'}
                                offset={[0, 10]}
                                style={{
                                    borderRadius: 20,
                                }}
                            >
                                <View className={`flex-row items-center space-x-3 bg-white rounded-2xl p-5`}>
                                    <View>
                                        <PlusIcon size={24} color="rgb(148, 163, 184)" />
                                    </View>
                                    <View>
                                        <Text twStyle="text-500 text-slate-400">Add a new category</Text>
                                    </View>
                                </View>
                            </Shadow>
                        </Pressable>
                    </View>
                }
            />
        </View>
    );
};

export default Categories;
