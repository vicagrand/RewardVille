import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TasksScreen({ parentId }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Parent ID: {parentId}</Text>
      <Text>Here you can manage your tasks!</Text>
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
  },
});
