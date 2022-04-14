// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
getFirestore,
collection,
getDocs,
onSnapshot,
addDoc,
deleteDoc,
doc,
getDoc,
updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAHoMrgPhEW3tl7zoyFkrHWwb34OP5zldg",
authDomain: "innovacenter-c262d.firebaseapp.com",
databaseURL: "https://innovacenter-c262d-default-rtdb.firebaseio.com",
projectId: "innovacenter-c262d",
storageBucket: "innovacenter-c262d.appspot.com",
messagingSenderId: "816290737911",
appId: "1:816290737911:web:6d872652ff712cd8f76df2",
measurementId: "G-BBCYGJP0MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) =>
    addDoc(collection(db, "tasks"),{title, description });

export const getTask = () => getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTak = (id) => getDoc(doc(db, "tasks", id));

export const editTask =(id, newFields) => updateDoc(doc(db, "tasks", id), newFields);


