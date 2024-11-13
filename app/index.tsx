import { Link } from 'expo-router';
import { Text, View } from 'react-native';

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
    </View>
  );
}
