import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { Video } from "expo-av"; // Import the Video component

export default function WelcomeScreen({ onCreateAccount, onLogin }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // כדי לדעת אם זה LOGIN או CREATE ACCOUNT

  const handleUserTypeSelection = (userType) => {
    setModalVisible(false);
    if (isLogin) {
      onLogin(userType); // Pass the userType to navigate to the correct login flow
    } else {
      if (userType === "Parent") {
        onCreateAccount("Parent");
      } else {
        onCreateAccount("Child");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Background */}
      <Video
        source={require("../assets/WelcomeRewardVille.mp4")} // Replace with your video file
        style={StyleSheet.absoluteFill} // Make it fill the screen
        resizeMode="cover" // Cover the entire screen
        shouldPlay
        isLooping
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsLogin(false); // הגדרת מצב ל-Create Account
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsLogin(true); // הגדרת מצב ל-Login
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Modal להורה או ילד */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isLogin
                ? "Who Are You? (Login)"
                : "Who Are You? (Create Account)"}
            </Text>

            {/* Parent Button with Image */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleUserTypeSelection("Parent")}
            >
              <Image
                source={require("../assets/parent-icon.png")} // Replace with the actual path to your image
                style={styles.buttonImage}
              />
              <Text style={styles.modalButtonText}>Parent</Text>
            </TouchableOpacity>

            {/* Child Button with Image */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleUserTypeSelection("Child")}
            >
              <Image
                source={require("../assets/child-icon.png")} // Replace with the actual path to your image
                style={styles.buttonImage}
              />
              <Text style={styles.modalButtonText}>Child</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 60, // הכפתורים קרובים לתחתית המסך
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#f39a57", // Original button color
    borderRadius: 8,
    borderWidth: 2, // Border width for the button
    borderColor: "#d17c39", // Slightly darker border color
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 5, height: 3 }, // Shadow offset for X and Y
    shadowOpacity: 0.7, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // רקע שקוף
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 10, // הצללה
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonImage: {
    width: 100, // Width of the image
    height: 100, // Height of the image
    marginRight: 10, // Space between the image and the text
  },
  modalButton: {
    flexDirection: "row", // Arrange image and text in a row
    alignItems: "center", // Center items vertically
    width: "100%",
    padding: 15,
    backgroundColor: "#f39a57",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center", // Center content horizontally
    marginVertical: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "#FF0000",
    fontSize: 14,
  },
});
