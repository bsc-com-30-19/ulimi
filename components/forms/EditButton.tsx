import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Edit from '@/assets/icons/general/NotePencil.svg'

const EditButton = ({style, onPress}:{style?:any, onPress:any}) => {
  return (
    <Pressable className='rounded-full bg-[#5C5C5C] absolute right-0 bottom-0 m-3 p-2' style={style} onPress={onPress}>
      <Edit className='h-8 w-8 m-2'/>
    </Pressable >
  )
}

export default EditButton