import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, className='bg-[#37520B] h-11 rounded-lg', text, textStyle='text-[#F9FBFF] text-base text-center my-auto font-semibold'}:{onPress?:any, className?:string, text:string, textStyle?:string}) => {
  return (
    <Pressable onPress={onPress} className={className}>
        <Text className={textStyle}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton