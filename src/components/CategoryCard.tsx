import { FunctionComponent, useEffect } from 'react';

import { View } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';
import { Shadow } from 'react-native-shadow-2';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { memo, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { selectByCategory, selectCompletedCategoryTasks, Task } from '../redux/slices/tasksSlice';
import { selectCategoryById } from '../redux/slices/categoriesSlice';
import { useSelector } from 'react-redux';

interface CategoryCardProps {
    id: string;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({ id }) => {
    const navigation = useNavigation();
    const category = useSelector((state: any) => selectCategoryById(state, id));
    const categoryTasks: Task[] = useSelector((state: any) => selectByCategory(state, id));
    const completedCategoryTasks: Task[] = useSelector((state: any) => selectCompletedCategoryTasks(state, id));
    const [viewWidth, setViewWidth] = useState(0);
    const progress = useSharedValue(-136);

    if (!category) return null;

    const { category: name, color } = category;

    const progressAnim = useAnimatedStyle(
        () => ({
            width: withTiming(progress.value, { duration: 500 }),
        }),
        []
    );

    useEffect(() => {
        progress.value = (completedCategoryTasks.length / categoryTasks.length) * viewWidth;
    }, [completedCategoryTasks, categoryTasks, viewWidth]);

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
                        <View
                            onLayout={e => setViewWidth(e.nativeEvent.layout.width)}
                            className="mt-2 rounded-full h-1 overflow-hidden"
                        >
                            <Animated.View
                                className="h-1 flex-1"
                                style={[
                                    {
                                        backgroundColor: color.color,
                                    },
                                    progressAnim,
                                ]}
                            ></Animated.View>
                        </View>
                    </View>
                </Shadow>
            </Pressable>
        </View>
    );
};

export default memo(CategoryCard);
