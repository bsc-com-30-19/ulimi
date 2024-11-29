import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Paw from '@/assets/icons/general/PawPrint.svg'
import { router } from 'expo-router'
import Caretright from '../../assets/icons/general/CaretRight.svg'

const InLivestockTypeList = ({ dob, id}:{ dob:any, id?:any}) => {
    const proceedToLink = () =>{
        router.push({pathname:'./id/[id]', params:{id}})
      }
      return (
        <Pressable className='flex flex-row w-full my-2' onPress={proceedToLink}>
            <View className='bg-[#F5F5F5] h-10 w-10 rounded-lg items-center align-middle'>
            <Paw className='h-6 w-6'/>
            </View>
            <View className='flex flex-row justify-between'>
            <Text className='my-auto ml-4 font-medium'>{id}</Text>
            <Text className='my-auto ml-4 font-medium'>{dob}</Text>
            </View>
            <View className=' my-auto ml-auto mr-6'>
            <Caretright className=' my-auto ml-auto mr-6 h-4 w-4'/>
            </View>
        </Pressable>
      )
}

export default InLivestockTypeList