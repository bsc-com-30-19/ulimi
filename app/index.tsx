import { Text, View } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';
import * as SQLite from 'expo-sqlite';



const Index = () => {
  return (
    <View className='bg-[#37520B] w-full h-full'>
    <Redirect href="/(home)"/>
    <Text className='m-auto text-8xl font-extrabold text-white'>Ulimi</Text>
    </View>
  )
}

export default Index
