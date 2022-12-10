import { ActivityIndicator, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import UserStack from './user-stack';
import AuthStack from './auth-stack';
import Loading from '../components/Loading';

import { useAuth } from '../hooks/useAuth';

const RootNavigation = () => {
    const [user, loading] = useAuth();

    if (loading) return <Loading loading={loading} />;

    return <NavigationContainer>{user ? <UserStack /> : <AuthStack />}</NavigationContainer>;
};

export default RootNavigation;
