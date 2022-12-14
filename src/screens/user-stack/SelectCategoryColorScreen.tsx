import type { Color } from '../../constants/colors';

import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../../components/Text';
import Pressable from '../../components/Pressable';
import BigList from 'react-native-big-list';
import DownButton from '../../components/DownButton';

import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';

const SelectCategoryColorScreen = () => {
    const navigation = useNavigation();

    const renderFunction = ({ item }: { item: Color }) => (
        <Pressable
            onPress={() => {
                navigation.navigate('NewCategoryScreen', { selectedColor: item });
            }}
            twStyle="flex-row items-center bg-white py-4 px-6 space-x-3 rounded-3xl -mt-10"
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    backgroundColor: item.color,
                }}
                className="rounded-full"
            ></View>
            <View>
                <Text>{item.name}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <BigList
                data={colors}
                keyExtractor={(item: Color) => item.id}
                ListHeaderComponent={
                    <View className="flex-row items-center justify-between pt-10">
                        <Text twStyle="text-center text-xl" bold>
                            Select category color
                        </Text>
                        <DownButton />
                    </View>
                }
                renderItem={renderFunction}
                itemHeight={98}
                headerHeight={190}
                contentContainerStyle={{ paddingHorizontal: 26 }}
            />
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default SelectCategoryColorScreen;
