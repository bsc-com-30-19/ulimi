import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Index = () => {
  return (
    <View className='bg-slate-800'>
    <Redirect href="/(home)"/>
    </View>
  )
}

export default Index
