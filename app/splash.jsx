import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// App color scheme
const COLORS = {
  primaryGreen: "#6BCB77",
  accentYellow: "#FFD93D",
  background: "#FAFAFA",
  textPrimary: "#222222",
  textSecondary: "#666666",
  error: "#FF5C5C",
  button: "#6BCB77",
  buttonText: "#fff",
  border: "#E0E0E0",
};

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const veggiesAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    Animated.timing(veggiesAnim, {
      toValue: { x: 40, y: -40 }, // Move 40 right and 40 up (adjust as needed)
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, ["veggiesAnim"]);

  const handlePress = () => {
    router.push("/ONBOARDING/step1");
  };

  return (
    <View style={styles.container}>
      {/* Background gradient using primary green and background color */}
      <LinearGradient
        colors={[COLORS.primaryGreen, COLORS.background]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.imageWrapper,
          { transform: veggiesAnim.getTranslateTransform() },
        ]}
      >
        <Image
          source={require("../assets/images/veggie.png")}
          style={styles.vegetables}
          resizeMode="contain"
        />
      </Animated.View>
      {/* Gradient overlay to blend the top of the veggies image */}
      <LinearGradient
        colors={[COLORS.background, COLORS.background + "CC", "transparent"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.veggieBlend}
        pointerEvents="none"
      />
      {/* Existing bottom gradient for premium look */}
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.85)", COLORS.background]}
        style={styles.gradient}
        pointerEvents="none"
      />
      {/* Onboarding Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: height * 0.28, // slightly higher
    left: 0,
    right: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 150,
  },
  imageWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: height * 0.28,
    zIndex: 1,
  },
  image: {
    width: width,
    height: height * 0.28,
  },
  vegetables: {
    width: width,
    height: height * 0.28,
    position: "absolute",
    bottom: 0,
  },
  veggieBlend: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 120, // or higher if needed
    width: width,
    zIndex: 2,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.18,
    width: width,
  },
  button: {
    position: "absolute",
    bottom: 48,
    alignSelf: "center",
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 32,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 10, // <-- Add this
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
