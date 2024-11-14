import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import WeatherListItem from '@/components/weather/WeatherListItem';
import TodayItem from '@/components/weather/TodayItem';

const API_KEY = 'JVtwGAh2UCX1rI44XBWZiOu1mNmUvASM';

// Define TypeScript types for the fetched weather data
interface Temperature {
  Metric: {
    Value: number;
  };
}

interface Forecast {
  Date: string;
  Temperature: Temperature;
  Day: {
    IconPhrase: string; // Description like "Clear", "Cloudy", etc.
  };
}

interface WeatherData {
  Temperature: Temperature;
  WeatherText: string;
}

interface ForecastData {
  DailyForecasts: Forecast[];
}

// Function to get the city key based on city name
const getCityKey = async (cityName: string) => {
  const locationResponse = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`
  );
  const locationData = await locationResponse.json();
  return locationData[0]?.Key; // Return the location key for the first result
};

// Function to format the date from the API
const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Convert the string to a Date object
  return date.toLocaleDateString('en-US', {
    // Format the date in a human-readable way
    weekday: 'short', // "Mon", "Tue"
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityKey = await getCityKey('Zomba'); // Get the location key for "Zomba"

        // Fetch current weather data using the city key
        const currentWeatherResponse = await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`
        );
        const currentWeatherData: WeatherData[] =
          await currentWeatherResponse.json();
        setWeatherData(currentWeatherData[0]); // Assume the response is an array and take the first item

        // Fetch the 5-day forecast
        const forecastResponse = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`
        );
        const forecastData: ForecastData = await forecastResponse.json();
        setForecastData(forecastData); // Set the forecast data

        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View className="flex items-center justify-center h-full">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex max-w-[390] mx-5">
      <View className="mt-[41px] bg-[#A6D6E8] max-w-[358px] h-[200px] rounded-[18px] flex justify-between">
        <View className="flex flex-col mt-4 ml-4">
          <Text className="text-base font-semibold">Today's Weather</Text>
          <Text className="text-[10px]">
            {formatDate('2024-11-11T07:00:00+02:00')}
          </Text>{' '}
          {/* Use formatted date */}
          <Text className="text-xl">
            {weatherData?.Temperature?.Metric?.Value}°C
          </Text>
          <Text className="text-sm">{weatherData?.WeatherText}</Text>{' '}
        </View>
        <View className="flex flex-row mb-3 ml-5">
          <TodayItem />
          <TodayItem />
          <TodayItem />
          <TodayItem />
        </View>
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

        {/* Loop through the daily forecast data to display the 5-day weather */}
        {forecastData?.DailyForecasts.slice(0, 5).map((forecast, index) => (
          <WeatherListItem
            key={index}
            temperature={forecast.Temperature.Maximum.Value}
            // date={formatDate(forecast.Date)} // Pass the formatted date
          />
        ))}
      </View>
    </View>
  );
}
