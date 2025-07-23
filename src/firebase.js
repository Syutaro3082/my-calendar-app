// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ここは Firebase コンソールの設定からコピーしてください
const firebaseConfig = {
  apiKey: "ここに自分のAPIキー",
  authDomain: "ここに自分のauthDomain",
  projectId: "ここに自分のプロジェクトID",
  storageBucket: "ここに自分のstorageBucket",
  messagingSenderId: "ここに自分のmessagingSenderId",
  appId: "ここに自分のappId"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
