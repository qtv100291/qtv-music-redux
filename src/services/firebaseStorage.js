import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBcqKFIc8p0WZsMdCq9MD1bKI205FCb3so",
    authDomain: "qtv-music.firebaseapp.com",
    databaseURL: "https://qtv-music.firebaseio.com",
    projectId: "qtv-music",
    storageBucket: "qtv-music.appspot.com",
    messagingSenderId: "515984949894",
    appId: "1:515984949894:web:2177ebd6f99dfc9da18707",
    measurementId: "G-40SFKG9SPR"
};
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
const storageRef = storage.ref();
export default storageRef;
