import Pressable from './Pressable';
import { PlusIcon } from 'react-native-heroicons/outline';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useNavigation } from '@react-navigation/native';

const AddTaskButton = () => {
    const navigation = useNavigation();

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    elevation: 10,
                    height: 65,
                    width: 65,
                }}
            >
                <Pressable onPress={() => navigation.navigate('NewTaskScreen')}>
                    <Shadow
                        containerStyle={{
                            marginBottom: 32,
                        }}
                        distance={20}
                        startColor={'#67a1ff73'}
                        endColor={'#ffffff00'}
                        offset={[7, 20]}
                        style={{
                            borderRadius: 100,
                            height: 50,
                            width: 50,
                        }}
                    >
                        <View className="justify-center items-center rounded-full h-[65] w-[65] bg-blue-500">
                            <PlusIcon size={28} color="white" />
                        </View>
                    </Shadow>
                </Pressable>
            </View>
        </>
    );
};

export default AddTaskButton;
