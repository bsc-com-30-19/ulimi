import { View, Text } from 'react-native';
import { Image } from 'expo-image';

interface TodayItemProps {
  icon?: string;
}
const iconMap: { [key: string]: any } = {
  Thermometer: require('@/assets/icons/weather/Thermometer.svg'),
  Sun: require('@/assets/icons/weather/Sun.svg'),
  // Add more mappings as needed
};
export default function TodayItem({ icon }: TodayItemProps) {
  const iconSource = icon ? iconMap[icon.replace('.svg', '')] : iconMap['Sun'];
  return (
    <View className="items-center max-w-[60px]">
      <View>
        <Text className="text-base">28°C</Text>
      </View>
      <View>
        <View>
          <Image source={iconSource} style={{ width: 24, height: 24 }} />
        </View>
        <View>
          <Text>Temperature</Text>
        </View>
      </View>
    </View>
  );
}
