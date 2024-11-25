import { View, Text } from 'react-native'
import React from 'react'

const Finances = () => {
  return (
    <View className='w-full'>
      
      <View className='py-2 flex flex-row w-full border-[#80899A] border-y-[1px] text-xs'>
        <Text className='basis-1/3 text-center'>Name</Text>
        <Text className='basis-1/3 text-center'>Date</Text>
        <Text className='basis-1/3 text-center'>Amount</Text>
      </View>


    </View>
  )
}

export default Finances