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
import { ref, set } from "firebase/database";
import { Video } from "expo-av"; // Import the Video component

export default function ParentRegistrationScreen({ onRegister, onBack }) {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!parentName || !email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const parentId = `parent${Date.now()}`;
    set(ref(database, `users/${parentId}`), {
      name: parentName,
      email,
      password,
      children: {},
    })
      .then(() => {
        Alert.alert("Success", "Registration complete!");
        onRegister(parentId);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/backgroundcode.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <Text style={styles.title}>Parent Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={parentName}
        onChangeText={setParentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 15,
    backgroundColor: "#fff", // Set background color to white
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2, // Optional: Add a shadow for a non-flat look
  },
  button: {
    backgroundColor: "#f39a57",
    padding: 15,
    width: "50%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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
