import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  primaryGreen: "#6BCB77",
  accentYellow: "#FFD93D",
  background: "#FAFAFA",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#E0E0E0",
  error: "#FF4757",
  blue: "#3B82F6",
  purple: "#A78BFA",
  orange: "#F59E42",
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [avatarAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  // Animate avatar on mount
  React.useEffect(() => {
    Animated.spring(avatarAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  }, [avatarAnim]);

  const handleMenuPress = (cb) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    cb && cb();
  };

  const handleLogout = () => {
    setLogoutVisible(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // TODO: Add actual logout logic
  };

  const ProfileMenuItem = ({
    icon,
    iconColor = COLORS.primaryGreen,
    title,
    subtitle,
    onPress,
    showArrow = true,
    showSwitch = false,
    switchValue = false,
    onSwitchChange = null,
    accessibilityLabel,
  }) => (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && { backgroundColor: "#f1f5f9" },
      ]}
      android_ripple={{ color: COLORS.background }}
      onPress={() => handleMenuPress(onPress)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIcon, { backgroundColor: iconColor + "22" }]}>
          {/* 22 = ~13% opacity */}
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <View style={styles.menuText}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={(v) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onSwitchChange && onSwitchChange(v);
            }}
            trackColor={{ false: COLORS.border, true: COLORS.primaryGreen }}
            thumbColor={switchValue ? COLORS.primaryGreen : "#f4f3f4"}
            ios_backgroundColor={COLORS.border}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            accessibilityLabel={title + " switch"}
          />
        ) : showArrow ? (
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        ) : null}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gradient Header */}
        <LinearGradient
          colors={[COLORS.primaryGreen, COLORS.background]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientHeader}
        >
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
            <TouchableOpacity
              style={styles.settingsBtn}
              accessibilityLabel="Settings"
            >
              <Ionicons
                name="settings-outline"
                size={26}
                color={COLORS.primaryGreen}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarWrapper}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: avatarAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1],
                    }),
                  },
                ],
                shadowColor: COLORS.primaryGreen,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.18,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Image
                source={require("../../assets/images/person.png")}
                style={styles.userAvatar}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.editAvatarBtn}
                accessibilityLabel="Edit profile picture"
              >
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </LinearGradient>

        {/* User Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.userPhone}>+1 (555) 123-4567</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons
              name="bag-check-outline"
              size={22}
              color={COLORS.primaryGreen}
              style={{ marginBottom: 2 }}
            />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons
              name="heart-outline"
              size={22}
              color={COLORS.accentYellow}
              style={{ marginBottom: 2 }}
            />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons
              name="star"
              size={22}
              color={COLORS.orange}
              style={{ marginBottom: 2 }}
            />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileMenuItem
            icon="person-outline"
            iconColor={COLORS.primaryGreen}
            title="Personal Information"
            subtitle="Update your profile details"
            onPress={() => router.push("/update-profile")}
          />
          <ProfileMenuItem
            icon="location-outline"
            iconColor={COLORS.blue}
            title="Addresses"
            subtitle="Manage your delivery addresses"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon="card-outline"
            iconColor={COLORS.purple}
            title="Payment Methods"
            subtitle="Manage your payment options"
            onPress={() => router.push("/checkout")}
          />
          <ProfileMenuItem
            icon="receipt-outline"
            iconColor={COLORS.orange}
            title="Order History"
            subtitle="View your past orders"
            onPress={() => {}}
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <ProfileMenuItem
            icon="notifications-outline"
            iconColor={COLORS.primaryGreen}
            title="Notifications"
            subtitle="Manage your notification preferences"
            showSwitch
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />
          <ProfileMenuItem
            icon="moon-outline"
            iconColor={COLORS.purple}
            title="Dark Mode"
            subtitle="Switch between light and dark themes"
            showSwitch
            switchValue={darkModeEnabled}
            onSwitchChange={setDarkModeEnabled}
          />
          <ProfileMenuItem
            icon="language-outline"
            iconColor={COLORS.blue}
            title="Language"
            subtitle="English (US)"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon="shield-outline"
            iconColor={COLORS.orange}
            title="Privacy & Security"
            subtitle="Manage your privacy settings"
            onPress={() => {}}
          />
        </View>

        {/* Support Section */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Support</Text>
          <ProfileMenuItem
            icon="help-circle-outline"
            iconColor={COLORS.blue}
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon="chatbubble-outline"
            iconColor={COLORS.primaryGreen}
            title="Contact Us"
            subtitle="Reach out to our support team"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon="star-outline"
            iconColor={COLORS.orange}
            title="Rate App"
            subtitle="Rate us on the app store"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon="share-outline"
            iconColor={COLORS.purple}
            title="Share App"
            subtitle="Share with friends and family"
            onPress={() => {}}
          />
        </View>

        {/* Legal Section */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <ProfileMenuItem
            icon="document-text-outline"
            iconColor={COLORS.blue}
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            onPress={() => {}}
          />
          <ProfileMenuItem
            icon="shield-checkmark-outline"
            iconColor={COLORS.primaryGreen}
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setLogoutVisible(true);
          }}
          accessibilityRole="button"
          accessibilityLabel="Log out"
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Ionicons
              name="log-out-outline"
              size={38}
              color={COLORS.error}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalDesc}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setLogoutVisible(false)}
                accessibilityLabel="Cancel log out"
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalLogoutBtn}
                onPress={handleLogout}
                accessibilityLabel="Confirm log out"
              >
                <Text style={styles.modalLogoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingBottom: 0,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 2,
    fontWeight: "500",
  },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },
  settingsBtn: {
    padding: 8,
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
    marginTop: 12,
    marginBottom: -40,
    zIndex: 2,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.card,
    backgroundColor: COLORS.background,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 16,
    padding: 5,
    borderWidth: 2,
    borderColor: COLORS.card,
    elevation: 2,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 24,
    marginTop: -32,
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  userEmail: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  statsCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 24,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 12,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryGreen,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 38,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  menuCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    paddingBottom: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 6,
    backgroundColor: "transparent",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 54,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  menuItemRight: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
  },
  logoutBtn: {
    backgroundColor: COLORS.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 32,
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.error,
    elevation: 2,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 30,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: 300,
    shadowColor: COLORS.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  modalDesc: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 18,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalCancelText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
  modalLogoutBtn: {
    flex: 1,
    backgroundColor: COLORS.error,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalLogoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
