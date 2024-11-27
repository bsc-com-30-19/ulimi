import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

import LogIn from './LogIn'


const CustomDrawerContent = (props:any) => {
    
  return (
    <View className='flex-1'>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
        <DrawerItem label='Backup Data' onPress={()=>console.log('hahahahaha')}/>
        <DrawerItem label='Sync Data' onPress={()=>console.log("Why sync?")}/>
      </DrawerContentScrollView>
        <LogIn/>
    </View>
  )
}

export default CustomDrawerContent