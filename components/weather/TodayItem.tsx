import { View, Text } from 'react-native';
import { Image } from 'expo-image';

export default function TodayItem() {
  return (
    <View>
      <View>
        <Text className="text-base">28°C</Text>
      </View>
      <View>
        <View>
          <Image source={require('@/')} />
        </View>
        <View>
          <Text>Temperature</Text>
        </View>
      </View>
    </View>
  );
}
