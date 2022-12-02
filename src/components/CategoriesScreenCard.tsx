import type { FunctionComponent, ReactNode } from 'react';

import { View, Animated } from 'react-native';
import Text from './Text';
import Pressable from './Pressable';
import { Shadow } from 'react-native-shadow-2';
import { Swipeable } from 'react-native-gesture-handler';
import { TrashIcon } from 'react-native-heroicons/outline';

import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { selectByCategory } from '../redux/slices/tasksSlice';
import { selectCategoryById } from '../redux/slices/categoriesSlice';

interface CategoriesScreenCardProps {
    id: string;
}

const CategoriesScreenCard: FunctionComponent<CategoriesScreenCardProps> = ({ id }) => {
    const navigation = useNavigation();
    const swipeableRef = useRef<Swipeable>(null);
    const category = useSelector((state: any) => selectCategoryById(state, id));
    const categoryTasksLength: number = useSelector((state: any) => selectByCategory(state, id)).length;
    const { removeCategory } = useActions();

    if (!category) return null;

    const { category: name, color } = category;

    const handleRemoveCategory = () => {
        if (swipeableRef.current) {
            swipeableRef.current.close();
        }

        setTimeout(() => {
            removeCategory(id);
        }, 500);
    };

    const rightSwipe = (_: any, dragX: any): ReactNode => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0.5, 0],
        });

        return (
            <Pressable onPress={handleRemoveCategory} twStyle="flex-1 bg-red-500 mr-6 w-20 mt-2 rounded-3xl">
                <Animated.View
                    style={{
                        transform: [{ scale: scale }],
                    }}
                    className="flex-1 justify-center items-center"
                >
                    <TrashIcon size={24} color="white" />
                </Animated.View>
            </Pressable>
        );
    };

    return (
        <View className="-mt-8">
            <Pressable
                onPress={() =>
                    navigation.navigate('CategoryScreen', {
                        id,
                    })
                }
            >
                <Shadow
                    containerStyle={{
                        marginBottom: 32,
                    }}
                    distance={10}
                    startColor={'#dbeafe24'}
                    endColor={'#ffffff00'}
                    offset={[0, 10]}
                    style={{
                        borderRadius: 20,
                    }}
                    stretch
                >
                    <Swipeable
                        ref={swipeableRef}
                        containerStyle={{
                            paddingHorizontal: 24,
                        }}
                        renderRightActions={rightSwipe}
                    >
                        <View className="flex-row items-center space-x-5 bg-white rounded-3xl p-5 mt-2">
                            <View
                                style={{
                                    backgroundColor: color.color,
                                }}
                                className="h-10 w-10 rounded-full"
                            ></View>
                            <View>
                                <Text twStyle="text-slate-500">
                                    {categoryTasksLength} {categoryTasksLength === 1 ? 'task' : 'tasks'}
                                </Text>
                                <Text twStyle="text-lg">{name}</Text>
                            </View>
                        </View>
                    </Swipeable>
                </Shadow>
            </Pressable>
        </View>
    );
};

export default CategoriesScreenCard;
