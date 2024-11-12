import { View, Text } from 'react-native';
import { Image } from 'expo-image';

export default function WeatherListItem() {
  return (
    <View>
      <View className="mt-[22px] mb-4">
        <View className="flex flex-row items-end justify-between mx-4">
          <View className="flex flex-row">
            <View className="size-[42px] rounded-full p-[11px] bg-white flex">
              <Image
                source={require('@/assets/icons/weather/Cloud.svg')}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <View className="ml-[13px]">
              <Text className="text-[14px] font-medium">Tuesday</Text>
              <Text className="text-[14px]">12 Nov</Text>
            </View>
          </View>

          <View>
            <Text className="text-[18px] font-medium">30°C</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
