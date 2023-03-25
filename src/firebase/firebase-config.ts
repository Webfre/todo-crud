import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDck5PzvxcPnfj-oKpZUO3TbQVvvhP9Zhc',
  authDomain: 'todocrud11.firebaseapp.com',
  projectId: 'todocrud11',
  storageBucket: 'todocrud11.appspot.com',
  messagingSenderId: '887363383487',
  appId: '1:887363383487:web:2b58c0d0bdb5ff9784960a',
  measurementId: 'G-HFCMTY92FH',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
