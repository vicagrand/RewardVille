import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Animated,
} from "react-native";
import { Video } from "expo-av";
import { database } from "../FirebaseConfig";
import { ref, get } from "firebase/database";

export default function LoginScreen({
  onLoginParent,
  onLoginChild,
  onSignup,
  onBack,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    get(ref(database, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const users = snapshot.val();
          const user = Object.entries(users).find(
            ([id, user]) => user.email === email && user.password === password
          );

          if (user) {
            // נבדוק אם המשתמש הוא הורה
            if (user[1]?.children) {
              Alert.alert("Success", "Logged in successfully as Parent!");
              onLoginParent(user[0]); // מעבר להורה
            } else {
              Alert.alert("Success", "Logged in successfully as Child!");
              onLoginChild(); // מעבר לילד
            }
          } else {
            Alert.alert("Error", "Invalid email or password.");
          }
        } else {
          Alert.alert("Error", "No users found.");
        }
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
      <Text style={styles.title}>Login!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
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
  linkText: {
    color: "#FF8C00",
    marginTop: 15,
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
