import { ActivityIndicator, Text, View } from 'react-native';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset'

const loadDatabase = async () =>{
  const dbName = 'LocalStorage.db';
  const dbAsset = require("../assets/database/LocalStorage.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists){
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite/`,
      {intermediates:true}
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath)
  }
}

const Index = () => {
  const [dbLoaded, setdbLoaded] = useState<boolean>(false)

  useEffect(()=>{
    loadDatabase()
      .then (()=> setdbLoaded(true))
      .catch ((e) => console.error(e))
  },[]);
  if (!dbLoaded) return (
    <View className='bg-[#37520B] w-full h-full flex flex-1'>
    <Text className='m-auto text-8xl font-extrabold text-white'>Ulimi</Text>
    <ActivityIndicator size={"large"} />
    <Text>Loading Database</Text>
    </View>
  )
  return (
    <Suspense
    fallback={
      <View className='bg-[#37520B] w-full h-full flex flex-1'>
    <Text className='m-auto text-8xl font-extrabold text-white'>Ulimi</Text>
    <ActivityIndicator size={"large"} />
    <Text>Loading Database</Text>
    </View>
    }
    >
      <SQLite.SQLiteProvider
      useSuspense
      databaseName='LocalStorage.db'
      >
      <Redirect href="/(home)"/>
      </SQLite.SQLiteProvider>
    </Suspense>
    // <View className='bg-[#37520B] w-full h-full'>
    // <Redirect href="/(home)"/>
    // <Text className='m-auto text-8xl font-extrabold text-white'>Ulimi</Text>
    // </View>
  )
}

export default Index
