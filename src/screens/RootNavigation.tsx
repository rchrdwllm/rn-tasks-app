import { NavigationContainer } from '@react-navigation/native';
import UserStack from './user-stack';
import AuthStack from './auth-stack';

import { useAuth } from '../hooks/useAuth';

const RootNavigation = () => {
    const user = useAuth();

    return <NavigationContainer>{user ? <UserStack /> : <AuthStack />}</NavigationContainer>;
};

export default RootNavigation;
