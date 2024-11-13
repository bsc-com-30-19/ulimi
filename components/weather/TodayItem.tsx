import { View, Text } from 'react-native';
import { Image } from 'expo-image';

export default function TodayItem() {
  return (
    <View className="items-center max-w-[60px]">
      <View>
        <Text className="text-base">28°C</Text>
      </View>
      <View>
        <View>
          <Image
            source={require('@/assets/icons/weather/Thermometer.svg')}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <View>
          <Text>Temperature</Text>
        </View>
      </View>
    </View>
  );
}
