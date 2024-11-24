import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { database } from "../FirebaseConfig";
import { ref, get } from "firebase/database";

export default function TasksScreen({ childId, parentId }) {
  const [childName, setChildName] = useState("");

  useEffect(() => {
    const fetchChildName = async () => {
      try {
        const snapshot = await get(
          ref(database, `users/${parentId}/children/${childId}`)
        );
        if (snapshot.exists()) {
          const childData = snapshot.val();
          setChildName(childData.name || "Child"); // Default to "Child" if no name is found
        } else {
          console.log("No child data found");
        }
      } catch (error) {
        console.error("Error fetching child name:", error);
      }
    };

    if (childId && parentId) {
      fetchChildName();
    }
  }, [childId, parentId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {childName}!</Text>
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
    color: "#333",
  },
});
