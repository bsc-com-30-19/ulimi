import { View, Text } from 'react-native';
import { Image } from 'expo-image';

interface WeatherListItemProps {
  temperature: number | undefined;
  date: string;
}

export default function WeatherListItem({
  temperature,
  date,
}: WeatherListItemProps) {
  // Function to format the date from the API
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Convert the string to a Date object
    return date.toLocaleDateString('en-US', {
      // Format the date in a human-readable way
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDay = (dateString: string) => {
    const date = new Date(dateString); // Convert the string to a Date object
    return date.toLocaleDateString('en-US', {
      // Format the date in a human-readable way
      weekday: 'long', // "Mon", "Tue"
    });
  };

  // Convert temperature from Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit: number) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const temperatureInCelsius =
    temperature !== undefined
      ? fahrenheitToCelsius(temperature).toFixed(1)
      : 'N/A';
  return (
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
            <Text className="text-[14px] font-medium">{getDay(date)}</Text>
            <Text className="text-[14px]">{formatDate(date)}</Text>
          </View>
        </View>

        <View>
          <Text className="text-[18px] font-medium">
            {temperatureInCelsius}°C
          </Text>
        </View>
      </View>
    </View>
  );
}
