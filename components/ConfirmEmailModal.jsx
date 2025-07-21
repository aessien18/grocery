import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const COLORS = {
  primaryGreen: "#6BCB77",
  background: "#181F1B",
  card: "#232B25",
  textPrimary: "#fff",
  textSecondary: "#D1D5DB",
};

export default function ConfirmEmailModal({
  visible,
  email,
  onCancel,
  onNext,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.confirmModalCard}>
          <Text style={styles.confirmTitle}>Verify Your Email Address</Text>
          <Text style={styles.confirmEmail}>{email}</Text>
          <Text style={styles.confirmDesc}>
            We will send the authentication code to the email address you
            entered.{"\n"}
            Do you want to continue?
          </Text>
          <View style={styles.confirmActions}>
            <TouchableOpacity
              style={styles.confirmCancelBtn}
              onPress={onCancel}
            >
              <Text style={styles.confirmCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmNextBtn} onPress={onNext}>
              <Text style={styles.confirmNextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmModalCard: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  confirmEmail: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 14,
    textAlign: "center",
  },
  confirmDesc: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 22,
    textAlign: "center",
  },
  confirmActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  confirmCancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  confirmCancelText: {
    color: COLORS.primaryGreen,
    fontWeight: "600",
    fontSize: 16,
  },
  confirmNextBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  confirmNextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
