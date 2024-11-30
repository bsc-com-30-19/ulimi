import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Barn from '@/assets/icons/crops/Barn.svg'
import Caretright from '../../assets/icons/general/CaretRight.svg'
import { router } from 'expo-router'

const InStorageList = ({id, amountstorage, name}:{id:any, name:string,amountstorage:any}) => {
    const proceedToLink = () =>{
        router.push({pathname:'./storagedetails/[id]', params:{id}})
      }
    return (
        <Pressable className='flex flex-row w-full my-2' onPress={proceedToLink}>
            <View className='bg-[#F5F5F5] h-10 w-10 rounded-lg items-center align-middle'>
            <Barn className='h-6 w-6' fill={'#4F627E'}/>
            </View>
            <View className='flex flex-row justify-between mx-5'>
            <Text className='my-auto ml-4 font-medium'>{name}</Text>
            <Text className='my-auto ml-4 font-medium'>{`${amountstorage} kg`}</Text>
            </View>
            <View className=' my-auto ml-auto mr-6'>
            <Caretright className=' my-auto ml-auto mr-6 h-4 w-4'/>
            </View>
        </Pressable>
      )
}

export default InStorageList