import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = {
  primaryGreen: "#6BCB77",
  accentYellow: "#FFD93D",
  background: "#F5F5F5",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#E0E0E0",
};

export default function OnboardingStep2() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#F5F5F5", "#E8F8EF"]} style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.skipText}>Skip</Text>
        <View style={styles.skipCircle}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Image with shadow */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/onboarding1.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Pagination Dots */}
        <View style={styles.dots}>
          <View style={styles.inactiveDot} />
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>
        {/* Title */}
        <Text style={styles.title}>
          We Deliver Grocery{"\n"}at Your Doorstep
        </Text>
        {/* Description */}
        <Text style={styles.desc}>
          It is a long established fact that a reader will be distracted by the
          readable.
        </Text>
        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push("/login")}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 56 : 36,
  },
  skipBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 36,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  skipText: {
    color: COLORS.primaryGreen,
    fontSize: 18,
    marginRight: 8,
    fontWeight: "500",
  },
  skipCircle: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    width: width,
    alignItems: "center",
    marginTop: 12,
    marginBottom: -40,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: width * 0.92,
    height: height * 0.62,
    borderRadius: 32,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 40,
    width: width * 0.92,
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 24,
    marginTop: -48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  dots: {
    flexDirection: "row",
    marginBottom: 22,
    marginTop: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryGreen,
    marginHorizontal: 6,
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
    marginHorizontal: 6,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
    marginTop: 8,
    letterSpacing: 0.2,
  },
  desc: {
    color: COLORS.textSecondary,
    fontSize: 17,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  nextBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 32,
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
});
