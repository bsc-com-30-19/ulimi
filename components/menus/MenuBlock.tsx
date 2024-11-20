import { View, Text } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router';

const MenuBlock = ({name, link, OnPress}:{name?:string; link:any, OnPress?:any}) => {
  return (
    <View  className='h-56 w-44 bg-[#D9D9D9] rounded-2xl m-2'>
      <Link  onPress={OnPress} href={link} style={{height:'100%', width:'100%', position:'absolute'} }/>
      <Text className='text-black mt-48 ml-6'>{name}</Text>
    </View>
  )
}

export default MenuBlock