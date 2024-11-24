import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { database } from "../FirebaseConfig";
import { ref, get } from "firebase/database";

export default function ChildProgressScreen({ childId, parentId }) {
  const [childData, setChildData] = useState(null);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const snapshot = await get(
          ref(database, `users/${parentId}/children/${childId}`)
        );
        if (snapshot.exists()) {
          setChildData(snapshot.val());
        } else {
          console.log("No data available for this child");
        }
      } catch (error) {
        console.error("Error fetching child data:", error);
      }
    };

    if (childId && parentId) {
      fetchChildData();
    }
  }, [childId, parentId]);

  if (!childData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading child data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>
        Here you can see progress for your child
      </Text>
      <Text style={styles.title}>{childData.name}'s Progress</Text>
      <Text style={styles.subtitle}>Age: {childData.age}</Text>
      {childData.tasks ? (
        <Text style={styles.subtitle}>Tasks Progress: {childData.tasks}</Text>
      ) : (
        <Text style={styles.errorText}>
          No tasks available for this child yet.
        </Text>
      )}
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
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#4CAF50",
    textAlign: "center",
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
  errorText: {
    fontSize: 16,
    color: "#888",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
});
