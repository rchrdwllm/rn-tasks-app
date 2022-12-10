import type { User } from 'firebase/auth';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = (): [User | undefined, boolean] => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setLoading(true);

            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(undefined);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    return [user, loading];
};
