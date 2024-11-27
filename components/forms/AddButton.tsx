import { View, Text, Pressable } from 'react-native'
import Plus from '../../assets/icons/general/Plus.svg'
import React from 'react'

const AddButton = ({style, onPress}:{style?:any, onPress:any}) => {
  return (
    <Pressable className='rounded-full bg-[#5C5C5C] absolute right-0 bottom-0 m-3' style={style} onPress={onPress}>
       <Plus className='h-8 w-8 m-2'/>
    </Pressable>
  )
}

export default AddButton