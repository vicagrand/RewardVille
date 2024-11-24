// AddChildScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { database } from "../FirebaseConfig";
import { ref, update } from "firebase/database";
import { Video } from "expo-av"; // Import the Video component

export default function AddChildScreen({ parentId, onComplete }) {
  const [children, setChildren] = useState([]);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");

  const generateUniqueCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const addChild = () => {
    if (!childName || !childAge) {
      Alert.alert("Error", "Please fill out both name and age.");
      return;
    }

    const childCode = generateUniqueCode();
    setChildren([
      ...children,
      { name: childName, age: childAge, code: childCode },
    ]);
    setChildName("");
    setChildAge("");
  };

  const saveChildren = async () => {
    if (children.length === 0) {
      Alert.alert("Error", "Please add at least one child.");
      return;
    }

    const childrenData = {};
    children.forEach((child, index) => {
      childrenData[`child${index + 1}`] = child;
    });

    try {
      await update(ref(database, `users/${parentId}/children`), childrenData);
      Alert.alert("Success", "Children added successfully!");
      onComplete(); // Navigate to ParentDashboard after saving
    } catch (error) {
      Alert.alert("Error", "Failed to save children: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/addchild.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Add Your Children</Text>
        <FlatList
          data={children}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.childFrame}>
              <Text style={styles.childText}>Name: {item.name}</Text>
              <Text style={styles.childText}>Age: {item.age}</Text>
              <Text style={styles.childCodeText}>Code: {item.code}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noChildrenText}>No children added yet.</Text>
          }
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Child's Name"
        value={childName}
        onChangeText={setChildName}
      />
      <TextInput
        style={styles.input}
        placeholder="Child's Age"
        value={childAge}
        onChangeText={setChildAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addChild}>
        <Text style={styles.buttonText}>Add Child</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={saveChildren}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  childText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  noChildrenText: {
    fontSize: 16,
    color: "#888",
    marginVertical: 10,
  },
  input: {
    width: "80%", // הצרת רוחב השדות
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    elevation: 2, // הוספת הצללה
  },
  button: {
    width: "80%", // התאמה לרוחב השדות
    backgroundColor: "#f39a57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    elevation: 2, // הוספת הצללה
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  childFrame: {
    width: "110%",
    backgroundColor: "#fff", // Frame background color
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Border thickness
    borderColor: "#ddd", // Border color
    padding: 15, // Padding inside the frame
    marginVertical: 10, // Space between frames
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
  },
  childCodeText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  contentContainer: {
    flex: 1, // Allow it to grow and push content down
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -500, // Add extra margin at the bottom to push it lower
  },
});
