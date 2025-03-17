import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'blogwebsite-52eef.firebaseapp.com',
    projectId: 'blogwebsite-52eef',
    storageBucket: 'blogwebsite-52eef.firebasestorage.app',
    messagingSenderId: '1050965420407',
    appId: '1:1050965420407:web:eb6a7346161fa7d14ed972'
};

export const app = initializeApp(firebaseConfig);