import React from 'react';
import { FlatList } from 'react-native';
import MenuBlock from '../../components/menus/MenuBlock'

const MenuList=[
  {Mname:'Livestock', linkname:'/LivestockPage', route:"LivestockPage"},
  {Mname:'Produce', linkname:'/ProducePage', route:"ProducePage" },
  {Mname:'Tasks', linkname:'/TaskPage', route:"TasksPage"},

]


export default function Dashboard({ navigation }) {
  return(<FlatList
  className='flex flex-row flex-wrap mx-auto'
    data={MenuList}
    renderItem={({item})=>(
      <MenuBlock name={item.Mname} link={item.linkname}/>
    )}
    numColumns={2}
  />
  );
}

