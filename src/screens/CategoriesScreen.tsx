import { View, SafeAreaView, FlatList, Image } from 'react-native';
import Text from '../components/Text';
import BackButton from '../components/BackButton';
import CategoriesScreenCard from '../components/CategoriesScreenCard';
import { StatusBar } from 'expo-status-bar';
import Pressable from '../components/Pressable';
import { PlusIcon } from 'react-native-heroicons/outline';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectCategoryIds } from '../redux/slices/categoriesSlice';

const CategoriesScreen = () => {
    const categories = useSelector(selectCategoryIds);
    const navigation = useNavigation();

    const renderFunction = ({ item }: { item: string }) => <CategoriesScreenCard id={item as string} />;

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    paddingTop: 64,
                }}
                data={categories as string[]}
                renderItem={renderFunction}
                keyExtractor={item => item as string}
                ListHeaderComponent={
                    <View className="px-6">
                        <BackButton />
                        <View className="mt-8">
                            <Text twStyle="text-3xl mt-2 mb-12" bold>
                                Categories
                            </Text>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center pt-16 mb-8">
                        <Image
                            source={require('../../assets/complete-tasks.png')}
                            style={{
                                height: 200,
                                width: 200,
                                resizeMode: 'contain',
                            }}
                        />
                        <Text twStyle="mt-6 text-slate-400">No categories here, how about adding some?</Text>
                    </View>
                }
                ListFooterComponent={
                    <View className="-mt-6 px-6">
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
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default CategoriesScreen;
