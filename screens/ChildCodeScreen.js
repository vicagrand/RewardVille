import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { database } from "../FirebaseConfig";
import { ref, get, set } from "firebase/database";
import { Video } from "expo-av";

export default function ChildCodeScreen({
  onCodeVerified,
  onFirstDay,
  onBack,
}) {
  const [childCode, setChildCode] = useState("");

  const handleCodeSubmit = async () => {
    if (!childCode) {
      Alert.alert("Error", "Please enter a code.");
      return;
    }

    try {
      const snapshot = await get(ref(database, "users"));
      if (snapshot.exists()) {
        const users = snapshot.val();

        let validChild = null;
        let parentId = null;

        // Loop through users to find a child with the matching code
        for (const [id, user] of Object.entries(users)) {
          if (user.children) {
            for (const [childId, child] of Object.entries(user.children)) {
              if (child.code === childCode) {
                validChild = { ...child, id: childId };
                parentId = id;
                break;
              }
            }
          }
          if (validChild) break;
        }

        if (validChild) {
          // Check if it's the child's first day
          const childFirstDayRef = ref(
            database,
            `users/${parentId}/children/${validChild.id}/firstDay`
          );
          const firstDaySnapshot = await get(childFirstDayRef);

          if (!firstDaySnapshot.exists()) {
            // If it's their first day, set the flag and navigate to First Day screen
            await set(childFirstDayRef, true); // Mark their first day in the database
            onFirstDay(validChild.id); // Navigate to First Day screen
          } else {
            Alert.alert(
              "Existing User",
              "You already have an account! Please log in."
            );
          }
        } else {
          Alert.alert("Error", "Invalid code. Please try again.");
        }
      } else {
        Alert.alert("Error", "No users found in the database.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/backgroundcode.mp4")} // Replace with your video file path
        style={StyleSheet.absoluteFill} // Make the video fill the screen
        resizeMode="cover" // Cover the entire screen
        shouldPlay
        isLooping
      />
      <Text style={styles.title}>Enter Your Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your unique code"
        placeholderTextColor="#888"
        value={childCode}
        onChangeText={setChildCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCodeSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    width: "80%",
    backgroundColor: "#f39a57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#f39a57", // Back button color
    alignItems: "center",
    width: "20%",
  },
});
