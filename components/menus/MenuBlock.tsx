import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router';

const MenuBlock = ({name, link, OnPress}:{name?:string; link:any, OnPress?:any}) => {
  return (
    
      <Link className='m-2' push href={link} asChild>
        <Pressable className='h-56 w-44 bg-[#D9D9D9] rounded-2xl '>
          <Text className='text-black mt-48 ml-6'>{name}</Text>
        </Pressable>
      </Link>
    
  )
}

export default MenuBlock