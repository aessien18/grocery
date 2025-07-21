import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  primaryGreen: "#6BCB77",
  background: "#FAFAFA",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#E0E0E0",
};

export default function PaypalScreen() {
  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handlePay = () => {
    if (!email.trim()) return;
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.back();
      }, 1200);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primaryGreen} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay with Paypal</Text>
      </View>
      <View style={styles.formCard}>
        <Image
          source={require("../assets/images/paypal.png")}
          style={styles.paypalLogo}
        />
        <Text style={styles.label}>Paypal Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Paypal email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.payBtn, !email && { backgroundColor: "#b2dfdb" }]}
          onPress={handlePay}
          disabled={!email || paying}
          activeOpacity={0.85}
        >
          <Text style={styles.payBtnText}>
            {paying ? "Paying..." : "Pay Now"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Success Modal */}
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.successBackdrop}>
          <View style={styles.successModal}>
            <Ionicons
              name="checkmark-circle"
              size={48}
              color={COLORS.primaryGreen}
            />
            <Text style={styles.successText}>Payment Successful!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  formCard: {
    backgroundColor: COLORS.card,
    margin: 18,
    borderRadius: 18,
    padding: 22,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  paypalLogo: {
    width: 80,
    height: 32,
    resizeMode: "contain",
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 4,
    width: "100%",
  },
  payBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    width: "100%",
  },
  payBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  successBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  successModal: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: 240,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  successText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryGreen,
    marginTop: 12,
    textAlign: "center",
  },
});
