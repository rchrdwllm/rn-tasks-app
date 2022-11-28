import type { FunctionComponent } from 'react';

import { View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';
import { Shadow } from 'react-native-shadow-2';

import { useNavigation } from '@react-navigation/native';
import { selectByCategory, Task } from '../redux/slices/tasksSlice';
import { useSelector } from 'react-redux';

interface CategoryCardProps {
    name: string;
    category: string;
    color: string;
    index: number;
    id: string;
}

/* 
containerStyle={{
                            marginBottom: 32,
                        }}
                        distance={15}
                        startColor={'#dbeafe50'}
                        endColor={'#ffffff00'}
                        offset={[0, 15]}
                        style={{
                            borderRadius: 20,
                        }}
                        stretch
*/

const CategoryCard: FunctionComponent<CategoryCardProps> = ({ name, color, index, id }) => {
    const navigation = useNavigation();
    const categoryTasks: Task[] = useSelector((state: any) => selectByCategory(state, id));

    return (
        <View>
            <Pressable
                onPress={() => {
                    navigation.navigate('CategoryScreen', { id });
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
                    <View className={`bg-white rounded-2xl p-5 w-44`}>
                        <Text twStyle="text-500 text-slate-400" medium>
                            {categoryTasks.length} {categoryTasks.length === 1 ? 'task' : 'tasks'}
                        </Text>
                        <Text twStyle="text-2xl mt-1" bold>
                            {name}
                        </Text>
                        <View className="mt-2 rounded-full h-1 overflow-hidden">
                            <View
                                className="flex-1"
                                style={{
                                    backgroundColor: color,
                                }}
                            ></View>
                        </View>
                    </View>
                </Shadow>
            </Pressable>
        </View>
    );
};

export default CategoryCard;
