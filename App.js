import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import ParentRegistrationScreen from "./screens/ParentRegistrationScreen";
import AddChildScreen from "./screens/AddChildScreen";
import ParentDashboard from "./screens/ParentDashboard";
import LoginScreen from "./screens/LoginScreen";
import ChildProgressScreen from "./screens/ChildProgressScreen";
import ChildTasksScreen from "./screens/ChildTasksScreen";
import FirstDayScreen from "./screens/FirstDayScreen";
import ChildCodeScreen from "./screens/ChildCodeScreen"; // Existing screen import for Child login

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Welcome");
  const [parentId, setParentId] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const handleChildSelected = (childId) => {
    setSelectedChildId(childId);
    setCurrentScreen("ChildProgress");
  };

  const handleLogin = (userType) => {
    if (userType === "Parent") {
      setCurrentScreen("Login"); // Navigate to LoginScreen for Parent
    } else if (userType === "Child") {
      setCurrentScreen("ChildCode"); // Navigate to ChildCodeScreen for Child
    }
  };

  const handleLoginParent = (id) => {
    setParentId(id); // Added: Save the logged-in parent's ID
    setCurrentScreen("ParentDashboard"); // Added: Navigate to ParentDashboard after login
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === "Welcome" && (
        <WelcomeScreen
          onCreateAccount={(userType) => {
            if (userType === "Parent") setCurrentScreen("ParentRegistration");
            else setCurrentScreen("ChildCode");
          }}
          onLogin={handleLogin} // Pass handleLogin for Login navigation
        />
      )}
      {currentScreen === "Login" && (
        <LoginScreen
          onLoginParent={(id) => {
            setParentId(id);
            setCurrentScreen("ParentDashboard");
          }}
          onLoginChild={() => setCurrentScreen("ChildTasksScreen")}
          onBack={() => setCurrentScreen("Welcome")} // Navigate back to WelcomeScreen
        />
      )}

      {currentScreen === "ChildCode" && (
        <ChildCodeScreen
          onCodeVerified={(childId, parentId) => {
            setSelectedChildId(childId);
            setParentId(parentId);
            setCurrentScreen("ChildTasks"); // Navigate to ChildTasksScreen
          }}
          onFirstDay={(childId) => {
            setSelectedChildId(childId);
            setCurrentScreen("FirstDayScreen"); // Navigate to FirstDayScreen
          }}
          onBack={() => setCurrentScreen("Welcome")} // Navigate back to WelcomeScreen
        />
      )}

      {currentScreen === "FirstDay" && <FirstDayScreen />}
      {currentScreen === "FirstDay" && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            YOU ARE FIRST DAY HERE!
          </Text>
        </View>
      )}
      {currentScreen === "ChildTasksScreen" && (
        <ChildTasksScreen childId={selectedChildId} parentId={parentId} />
      )}
      {currentScreen === "ParentRegistration" && (
        <ParentRegistrationScreen
          onRegister={(id) => {
            setParentId(id);
            setCurrentScreen("AddChild");
          }}
          onBack={() => setCurrentScreen("Welcome")} // Navigate back to WelcomeScreen
        />
      )}
      {currentScreen === "AddChild" && (
        <AddChildScreen
          parentId={parentId}
          onComplete={() => setCurrentScreen("ParentDashboard")}
        />
      )}
      {currentScreen === "ParentDashboard" && (
        <ParentDashboard
          parentId={parentId}
          onChildSelected={handleChildSelected} // Navigate on child selection
        />
      )}
      {currentScreen === "ChildProgress" && (
        <ChildProgressScreen
          childId={selectedChildId}
          parentId={parentId} // Pass both childId and parentId
        />
      )}
    </View>
  );
}
