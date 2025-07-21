import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const recentSearches = [
  "Good Knight",
  "Tata Salt",
  "Sunflower Oil",
  "Dettol Liquid",
  "Madhur Sugar",
  "Amul Ghee",
];

const trendingProducts = [
  {
    id: 1,
    name: "Surf Excel Easy Wash Detergent Power",
    size: "500 ml",
    price: 12,
    oldPrice: 14,
    image: require("../assets/images/prod-surf.jpeg"),
  },
  {
    id: 2,
    name: "Fortune Arhar Dal (Toor Dal)",
    size: "1 kg",
    price: 10,
    oldPrice: 12,
    image: require("../assets/images/prod-dal.jpeg"),
  },
  // Add more trending products as needed
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  // Filter trending products by query
  const filteredProducts =
    query.trim().length === 0
      ? trendingProducts
      : trendingProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.size.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Recent Search */}
      <Text style={styles.sectionTitle}>Recent Search</Text>
      <View style={styles.chipRow}>
        {recentSearches.map((item) => (
          <TouchableOpacity key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trending Now */}
      <Text style={styles.sectionTitle}>Trending Now</Text>
      <FlatList
        data={filteredProducts}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productSize}>{item.size}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.oldPrice}>${item.oldPrice}</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
    height: 44,
  },
  input: { flex: 1, fontSize: 16 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginVertical: 10 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  chip: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { color: "#222", fontWeight: "500" },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 14,
    width: 150,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
    textAlign: "center",
  },
  productSize: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4CAF50",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
