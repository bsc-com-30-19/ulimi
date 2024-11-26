import { View, Text, Pressable } from 'react-native'
import React from 'react'
import FlowerTulip from '../../assets/icons/crops/FlowerTulip.svg'
import Caretright from '../../assets/icons/general/CaretRight.svg'
import { router } from 'expo-router'

const CropList = ({cropName, link}:{cropName:string, link:any}) => {
  const proceedToLink = () =>{
    router.push(link)
  }
  return (
    <Pressable className='flex flex-row w-full my-1' onPress={proceedToLink}>
        <View className='bg-[#F5F5F5] h-10 w-10 rounded-lg'>
        <FlowerTulip className='h-6 w-6 m-auto'/>
        </View>
        <Text className='my-auto ml-4 font-medium'>{cropName}</Text>
        <Caretright className=' my-auto ml-auto mr-6 h-4 w-4'/>
    </Pressable>
  )
}

export default CropList