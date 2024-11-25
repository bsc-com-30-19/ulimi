import { View, Text } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox'

const Checklist = ({text, isChecked, setChecked}:{text:string, isChecked:any, setChecked:any}) => {
  return (
    <View className='flex-row items-center'>
        <Checkbox className='m-4' value={isChecked} onValueChange={setChecked}/>
        <Text>{text}</Text>
    </View>
  )
}

export default Checklist