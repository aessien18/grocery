import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const COLORS = {
  primaryGreen: "#6BCB77",
  accentYellow: "#FFD93D",
  background: "#FAFAFA",
  card: "#fff",
  textPrimary: "#222222",
  textSecondary: "#666666",
  border: "#E0E0E0",
};

const categories = [
  {
    label: "Vegetables & Fruits",
    icon: require("../../assets/images/cat-veg.png"),
  },
  {
    label: "Dairy & Breakfast",
    icon: require("../../assets/images/cat-dairy.jpeg"),
  },
  {
    label: "Cold Drinks & Juices",
    icon: require("../../assets/images/cat-drinks.jpeg"),
  },
  {
    label: "Instant & Frozen Food",
    icon: require("../../assets/images/cat-foods.jpeg"),
  },
  { label: "Tea & Coffee", icon: require("../../assets/images/cat-tea.jpeg") },
  {
    label: "Atta, Rice & Dal",
    icon: require("../../assets/images/cat-atta.png"),
  },
  {
    label: "Masala, Oil & Dry Fruits",
    icon: require("../../assets/images/cat-masala.jpeg"),
  },
  {
    label: "Chicken, Meat & Fish",
    icon: require("../../assets/images/cat-chicken.jpeg"),
  },
];

const bestDeals = [
  {
    name: "Surf Excel Easy Wash Detergent Power",
    size: "500 ml",
    price: "$12",
    oldPrice: "$14",
    image: require("../../assets/images/prod-surf.jpeg"),
  },
  {
    name: "Fortune Arhar Dal (Toor Dal)",
    size: "1 kg",
    price: "$10",
    oldPrice: "$12",
    image: require("../../assets/images/prod-dal.jpeg"),
  },
  // ...more products
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="location-outline"
                size={22}
                color={COLORS.primaryGreen}
              />
              <Text style={styles.headerTitle}>Home</Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color={COLORS.textPrimary}
              />
            </View>
            <Text style={styles.headerSubtitle}>
              6391 Elgin St. Celina, Delaware 10299
            </Text>
          </View>
          <TouchableOpacity style={styles.cartBtn}>
            <Ionicons name="bag-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Ionicons
              name="search-outline"
              size={20}
              color={COLORS.textSecondary}
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Shop By Category */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Shop By Category</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((cat, idx) => (
            <View style={styles.categoryItem} key={idx}>
              <Image source={cat.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </View>
          ))}
        </View>

        {/* Promo Banner */}
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>
              World Food Festival,{"\n"}Bring the world to your Kitchen!
            </Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/images/food-banner.png")}
            style={styles.bannerImg}
          />
        </View>

        {/* Best Deal */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Best Deal</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={bestDeals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => idx.toString()}
          contentContainerStyle={{ paddingLeft: 16, paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImg} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productSize}>{item.size}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <Text style={styles.productOldPrice}>{item.oldPrice}</Text>
              </View>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
      {/* Bottom Tab Bar would be handled by your tab navigator */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginLeft: 6,
    marginRight: 2,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginLeft: 28,
    marginTop: 2,
  },
  cartBtn: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    marginTop: 2,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  filterBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  sectionLink: {
    color: COLORS.primaryGreen,
    fontWeight: "500",
    fontSize: 15,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  categoryItem: {
    width: (width - 64) / 4,
    alignItems: "center",
    marginBottom: 18,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 6,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  categoryLabel: {
    fontSize: 13,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontWeight: "500",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F8EF",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  bannerBtn: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  bannerBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  bannerImg: {
    width: 80,
    height: 80,
    marginLeft: 10,
    borderRadius: 12,
    resizeMode: "contain",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 160,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    marginBottom: 8,
  },
  productImg: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 8,
    borderRadius: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  productSize: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginRight: 8,
  },
  productOldPrice: {
    fontSize: 13,
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
    fontSize: 15,
  },
});
