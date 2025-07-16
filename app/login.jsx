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
  border: "#E0E0E0",
};

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Log in to your account using email{"\n"}or social networks
      </Text>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.socialBtn}>
        <Ionicons
          name="logo-apple"
          size={22}
          color="#222"
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Login with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Ionicons
          name="logo-google"
          size={22}
          color="#EA4335"
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or continue with social account</Text>
        <View style={styles.divider} />
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={COLORS.textSecondary}
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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot Password ?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View style={styles.registerRow}>
        <Text style={styles.registerText}>Didn’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/siginin")}>
          <Text style={styles.registerLink}>Register</Text>
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
    fontSize: 26,
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
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: width * 0.85,
    paddingVertical: 12,
    marginBottom: 12,
    justifyContent: "center",
  },
  socialIcon: {
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 8,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  input: {
    width: width * 0.85,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
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
  forgotBtn: {
    alignSelf: "flex-end",
    marginRight: width * 0.075,
    marginTop: 8,
    marginBottom: 18,
  },
  forgotText: {
    color: COLORS.primaryGreen,
    fontSize: 14,
    fontWeight: "500",
  },
  loginBtn: {
    width: width * 0.85,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
    marginTop: 6,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  registerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: COLORS.primaryGreen,
    fontWeight: "bold",
    fontSize: 14,
  },
});
