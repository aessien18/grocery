import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CartBar from "../../components/CartBar";
import { useCart } from "../../components/CartContext";
import SortModal from "../../components/SortModal";

const COLORS = {
  primaryGreen: "#6BCB77",
  background: "#FAFAFA",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#E0E0E0",
};

const categories = [
  {
    id: 1,
    name: "Fresh Vegetables",
    image: require("../../assets/images/cat-veg.png"),
  },
  {
    id: 2,
    name: "Fresh Fruits",
    image: require("../../assets/images/cat-fruits.jpeg"),
  },
  {
    id: 3,
    name: "Seasonal",
    image: require("../../assets/images/cat-seasonal.jpeg"),
  },
  {
    id: 4,
    name: "Exotics",
    image: require("../../assets/images/cat-exotic.jpeg"),
  },
  {
    id: 5,
    name: "Sprouts",
    image: require("../../assets/images/cat-sprouts.jpeg"),
  },
  {
    id: 6,
    name: "Leafies & Herbs",
    image: require("../../assets/images/cat-leafy.jpeg"),
  },
  {
    id: 7,
    name: "Flowers & Leaves",
    image: require("../../assets/images/cat-flower.jpeg"),
  },
];

const allProducts = {
  1: [
    {
      id: 1,
      name: "Hybrid Tomato (Tamatar)",
      size: "500 g",
      price: 8,
      originalPrice: 10,
      image: require("../../assets/images/veg-tomato.jpeg"),
    },
    {
      id: 2,
      name: "Lady Finger (Bhindi)",
      size: "250 g",
      price: 7,
      originalPrice: 10,
      image: require("../../assets/images/veg-bhindi.jpeg"),
    },
    {
      id: 3,
      name: "Green Chilli (Hari Mirch)",
      size: "500 g",
      price: 5,
      originalPrice: 8,
      image: require("../../assets/images/veg-chilli.jpeg"),
    },
    {
      id: 4,
      name: "Cluster Beans (Gawar Phali)",
      size: "250 g",
      price: 12,
      originalPrice: 14,
      image: require("../../assets/images/veg-cluster.jpeg"),
    },
    {
      id: 5,
      name: "Cabbage (Patta Gobhi)",
      size: "500 g",
      price: 8,
      originalPrice: 10,
      image: require("../../assets/images/veg-cabbage.jpeg"),
    },
    {
      id: 6,
      name: "Capsicum (Shimla Mirch)",
      size: "250 g",
      price: 7,
      originalPrice: 10,
      image: require("../../assets/images/veg-capsicum.jpeg"),
    },
    {
      id: 7,
      name: "Baby Potato (Chota Aloo)",
      size: "500 g",
      price: 10,
      originalPrice: 14,
      image: require("../../assets/images/veg-potato.jpeg"),
    },
    {
      id: 8,
      name: "Green Peas (Matar)",
      size: "250 g",
      price: 5,
      originalPrice: 10,
      image: require("../../assets/images/veg-peas.jpeg"),
    },
    {
      id: 11,
      name: "Carrot (Gajar)",
      size: "500 g",
      price: 6,
      originalPrice: 9,
      image: require("../../assets/images/veg-carrot.jpeg"),
    },
    {
      id: 12,
      name: "Brinjal (Baingan)",
      size: "500 g",
      price: 7,
      originalPrice: 10,
      image: require("../../assets/images/veg-brinjal.jpeg"),
    },
    {
      id: 13,
      name: "Cucumber (Kheera)",
      size: "500 g",
      price: 6,
      originalPrice: 8,
      image: require("../../assets/images/veg-cucumber.jpeg"),
    },
    {
      id: 14,
      name: "Radish (Mooli)",
      size: "500 g",
      price: 5,
      originalPrice: 7,
      image: require("../../assets/images/veg-radish.jpeg"),
    },
    {
      id: 15,
      name: "Pumpkin (Kaddu)",
      size: "1 kg",
      price: 9,
      originalPrice: 12,
      image: require("../../assets/images/veg-pumpkin.jpeg"),
    },
    {
      id: 16,
      name: "Bitter Gourd (Karela)",
      size: "500 g",
      price: 8,
      originalPrice: 11,
      image: require("../../assets/images/veg-bitter.jpeg"),
    },
    {
      id: 23,
      name: "Spinach (Palak)",
      size: "250 g",
      price: 4,
      originalPrice: 6,
      image: require("../../assets/images/veg-spinach.jpeg"),
    },
  ],
  2: [
    {
      id: 9,
      name: "Mango",
      size: "1 kg",
      price: 15,
      originalPrice: 18,
      image: require("../../assets/images/fruit-mango.jpeg"),
    },
    {
      id: 10,
      name: "Apple",
      size: "1 kg",
      price: 12,
      originalPrice: 15,
      image: require("../../assets/images/fruit-apple.jpeg"),
    },
    {
      id: 17,
      name: "Banana",
      size: "1 dozen",
      price: 8,
      originalPrice: 10,
      image: require("../../assets/images/fruit-banana.jpeg"),
    },
    {
      id: 18,
      name: "Orange",
      size: "1 kg",
      price: 10,
      originalPrice: 13,
      image: require("../../assets/images/fruit-orange.jpeg"),
    },
    {
      id: 19,
      name: "Papaya",
      size: "1 kg",
      price: 9,
      originalPrice: 12,
      image: require("../../assets/images/fruit-papaya.jpeg"),
    },
    {
      id: 20,
      name: "Pineapple",
      size: "1 pc",
      price: 14,
      originalPrice: 18,
      image: require("../../assets/images/fruit-pineapple.jpeg"),
    },
    {
      id: 21,
      name: "Grapes",
      size: "500 g",
      price: 11,
      originalPrice: 14,
      image: require("../../assets/images/fruit-grapes.jpeg"),
    },
    {
      id: 22,
      name: "Watermelon",
      size: "1 pc",
      price: 13,
      originalPrice: 16,
      image: require("../../assets/images/fruit-watermelon.jpeg"),
    },
    {
      id: 27,
      name: "Pomegranate (Anar)",
      size: "500 g",
      price: 13,
      originalPrice: 16,
      image: require("../../assets/images/fruit-pomegranate.jpeg"),
    },
    {
      id: 28,
      name: "Guava (Amrood)",
      size: "1 kg",
      price: 9,
      originalPrice: 12,
      image: require("../../assets/images/fruit-guava.jpeg"),
    },
    {
      id: 29,
      name: "Kiwi",
      size: "3 pcs",
      price: 14,
      originalPrice: 17,
      image: require("../../assets/images/fruit-kiwi.jpeg"),
    },
    {
      id: 30,
      name: "Strawberry",
      size: "250 g",
      price: 15,
      originalPrice: 19,
      image: require("../../assets/images/fruit-strawberry.jpeg"),
    },
  ],
  3: [
    {
      id: 31,
      name: "Green Mango (Kaccha Aam)",
      size: "500 g",
      price: 10,
      originalPrice: 13,
      image: require("../../assets/images/seasonal-mango.jpeg"),
    },
    {
      id: 32,
      name: "Jackfruit (Kathal)",
      size: "1 kg",
      price: 18,
      originalPrice: 22,
      image: require("../../assets/images/seasonal-jackfruit.jpeg"),
    },
    {
      id: 33,
      name: "Drumstick (Sahjan)",
      size: "250 g",
      price: 7,
      originalPrice: 10,
      image: require("../../assets/images/seasonal-drumstick.jpeg"),
    },
    {
      id: 34,
      name: "Green Garlic (Hara Lehsun)",
      size: "250 g",
      price: 8,
      originalPrice: 11,
      image: require("../../assets/images/seasonal-garlic.jpeg"),
    },
    {
      id: 35,
      name: "Amaranth Leaves (Chaulai)",
      size: "250 g",
      price: 6,
      originalPrice: 8,
      image: require("../../assets/images/seasonal-amaranth.jpeg"),
    },
    {
      id: 36,
      name: "Tinda (Apple Gourd)",
      size: "500 g",
      price: 9,
      originalPrice: 12,
      image: require("../../assets/images/seasonal-tinda.jpeg"),
    },
  ],
  4: [
    {
      id: 51,
      name: "Broccoli",
      size: "250 g",
      price: 18,
      originalPrice: 22,
      image: require("../../assets/images/exotic-broccoli.jpeg"),
    },
    {
      id: 52,
      name: "Zucchini",
      size: "250 g",
      price: 15,
      originalPrice: 19,
      image: require("../../assets/images/exotic-zucchini.jpeg"),
    },
    {
      id: 53,
      name: "Avocado",
      size: "1 pc",
      price: 25,
      originalPrice: 30,
      image: require("../../assets/images/exotic-avocado.jpeg"),
    },
    {
      id: 54,
      name: "Asparagus",
      size: "100 g",
      price: 20,
      originalPrice: 25,
      image: require("../../assets/images/exotic-asparagus.jpeg"),
    },
    {
      id: 55,
      name: "Red Cabbage",
      size: "500 g",
      price: 16,
      originalPrice: 20,
      image: require("../../assets/images/exotic-redcabbage.jpeg"),
    },
    {
      id: 56,
      name: "Celery",
      size: "250 g",
      price: 14,
      originalPrice: 18,
      image: require("../../assets/images/exotic-celery.jpeg"),
    },
  ],
  8: [
    {
      id: 41,
      name: "Turmeric Powder (Haldi)",
      size: "200 g",
      price: 12,
      originalPrice: 15,
      image: require("../../assets/images/spices-turmeric.jpeg"),
    },
    {
      id: 42,
      name: "Red Chilli Powder (Lal Mirch)",
      size: "200 g",
      price: 14,
      originalPrice: 18,
      image: require("../../assets/images/spices-chilli.jpeg"),
    },
    {
      id: 43,
      name: "Coriander Powder (Dhaniya)",
      size: "200 g",
      price: 10,
      originalPrice: 13,
      image: require("../../assets/images/spices-coriander.jpeg"),
    },
    {
      id: 44,
      name: "Cumin Seeds (Jeera)",
      size: "100 g",
      price: 9,
      originalPrice: 12,
      image: require("../../assets/images/spices-cumin.jpeg"),
    },
    {
      id: 45,
      name: "Garam Masala",
      size: "100 g",
      price: 16,
      originalPrice: 20,
      image: require("../../assets/images/spices-garammasala.jpeg"),
    },
    {
      id: 46,
      name: "Black Pepper (Kali Mirch)",
      size: "100 g",
      price: 18,
      originalPrice: 22,
      image: require("../../assets/images/spices-pepper.jpeg"),
    },
  ],
  5: [
    {
      id: 61,
      name: "Moong Sprouts",
      size: "250 g",
      price: 7,
      originalPrice: 9,
      image: require("../../assets/images/sprouts-moong.jpeg"),
    },
    {
      id: 62,
      name: "Chana Sprouts",
      size: "250 g",
      price: 8,
      originalPrice: 10,
      image: require("../../assets/images/sprout-chana.jpeg"),
    },
    {
      id: 63,
      name: "Mixed Sprouts",
      size: "250 g",
      price: 9,
      originalPrice: 12,
      image: require("../../assets/images/sprout-mixed.jpeg"),
    },
    {
      id: 64,
      name: "Alfalfa Sprouts",
      size: "100 g",
      price: 10,
      originalPrice: 13,
      image: require("../../assets/images/sprout-afalfal.jpeg"),
    },
  ],
  6: [
    {
      id: 71,
      name: "Mint Leaves (Pudina)",
      size: "100 g",
      price: 5,
      originalPrice: 7,
      image: require("../../assets/images/herb-mint.jpeg"),
    },
    {
      id: 72,
      name: "Coriander Leaves (Dhaniya)",
      size: "100 g",
      price: 6,
      originalPrice: 8,
      image: require("../../assets/images/herb-corianda.jpeg"),
    },
    {
      id: 73,
      name: "Fenugreek Leaves (Methi)",
      size: "100 g",
      price: 7,
      originalPrice: 9,
      image: require("../../assets/images/herb-fenugreek.jpeg"),
    },
    {
      id: 74,
      name: "Basil Leaves",
      size: "50 g",
      price: 8,
      originalPrice: 10,
      image: require("../../assets/images/herb-basil.jpeg"),
    },
  ],
  7: [
    {
      id: 81,
      name: "Banana Flower",
      size: "1 pc",
      price: 12,
      originalPrice: 15,
      image: require("../../assets/images/flower-banana.jpeg"),
    },
    {
      id: 82,
      name: "Pumpkin Flower",
      size: "1 bunch",
      price: 10,
      originalPrice: 13,
      image: require("../../assets/images/flower-pumpkin.jpeg"),
    },
    {
      id: 83,
      name: "Neem Leaves",
      size: "1 bunch",
      price: 8,
      originalPrice: 10,
      image: require("../../assets/images/flower-neem.jpeg"),
    },
    {
      id: 84,
      name: "Curry Leaves",
      size: "50 g",
      price: 6,
      originalPrice: 8,
      image: require("../../assets/images/flower-curry.jpeg"),
    },
  ],
};

