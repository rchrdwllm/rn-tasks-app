import { View, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Text from '../../components/Text';
import Pressable from '../../components/Pressable';
import { Shadow } from 'react-native-shadow-2';
import { ArrowRightIcon, PhotoIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import cloudinary from '../../config/cloudinary';

const SetNameScreen = () => {
    const [hasGalleryPermission, setGalleryPermission] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
    const [user] = useAuth();
    const { userUpdated } = useActions();

    if (!user) return null;

    const handleAddPfp = async () => {
        setLoading(true);

        if (hasGalleryPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0]);
            }
        }
    };

    const handleUpdatePfp = async () => {
        if (image) {
            const result = await cloudinary.uploader.upload(image.uri, {
                folder: 'user-pfps',
                width: 300,
                crop: 'scale',
            });

            userUpdated({
                id: user.uid,
                changes: {
                    pfp: {
                        publicId: result.public_id,
                        secureUrl: result.secure_url,
                    },
                },
            });
        }
    };

    const updatePermissions = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

        setGalleryPermission(galleryStatus.status === 'granted');
    };

    useEffect(() => {
        if (image) handleUpdatePfp();
    }, [image]);

    useEffect(() => {
        updatePermissions();
    }, []);

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                backgroundColor: '#F9FAFF',
            }}
        >
            <View className="flex-1 justify-center items-stretch px-8">
                <Text bold twStyle="text-4xl">
                    Choose a profile picture!
                </Text>
                {image ? (
                    <Pressable twStyle="bg-gray-200 h-[200] w-[200] rounded-full overflow-hidden mx-auto mt-8">
                        <Image
                            source={{
                                uri: image.uri,
                            }}
                            style={{
                                height: 200,
                                width: 200,
                            }}
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={handleAddPfp}
                        twStyle="justify-center items-center bg-gray-200 h-[200] w-[200] rounded-full mx-auto mt-8"
                    >
                        <PhotoIcon size={50} color="gray" />
                    </Pressable>
                )}
            </View>
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
                <Pressable onPress={handleUpdatePfp}>
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
                            {loading ? <ActivityIndicator color="#fff" /> : <ArrowRightIcon size={28} color="white" />}
                        </View>
                    </Shadow>
                </Pressable>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

export default SetNameScreen;
