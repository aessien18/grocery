import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  primaryGreen: "#6BCB77",
  accentYellow: "#FFD93D",
  background: "#FAFAFA",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#6BCB77",
};

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.subtitle}>
        Set up your username and password.{"\n"}You can always change it later.
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Smith Mate"
        placeholderTextColor={COLORS.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder="smithmate@example.com"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="(205) 555-0100"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="phone-pad"
      />
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Password"
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eyeBtn}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={!showConfirm}
        />
        <TouchableOpacity
          onPress={() => setShowConfirm((prev) => !prev)}
          style={styles.eyeBtn}
        >
          <Ionicons
            name={showConfirm ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.loginLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 64 : 36,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 22,
    textAlign: "center",
    lineHeight: 20,
  },
  input: {
    width: width * 0.85,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    marginBottom: 0,
  },
  eyeBtn: {
    position: "absolute",
    right: 16,
    top: 12,
    padding: 4,
  },
  signupBtn: {
    width: width * 0.85,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
    marginTop: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primaryGreen,
    fontWeight: "bold",
    fontSize: 14,
  },
});
