import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartBar({ itemCount, total, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.cartIconWrapper}>
          <Ionicons name="cart" size={28} color="#4CAF50" />
        </View>
        <View>
          <Text style={styles.itemsText}>{itemCount} Items</Text>
          <Text style={styles.totalText}>${total}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>View Cart</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="#fff"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  itemsText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#222",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
