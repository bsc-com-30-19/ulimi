import { Text, StyleSheet, View } from 'react-native';

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
        <View className="flex justify-between flex-row mt-4 mx-4">
          <View>
            <Text className="text-base font-semibold">This Week’s Weather</Text>
          </View>
          <View>
            <Text className="text-[13px]">Next week</Text>
          </View>
        </View>

        <View className="mt-[31px] mb-4">
          <View className="mx-4 flex flex-row justify-between">
            <View>
              <View></View>

              <View>
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
    </View>
  );
}
