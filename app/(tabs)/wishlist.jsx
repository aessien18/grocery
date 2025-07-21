import { Ionicons } from "@expo/vector-icons";
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

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 3.99,
      originalPrice: 4.99,
      image: require("../../assets/images/veg-tomato.jpeg"),
      size: "500g",
    },
    {
      id: 2,
      name: "Premium Organic Milk",
      price: 4.99,
      originalPrice: 5.99,
      image: require("../../assets/images/cat-dairy.jpeg"),
      size: "1L",
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 2.49,
      originalPrice: 2.99,
      image: require("../../assets/images/cat-dairy.jpeg"),
      size: "400g",
    },
    {
      id: 4,
      name: "Fresh Spinach Leaves",
      price: 1.99,
      originalPrice: 2.49,
      image: require("../../assets/images/veg-spinach.jpeg"),
      size: "200g",
    },
    {
      id: 5,
      name: "Organic Bananas",
      price: 2.99,
      originalPrice: 3.49,
      image: require("../../assets/images/fruit-banana.jpeg"),
      size: "1kg",
    },
    {
      id: 6,
      name: "Fresh Strawberries",
      price: 4.99,
      originalPrice: 5.99,
      image: require("../../assets/images/fruit-strawberry.jpeg"),
      size: "250g",
    },
    {
      id: 7,
      name: "Premium Olive Oil",
      price: 8.99,
      originalPrice: 10.99,
      image: require("../../assets/images/cat-masala.jpeg"),
      size: "500g",
    },
    {
      id: 8,
      name: "Organic Honey",
      price: 6.99,
      originalPrice: 7.99,
      image: require("../../assets/images/cat-masala.jpeg"),
      size: "250g",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (id) => {
    // In a real app, this would add the item to cart
    console.log(`Adding item ${id} to cart`);
  };

  const WishlistItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>{item.size}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${item.price}</Text>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => addToCart(item.id)}
        >
          <Ionicons name="bag-outline" size={18} color="#4F5050" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF4757" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
      </View>

      {wishlistItems.length === 0 ? (
        <View style={styles.emptyWishlist}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>
            Save items you love for later
          </Text>
          <TouchableOpacity style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="funnel-outline" size={16} color="#666" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortBtn}>
              <Ionicons name="swap-vertical-outline" size={16} color="#666" />
              <Text style={styles.sortText}>Sort</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={wishlistItems}
            renderItem={({ item }) => <WishlistItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            numColumns={2}
          />

          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.addAllBtn}>
              <Text style={styles.addAllText}>Add All to Cart</Text>
              <Ionicons name="bag" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#333",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  emptyWishlist: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  shopNowBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  sortText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
  },
  wishlistItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 4,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  itemImage: {
    width: 100,
    height: 120,
    resizeMode: "cover",
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#333",
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 700,
    color: "#404040",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  addToCartBtn: {
    backgroundColor: "#e8f5e9",
    padding: 8,
    borderRadius: 8,
  },
  removeBtn: {
    backgroundColor: "#ffe8e8",
    padding: 8,
    borderRadius: 8,
  },
  bottomActions: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ef",
  },
  addAllBtn: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  addAllText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    marginRight: 8,
  },
});
