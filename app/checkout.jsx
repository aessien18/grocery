import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
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

const savedCards = [
  { id: 1, brand: "mastercard", number: "6895 7852 5898 4200" },
  { id: 2, brand: "visa", number: "7892 5487 8600 3525" },
];

export default function CheckoutScreen() {
  const [selected, setSelected] = useState(null);
  const [showCardForm, setShowCardForm] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.sectionTitle}>Saved Cards</Text>
        {savedCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.savedCard,
              selected === card.id && { borderColor: COLORS.primaryGreen },
            ]}
            onPress={() => setSelected(card.id)}
            activeOpacity={0.85}
          >
            <Image
              source={
                card.brand === "visa"
                  ? require("../assets/images/visa.png")
                  : require("../assets/images/mastercard.png")
              }
              style={styles.cardLogo}
            />
            <Text style={styles.cardNumber}>{card.number}</Text>
            <View style={styles.radioOuter}>
              {selected === card.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        {/* Credit/Debit Card Form */}
        <View style={styles.cardFormWrapper}>
          <TouchableOpacity
            style={styles.cardFormHeader}
            onPress={() => setShowCardForm((v) => !v)}
            activeOpacity={0.85}
          >
            <Image
              source={require("../assets/images/mastercard.png")}
              style={styles.cardLogo}
            />
            <Text style={styles.cardFormTitle}>Credit/Debit Card</Text>
            <Ionicons
              name={showCardForm ? "chevron-up" : "chevron-down"}
              size={22}
              color={COLORS.textPrimary}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
          {showCardForm && (
            <View style={styles.cardFormBody}>
              <TextInput
                style={styles.cardInput}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="number-pad"
                maxLength={19}
              />
              <TextInput
                style={styles.cardInput}
                placeholder="Card Holder Name"
                value={cardName}
                onChangeText={setCardName}
                autoCapitalize="words"
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.cardInput, { flex: 1, marginRight: 8 }]}
                  placeholder="Expiry Date"
                  value={expiry}
                  onChangeText={setExpiry}
                  keyboardType="number-pad"
                  maxLength={5}
                />
                <TextInput
                  style={[styles.cardInput, { flex: 1, marginLeft: 8 }]}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          )}
        </View>

        {/* Paypal Option */}
        <TouchableOpacity
          style={[
            styles.savedCard,
            selected === "paypal" && { borderColor: COLORS.primaryGreen },
          ]}
          onPress={() => setSelected("paypal")}
          activeOpacity={0.85}
        >
          <Image
            source={require("../assets/images/paypal.png")}
            style={styles.cardLogo}
          />
          <Text style={styles.cardNumber}>Paypal</Text>
          <View style={styles.radioOuter}>
            {selected === "paypal" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.nextBtn}
        activeOpacity={0.85}
        onPress={() => {
          if (selected === "paypal") {
            router.push("/paypal");
          } else {
            // handle other payment methods or proceed to next step
          }
        }}
      >
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "android" ? 18 : 8,
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
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: "center",
    marginRight: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 18,
    marginBottom: 10,
    marginLeft: 8,
  },
  savedCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLogo: {
    width: 36,
    height: 24,
    resizeMode: "contain",
    marginRight: 14,
  },
  cardNumber: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
    fontWeight: "600",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryGreen,
  },
  cardFormWrapper: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    padding: 0,
    borderWidth: 2,
    borderColor: COLORS.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardFormHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  cardFormTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  cardFormBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardInput: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  nextBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: Platform.OS === "android" ? 18 : 28,
    marginTop: 8,
    elevation: 2,
  },
  nextBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
