import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CartBar from "../../components/CartBar";
import { useCart } from "../../components/CartContext";
import SortModal from "../../components/SortModal";

const AttaScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [wishlist, setWishlist] = useState(new Set());
  const { cart, addToCart } = useCart();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

  const categories = [
    { id: 0, name: "Atta", icon: "🌾" },
    { id: 1, name: "Besan & Maida", icon: "🥖" },
    { id: 2, name: "Sooji", icon: "⚪" },
    { id: 3, name: "Rice", icon: "🍚" },
    { id: 4, name: "Poha & Daliya", icon: "🥣" },
    { id: 5, name: "Toor, Urad & Chana", icon: "🫘" },
  ];

  const products = {
    0: [
      {
        id: 1,
        name: "Aashirvaad Shudh Aata",
        size: "10 kg",
        price: 12,
        originalPrice: 14,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 2,
        name: "Fresh Ultimate Atta",
        size: "5 kg",
        price: 7,
        originalPrice: 10,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 3,
        name: "Fortune Fresh Atta",
        size: "5 kg",
        price: 5,
        originalPrice: 8,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 4,
        name: "Aashirwad Select Atta",
        size: "10 kg",
        price: 12,
        originalPrice: 14,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 5,
        name: "Mother Chakki Atta",
        size: "10 kg",
        price: 8,
        originalPrice: 10,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 6,
        name: "Dhruvam Wheat Atta",
        size: "5 kg",
        price: 7,
        originalPrice: 10,
        image: require("../../assets/images/cat-atta.png"),
      },
    ],
    1: [
      {
        id: 11,
        name: "Besan (Gram Flour)",
        size: "1 kg",
        price: 8,
        originalPrice: 10,
        image: require("../../assets/images/cat-masala.jpeg"),
      },
      {
        id: 12,
        name: "Maida (All Purpose Flour)",
        size: "1 kg",
        price: 6,
        originalPrice: 8,
        image: require("../../assets/images/cat-masala.jpeg"),
      },
      {
        id: 13,
        name: "Fine Besan",
        size: "500 g",
        price: 5,
        originalPrice: 7,
        image: require("../../assets/images/cat-masala.jpeg"),
      },
      {
        id: 14,
        name: "Organic Besan",
        size: "1 kg",
        price: 12,
        originalPrice: 15,
        image: require("../../assets/images/cat-masala.jpeg"),
      },
    ],
    2: [
      {
        id: 21,
        name: "Fine Sooji",
        size: "1 kg",
        price: 9,
        originalPrice: 12,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 22,
        name: "Coarse Sooji",
        size: "1 kg",
        price: 8,
        originalPrice: 11,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 23,
        name: "Organic Sooji",
        size: "500 g",
        price: 7,
        originalPrice: 9,
        image: require("../../assets/images/cat-atta.png"),
      },
    ],
    3: [
      {
        id: 31,
        name: "Basmati Rice",
        size: "5 kg",
        price: 15,
        originalPrice: 18,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
      {
        id: 32,
        name: "Sona Masoori Rice",
        size: "5 kg",
        price: 12,
        originalPrice: 15,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
      {
        id: 33,
        name: "Brown Rice",
        size: "1 kg",
        price: 8,
        originalPrice: 10,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
      {
        id: 34,
        name: "Jasmine Rice",
        size: "2 kg",
        price: 10,
        originalPrice: 13,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
    ],
    4: [
      {
        id: 41,
        name: "Poha (Flattened Rice)",
        size: "1 kg",
        price: 6,
        originalPrice: 8,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 42,
        name: "Daliya (Broken Wheat)",
        size: "1 kg",
        price: 7,
        originalPrice: 9,
        image: require("../../assets/images/cat-atta.png"),
      },
      {
        id: 43,
        name: "Organic Poha",
        size: "500 g",
        price: 5,
        originalPrice: 7,
        image: require("../../assets/images/cat-atta.png"),
      },
    ],
    5: [
      {
        id: 51,
        name: "Toor Dal",
        size: "1 kg",
        price: 9,
        originalPrice: 12,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
      {
        id: 52,
        name: "Urad Dal",
        size: "1 kg",
        price: 8,
        originalPrice: 11,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
      {
        id: 53,
        name: "Chana Dal",
        size: "1 kg",
        price: 7,
        originalPrice: 10,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
      {
        id: 54,
        name: "Moong Dal",
        size: "1 kg",
        price: 8,
        originalPrice: 11,
        image: require("../../assets/images/prod-dal.jpeg"),
      },
    ],
  };

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const currentProducts = products[selectedCategory] || [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atta, Rice & Dal</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === category.id &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
                {selectedCategory === category.id && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <View style={styles.productSection}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productGrid}>
              {currentProducts.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <View style={styles.productImageContainer}>
                    <Image source={product.image} style={styles.productImage} />
                    <TouchableOpacity
                      style={styles.wishlistButton}
                      onPress={() => toggleWishlist(product.id)}
                    >
                      <Ionicons
                        name={
                          wishlist.has(product.id) ? "heart" : "heart-outline"
                        }
                        size={20}
                        color={wishlist.has(product.id) ? "#ff4757" : "#666"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.productSize}>{product.size}</Text>

                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>${product.price}</Text>
                      <Text style={styles.originalPrice}>
                        ${product.originalPrice}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.addButton,
                        cart.some((item) => item.id === product.id) &&
                          styles.addedButton,
                      ]}
                      onPress={() => addToCart(product)}
                    >
                      <Text
                        style={[
                          styles.addButtonText,
                          cart.some((item) => item.id === product.id) &&
                            styles.addedButtonText,
                        ]}
                      >
                        {cart.some((item) => item.id === product.id)
                          ? "Added"
                          : "Add"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <CartBar
        itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onPress={() => router.push("/cart")}
      />
      <TouchableOpacity
        style={styles.sortBtn}
        onPress={() => setSortModalVisible(true)}
      >
        <Text style={styles.sortBtnText}>Sort By</Text>
      </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  searchButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 120,
    backgroundColor: "#f8f9fa",
    borderRightWidth: 1,
    borderRightColor: "#e9ecef",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 12,
    position: "relative",
  },
  selectedCategory: {
    backgroundColor: "#4CAF50",
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  selectedIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: "#4CAF50",
  },
  productSection: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: "1%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImageContainer: {
    position: "relative",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productSize: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  addedButton: {
    backgroundColor: "#e8f5e8",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  addedButtonText: {
    color: "#4CAF50",
  },
  sortBtn: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sortBtnText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
});

export default AttaScreen;
