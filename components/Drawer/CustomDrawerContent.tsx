import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import LogIn from './LogIn'


const CustomDrawerContent = (props:any) => {
    
  return (
    <View className='flex-1'>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>

        <LogIn/>
    </View>
  )
}

export default CustomDrawerContent