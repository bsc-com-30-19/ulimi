import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Drop from '@/assets/icons/crops/Drop.svg'
import { router } from 'expo-router'
import Caretright from '../../assets/icons/general/CaretRight.svg'

const InProduceList = ({id, date, amount, unit}:{  id:any, date:any, amount:any, unit:any}) => {
    
    const proceedToLink = () =>{
        router.push({pathname:'./id/[id]', params:{id}})
      }
      return (
        <Pressable className='flex flex-row w-full my-2' onPress={proceedToLink}>
            <View className='bg-[#F5F5F5] h-10 w-10 rounded-lg items-center align-middle'>
            <Drop className='h-6 w-6'/>
            </View>
            <View className='flex flex-row'>
            <Text className='my-auto ml-4 font-medium basis-1/2'>{date}</Text>
            <Text className='my-auto ml-4 font-medium basis-1/2'>{`${amount} ${unit}`}</Text>
            </View>
            <View className=' my-auto ml-auto mr-6'>
            <Caretright className=' my-auto ml-auto mr-6 h-4 w-4'/>
            </View>
        </Pressable>
      )
}

export default InProduceList