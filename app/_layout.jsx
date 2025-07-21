import { Slot } from "expo-router";
import { CartProvider } from "../components/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Slot screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
