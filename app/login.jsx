import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const router = useRouter();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleLogin = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmNext = () => {
    setConfirmModalVisible(false);
    router.replace("/(tabs)");
  };

  return (
    <LinearGradient
      colors={["#e8f5e9", "#fff"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
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
          <Text style={styles.dividerText}>
            Or continue with social account
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Input Fields */}
        <TextInput
          style={[styles.input, email.length > 0 && { borderColor: "#6BCB77" }]}
          placeholder="Email Address"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              { flex: 1, marginBottom: 0 },
              password.length > 0 && { borderColor: "#6BCB77" },
            ]}
            placeholder="Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeBtn}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
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
          style={[
            styles.loginBtn,
            (!email || !password) && { backgroundColor: "#b2dfdb" },
          ]}
          onPress={handleLogin}
          disabled={!email || !password || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <Text style={styles.loginText}>Loading...</Text>
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Didn’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/siginin")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
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
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.confirmCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmNextBtn}
                onPress={handleConfirmNext}
              >
                <Text style={styles.confirmNextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmModalCard: {
    backgroundColor: "#181F1B",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  confirmEmail: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  confirmDesc: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmCancelBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  confirmCancelText: {
    color: COLORS.primaryGreen,
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmNextBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  confirmNextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
