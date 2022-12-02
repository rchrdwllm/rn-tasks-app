import { View, FlatList } from 'react-native';
import Text from './Text';
import CategoryCard from './CategoryCard';
import Pressable from './Pressable';

import { useSelector } from 'react-redux';
import { selectCategoryIds } from '../redux/slices/categoriesSlice';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const Categories = () => {
    const categoryIds = useSelector(selectCategoryIds);
    const navigation = useNavigation();

    if (!categoryIds) return null;

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
                data={categoryIds}
                keyExtractor={item => item as string}
                renderItem={({ item, index }) => <CategoryCard id={item} index={index} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 24, paddingBottom: 24 }}
            />
        </View>
    );
};

export default Categories;
