// FirstDayScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FirstDayScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YOU ARE FIRST DAY HERE!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
  },
});
