import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { database } from "../FirebaseConfig";
import { ref, get } from "firebase/database";
import { Video } from "expo-av"; // Import the Video component

export default function TasksScreen({ parentId, onChildSelected }) {
  const [parentName, setParentName] = useState(""); // משתנה לאחסון שם ההורה
  const [children, setChildren] = useState([]); // משתנה לאחסון רשימת הילדים

  useEffect(() => {
    // שאיבת המידע של ההורה והילדים מ-Firebase
    const fetchParentData = async () => {
      try {
        const snapshot = await get(ref(database, `users/${parentId}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setParentName(data.name || "Parent"); // הגדרת שם ההורה
          const childrenData = data.children || {}; // אחזור נתוני הילדים
          const childrenList = Object.entries(childrenData).map(
            ([id, child]) => ({
              id, // ID הילד
              ...child,
            })
          );
          setChildren(childrenList);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    if (parentId) {
      fetchParentData();
    }
  }, [parentId]);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/addchild.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <Text style={styles.title}>WELCOME, {parentName}!</Text>
      <Text style={styles.subtitle}>Select a child to see their progress:</Text>

      {/* רשימת הילדים */}
      <FlatList
        data={children}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.childButton}
            onPress={() => onChildSelected(item.id)} // Ensure this calls the callback correctly
          >
            <Text style={styles.childText}>{item.name}</Text>
            <Text style={styles.childCodeText}>Code: {item.code}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noChildrenText}>
            You have not added any children yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    marginBottom: 20,
    color: "#555",
  },
  childButton: {
    width: "100%", // מתיחה של הכפתור לרוחב
    padding: 15,
    backgroundColor: "#f39a57",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    elevation: 3, // הצללה לכפתור
  },
  childText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  childCodeText: {
    fontSize: 14,
    color: "#d9f8c4",
    marginTop: 5,
  },
  noChildrenText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});
