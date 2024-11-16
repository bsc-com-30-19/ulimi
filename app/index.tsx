import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import "../global.css"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/(crops)"> crops </Link>
      <Link href="/(weather)"> weather </Link>
      <Link href="/(data_viz)"> data visualisation </Link>
      <Link href="/(helpSupport)"> help and support </Link>
      <Link href="/auth"> Sign Up!</Link>
      <Link href="/Livestock"> Livestock</Link>
    </View>
  );
}
