import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyYOUR_API_KEY", // קחי את ה-API Key מתפריט Firebase Console
  authDomain: "rewardville-129b8.firebaseapp.com",
  databaseURL: "https://rewardville-129b8-default-rtdb.firebaseio.com/", // עדכני את ה-Database URL מהתפריט
  projectId: "rewardville-129b8",
  storageBucket: "rewardville-129b8.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // עדכני מהקונסול
  appId: "1:331336420900:ios:45cf0b18bba01116db2b1", // עדכני מהפרטים בפרויקט שלך
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
