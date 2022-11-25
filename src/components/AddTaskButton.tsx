import Pressable from './Pressable';
import { PlusIcon } from 'react-native-heroicons/outline';
import { View } from 'react-native';

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
                <Pressable
                    twStyle="justify-center items-center rounded-full h-[65] w-[65] bg-blue-500"
                    style={{
                        elevation: 10,
                    }}
                    onPress={() => navigation.navigate('NewTaskScreen')}
                >
                    <PlusIcon size={28} color="white" />
                </Pressable>
            </View>
        </>
    );
};

export default AddTaskButton;
