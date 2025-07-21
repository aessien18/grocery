import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CartBar from "../components/CartBar";
import { useCart } from "../components/CartContext";
import SortModal from "../components/SortModal";

const COLORS = {
  primaryGreen: "#6BCB77",
  accentYellow: "#FFD93D",
  background: "#FAFAFA",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#E0E0E0",
};

const bestDeals = [
  {
    id: 1,
    name: "Aashirvaad Shudh Atta",
    size: "10 kg",
    price: 12,
    oldPrice: 14,
    discount: 14,
    image: require("../assets/images/cat-atta.png"),
  },
  {
    id: 2,
    name: "Fresh Ultimate Atta",
    size: "5 kg",
    price: 7,
    oldPrice: 10,
    discount: 30,
    image: require("../assets/images/cat-atta.png"),
  },
  {
    id: 3,
    name: "Fortune Arhar Dal",
    size: "1 kg",
    price: 10,
    oldPrice: 12,
    discount: 17,
    image: require("../assets/images/prod-dal.jpeg"),
  },
  // ...add more deals
];

export default function BestDealScreen() {
  const [wishlist, setWishlist] = useState([]);
  const { cart, addToCart } = useCart();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const renderDeal = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => toggleWishlist(item.id)}
        >
          <Ionicons
            name={wishlist.includes(item.id) ? "heart" : "heart-outline"}
            size={20}
            color={wishlist.includes(item.id) ? "#ff4757" : "#666"}
          />
        </TouchableOpacity>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
        </View>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.size}>{item.size}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.oldPrice}>${item.oldPrice}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.addBtn,
          cart.find((c) => c.id === item.id) && styles.addedBtn,
        ]}
        onPress={() => addToCart(item)}
      >
        <Text
          style={[
            styles.addBtnText,
            cart.find((c) => c.id === item.id) && styles.addedBtnText,
          ]}
        >
          {cart.find((c) => c.id === item.id) ? "Added" : "Add"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.heroBanner}>
        <Text style={styles.heroText}>🔥 Today’s Best Deals</Text>
      </View>
      <TouchableOpacity
        style={styles.sortBtn}
        onPress={() => setSortModalVisible(true)}
      >
        <Text style={styles.sortBtnText}>Sort By</Text>
      </TouchableOpacity>
      <FlatList
        data={bestDeals}
        renderItem={renderDeal}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
      <CartBar
        itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onPress={() => router.push("/cart")}
      />
      <SortModal
        visible={sortModalVisible}
        selected={selectedSort}
        onSelect={(option) => {
          setSelectedSort(option);
          setSortModalVisible(false);
        }}
        onClose={() => setSortModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  heroBanner: {
    backgroundColor: COLORS.primaryGreen,
    padding: 24,
    borderRadius: 18,
    margin: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  heroText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  sortBtn: {
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginBottom: 8,
  },
  sortBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 8,
    flex: 1,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    minWidth: 160,
    maxWidth: "48%",
  },
  imageWrap: {
    position: "relative",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  wishlistBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  discountBadge: {
    position: "absolute",
    left: 4,
    top: 4,
    backgroundColor: "#FFD93D",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 11,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  size: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryGreen,
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  addedBtn: {
    backgroundColor: "#e8f5e9",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  addedBtnText: {
    color: COLORS.primaryGreen,
  },
});
