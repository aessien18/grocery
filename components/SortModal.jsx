import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SORT_OPTIONS = [
  "Relevance",
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
];

export default function SortModal({ visible, selected, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheet}>
          <Text style={styles.title}>Sort By</Text>
          <View style={styles.divider} />
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
              <Ionicons
                name={
                  selected === option ? "checkmark-circle" : "ellipse-outline"
                }
                size={22}
                color={selected === option ? "#6BCB77" : "#ccc"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 24,
    paddingBottom: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    color: "#222",
  },
});
