import { View, Text, FlatList } from 'react-native';
import React from 'react';
import MenuBlock from '@/components/menus/MenuBlock';

const MenuList =[
    {Mname:'Finances', linkname:'/finances'},
    {Mname:'Livestock', linkname:'/livestock'},
    {Mname:'Crops', linkname:'/crops'},
]



const Reports = () => {
  return (
    <View>
      <Text className='text-xl font-medium'>What type of report would you like to create?</Text>
        <FlatList
          className='flex flex-row flex-wrap mx-auto'
            data={MenuList}
            renderItem={({item})=>(
              <MenuBlock name={item.Mname} link={item.linkname}/>
            )}
            numColumns={2}
        />
    </View>
  )
}

export default Reports