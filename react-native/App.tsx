import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardIcon}>👥</Text>
        <Text style={styles.cardTitle}>Users</Text>
        <Text style={styles.cardValue}>1,245</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardIcon}>📦</Text>
        <Text style={styles.cardTitle}>Orders</Text>
        <Text style={styles.cardValue}>320</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardIcon}>💰</Text>
        <Text style={styles.cardTitle}>Revenue</Text>
        <Text style={styles.cardValue}>$12,500</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});
