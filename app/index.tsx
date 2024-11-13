import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../global.css"
import MenuBlock from "@/components/menus/MenuBlock";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/(crops)"> crops </Link>
      <Link href="/auth"> Sign Up!</Link>
    </View>
  );
}
