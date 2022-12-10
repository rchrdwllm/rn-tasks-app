import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: 'AIzaSyAfy21BFMHvkV-EQsj-M0N8nRvTYaaJS3Q',
    authDomain: 'rn-tasks-app-e351c.firebaseapp.com',
    projectId: 'rn-tasks-app-e351c',
    storageBucket: 'rn-tasks-app-e351c.appspot.com',
    messagingSenderId: '422901416815',
    appId: '1:422901416815:web:2854ef3cc576c1e1c39e9a',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
