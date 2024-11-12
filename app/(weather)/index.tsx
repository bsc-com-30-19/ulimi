import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import WeatherListItem from '@/components/weather/WeatherListItem';

export default function WeatherScreen() {
  return (
    <View className="flex max-w-[390] mx-[20px]">
      <View className="mt-[41px] bg-[#A6D6E8] max-w-[358px] h-[200px] rounded-[18px] _flex-1">
        <View className="flex flex-col mt-4 ml-4">
          <Text className="text-base font-semibold">Today's Weather</Text>
          <Text className="text-[10px]">11 November 2024</Text>
        </View>
        <View></View>
      </View>

      <View className="bg-[#A6D6E8] mt-[18px] rounded-[18px] max-w-[358px]">
        <View className="flex flex-row justify-between mx-4 mt-4">
          <View>
            <Text className="text-base font-semibold">This Week’s Weather</Text>
          </View>
          <View>
            <Text className="text-[13px]">Next week</Text>
          </View>
        </View>

        <View className="mt-2">
          <WeatherListItem />
          <WeatherListItem />
          <WeatherListItem />
          <WeatherListItem />
          <WeatherListItem />
        </View>
      </View>
    </View>
  );
}
