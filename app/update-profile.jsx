import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
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
  accent: "#FFD93D",
};

export default function UpdateProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const router = useRouter();
  const saveAnim = useRef(new Animated.Value(1)).current;

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    setSaving(true);
    Animated.sequence([
      Animated.timing(saveAnim, {
        toValue: 0.95,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(saveAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.back();
      }, 1200);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header with Avatar */}
      <LinearGradient
        colors={[COLORS.primaryGreen, COLORS.background]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientHeader}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primaryGreen} />
        </TouchableOpacity>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../assets/images/person.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Update Personal Information</Text>
      </LinearGradient>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.formCard}>
          <View style={styles.inputRow}>
            <Ionicons
              name="person-outline"
              size={20}
              color={focus.name ? COLORS.primaryGreen : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                focus.name && {
                  borderColor: COLORS.primaryGreen,
                  backgroundColor: "#e8f5e9",
                },
              ]}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              onFocus={() => setFocus((f) => ({ ...f, name: true }))}
              onBlur={() => setFocus((f) => ({ ...f, name: false }))}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputRow}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={focus.email ? COLORS.primaryGreen : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                focus.email && {
                  borderColor: COLORS.primaryGreen,
                  backgroundColor: "#e8f5e9",
                },
              ]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocus((f) => ({ ...f, email: true }))}
              onBlur={() => setFocus((f) => ({ ...f, email: false }))}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputRow}>
            <Ionicons
              name="call-outline"
              size={20}
              color={focus.phone ? COLORS.primaryGreen : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                focus.phone && {
                  borderColor: COLORS.primaryGreen,
                  backgroundColor: "#e8f5e9",
                },
              ]}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              onFocus={() => setFocus((f) => ({ ...f, phone: true }))}
              onBlur={() => setFocus((f) => ({ ...f, phone: false }))}
              returnKeyType="done"
            />
          </View>
          <Animated.View style={{ transform: [{ scale: saveAnim }] }}>
            <TouchableOpacity
              style={[
                styles.saveBtn,
                (!name || !email || !phone) && { backgroundColor: "#b2dfdb" },
              ]}
              onPress={handleSave}
              disabled={!name || !email || !phone || saving}
              activeOpacity={0.85}
            >
              {saving ? (
                <Ionicons
                  name="reload"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
              ) : null}
              <Text style={styles.saveBtnText}>
                {saving ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
      {/* Success Modal */}
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.successBackdrop}>
          <View style={styles.successModal}>
            <Ionicons
              name="checkmark-circle"
              size={48}
              color={COLORS.primaryGreen}
            />
            <Text style={styles.successText}>Profile Updated!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  gradientHeader: {
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    elevation: 2,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    alignItems: "center",
    paddingTop: 18,
    paddingHorizontal: 0,
  },
  backBtn: {
    position: "absolute",
    left: 18,
    top: 18,
    zIndex: 2,
    padding: 4,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    elevation: 2,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 8,
    zIndex: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.card,
    backgroundColor: COLORS.background,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 14,
    padding: 4,
    borderWidth: 2,
    borderColor: COLORS.card,
    elevation: 2,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
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
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 0,
  },
  saveBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  saveBtnText: {
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
