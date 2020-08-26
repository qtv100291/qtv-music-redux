import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAdvK5_3Dzwj9TCLK0bchXRczpXAI7VjlU",
    authDomain: "qtv-music-shop.firebaseapp.com",
    databaseURL: "https://qtv-music-shop.firebaseio.com",
    projectId: "qtv-music-shop",
    storageBucket: "qtv-music-shop.appspot.com",
    messagingSenderId: "486744017757",
    measurementId: "G-9LVF68HCQ8"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
const storageRef = storage.ref();
export default storageRef;