export default function VegetablesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const { cart, addToCart } = useCart();
  const router = useRouter();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

  const products = allProducts[selectedCategory] || [];

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const CategoryButton = ({ item, active }) => (
    <TouchableOpacity
      style={[styles.categoryBtn, active && styles.activeCategoryBtn]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image source={item.image} style={styles.categoryImg} />
      <Text
        style={[styles.categoryBtnText, active && styles.activeCategoryBtnText]}
      >
        {item.name}
      </Text>
      {active && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  const ProductCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/product/${item.id}`)}
      style={styles.productCard}
    >
      <TouchableOpacity
        style={styles.wishlistBtn}
        onPress={() => toggleWishlist(item.id)}
      >
        <Ionicons
          name={wishlist.includes(item.id) ? "heart" : "heart-outline"}
          size={20}
          color={wishlist.includes(item.id) ? COLORS.primaryGreen : "#666"}
        />
      </TouchableOpacity>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productSize}>{item.size}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.originalPrice}>${item.originalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
        <Text style={styles.addBtnText}>
          {cart.some((c) => c.id === item.id) ? "Added" : "Add"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vegetables & Fruits</Text>
        <View>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>
          {cart.length > 0 && (
            <View
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                backgroundColor: COLORS.primaryGreen,
                borderRadius: 8,
                width: 16,
                height: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.sortBtn}
        onPress={() => setSortModalVisible(true)}
      >
        <Text style={styles.sortBtnText}>Sort By</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Categories Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                item={cat}
                active={cat.id === selectedCategory}
              />
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} item={product} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 90,
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    alignItems: "center",
  },
  categoryBtn: {
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
    width: 80,
    borderRadius: 12,
    backgroundColor: "transparent",
    position: "relative",
  },
  activeCategoryBtn: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImg: {
    width: 36,
    height: 36,
    marginBottom: 4,
    borderRadius: 8,
  },
  categoryBtnText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  activeCategoryBtnText: {
    color: COLORS.primaryGreen,
    fontWeight: "bold",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primaryGreen,
  },
  productsArea: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    width: "47%",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  wishlistBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  productSize: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  price: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 11,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  addBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginTop: 2,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  sortBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  sortBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
