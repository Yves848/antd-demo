import { initializeApp } from "firebase/app";
import 'firebase/database'

const config = {
    apiKey: "AIzaSyA8oFagommLnfQHeoL8kefSd-Ng0btBO-Y",
    authDomain: "flymenus.firebaseapp.com",
    databaseURL: "https://flymenus.firebaseio.com",
    projectId: "flymenus",
    storageBucket: "flymenus.appspot.com",
    messagingSenderId: "785466280841"
};

const app = initializeApp(config);

export const db = app.database();
