import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
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

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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

      {/* Image */}
      <Image
        source={require("../../assets/images/onboarding1.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Card */}
      <View style={styles.card}>
        {/* Pagination Dots */}
        <View style={styles.dots}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
        </View>
        {/* Title */}
        <Text style={styles.title}>Buy Groceries Easily{"\n"}with Us</Text>
        {/* Description */}
        <Text style={styles.desc}>
          It is a long established fact that a reader will be distracted by the
          readable.
        </Text>
        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push("/ONBOARDING/step2")}
        >
          <Ionicons name="arrow-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 48,
  },
  skipBtn: {
    position: "absolute",
    top: 48,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
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
  image: {
    width: width * 0.9,
    height: height * 0.6,
    marginTop: 8,
    marginBottom: 0,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 40,
    width: width * 0.92,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginTop: -32, // Move card up to overlap image
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  dots: {
    flexDirection: "row",
    marginBottom: 18,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryGreen,
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  desc: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  nextBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 32,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
