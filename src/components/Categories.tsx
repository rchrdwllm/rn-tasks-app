import { View, FlatList } from 'react-native';
import Text from './Text';
import CategoryCard from './CategoryCard';

import { useSelector } from 'react-redux';
import { selectCategories } from '../redux/slices/categoriesSlice';

const Categories = () => {
    const categories = useSelector(selectCategories);

    if (!categories) return null;

    return (
        <View className="mt-6">
            <Text
                twStyle="uppercase text-gray-400 px-6"
                bold
                style={{
                    letterSpacing: 2,
                }}
            >
                Categories
            </Text>
            <FlatList
                className="mt-6"
                horizontal
                data={categories}
                keyExtractor={item => item.category}
                renderItem={({ item, index }) => <CategoryCard {...item} index={index} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
            />
        </View>
    );
};

export default Categories;
