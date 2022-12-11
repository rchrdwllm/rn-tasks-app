import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AddTaskButton from '../../components/AddTaskButton';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Drawer from '../../components/Drawer';
import TodayTasks from '../../components/TodayTasks';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import { collection, DocumentData, getDocs, Query, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const scale = useSharedValue(1);
    const borderRadius = useSharedValue(0);
    const xValue = useSharedValue(0);
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const { tasksReceived } = useActions();
    const [user] = useAuth();

    const getTasks = async () => {
        tasksReceived([]);

        if (user) {
            const q: Query<DocumentData> = query(collection(db, 'tasks'), where('belongsToUser', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const tasks = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            tasksReceived(tasks);
        }
    };

    useEffect(() => {
        getTasks();
    }, [user]);

    const drawerAnim = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withTiming(scale.value, {
                        duration: 750,
                        easing: Easing.bezier(0.16, 1, 0.3, 1),
                    }),
                },
                {
                    translateX: withTiming(xValue.value, {
                        duration: 750,
                        easing: Easing.bezier(0.16, 1, 0.3, 1),
                    }),
                },
            ],
            borderRadius: withTiming(borderRadius.value, {
                duration: 750,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
        }),
        []
    );

    useEffect(() => {
        if (shouldOpen) {
            scale.value = 0.85;
            borderRadius.value = 48;
            xValue.value = width * 0.9;

            setBackgroundColorAsync('#1e3a8a');
            setButtonStyleAsync('light');
        } else {
            scale.value = 1;
            borderRadius.value = 0;
            xValue.value = 0;

            setBackgroundColorAsync('#F9FAFF');
            setButtonStyleAsync('dark');
        }
    }, [shouldOpen]);

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
        });

        const unsubscribe = navigation.addListener('blur', () => {
            setTimeout(() => {
                setShouldOpen(false);
            }, 500);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-blue-900">
            <Drawer onPress={() => setShouldOpen(!shouldOpen)} shouldOpen={shouldOpen} />
            <Animated.View
                style={[
                    {
                        backgroundColor: '#F9FAFF',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        flex: 1,
                        elevation: 30,
                    },
                    drawerAnim,
                ]}
            >
                <TodayTasks setShouldOpen={setShouldOpen} shouldOpen={shouldOpen} />
            </Animated.View>
            <AddTaskButton shouldOpen={shouldOpen} />
            <StatusBar style={shouldOpen ? 'light' : 'dark'} />
        </SafeAreaView>
    );
};

export default HomeScreen;
