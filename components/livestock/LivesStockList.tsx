import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Paw from '@/assets/icons/general/PawPrint.svg'
import { router } from 'expo-router'
import Caretright from '../../assets/icons/general/CaretRight.svg'

const LivesStockList = ({livestocktype, type}:{livestocktype:string, type?:any}) => {
    const proceedToLink = () =>{
        router.push({pathname:'./animaldeets/[type]', params:{type}})
      }
      return (
        <Pressable className='flex flex-row w-full my-2' onPress={proceedToLink}>
            <View className='bg-[#F5F5F5] h-10 w-10 rounded-lg items-center align-middle'>
            <Paw className='h-6 w-6'/>
            </View>
            <Text className='my-auto ml-4 font-medium'>{livestocktype}</Text>
            <View className=' my-auto ml-auto mr-6'>
            <Caretright className=' my-auto ml-auto mr-6 h-4 w-4'/>
            </View>
        </Pressable>
      )
}

export default LivesStockList