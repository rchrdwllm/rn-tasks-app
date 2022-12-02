import type { Color } from '../constants/colors';

import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../components/Text';
import Pressable from '../components/Pressable';
import { Shadow } from 'react-native-shadow-2';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';

import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';

const SelectCategoryColorScreen = () => {
    const navigation = useNavigation();

    const renderFunction = ({ item }: { item: Color }) => (
        <Pressable
            onPress={() => {
                navigation.navigate('NewCategoryScreen', { selectedColor: item });
            }}
            twStyle="flex-1 -mt-4 mb-8"
        >
            <Shadow
                distance={20}
                startColor={'#dbeafe37'}
                endColor={'#ffffff00'}
                offset={[0, 10]}
                style={{
                    borderRadius: 20,
                }}
                stretch
            >
                <View className="flex-row flex-1 bg-white rounded-2xl p-5 justify-between items-center mx-6">
                    <Text twStyle="text-2xl mt-1" bold>
                        {item.name}
                    </Text>
                    <View className="mt-2 rounded-full h-10 w-10 overflow-hidden">
                        <View
                            className="flex-1"
                            style={{
                                backgroundColor: item.color,
                            }}
                        ></View>
                    </View>
                </View>
            </Shadow>
        </Pressable>
    );

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <View className="flex-1">
                <OptimizedFlatList
                    className="flex-1"
                    data={colors}
                    keyExtractor={(item: Color) => item.id}
                    ListHeaderComponent={
                        <Text twStyle="pt-10 text-center text-xl mb-16" bold>
                            Select category color
                        </Text>
                    }
                    renderItem={renderFunction}
                    initialNumToRender={10}
                    removeClippedSubviews={true}
                />
            </View>
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default SelectCategoryColorScreen;
