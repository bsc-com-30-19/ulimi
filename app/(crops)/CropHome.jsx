import { FlatList} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { Link } from 'expo-router'; // Import Link from expo-router
import MenuBlock from '../../components/menus/MenuBlock'

const MenuList=[
  {Mname:'Crops', linkname:'./croppage'},
  {Mname:'Storage', linkname:'./storage/Storage'},
  {Mname:'Tasks', linkname:'./task/TaskList'},
  {Mname:'Harvests', linkname:'./harvest/Harvest'},
]

const Home = () => {
  return (
    <FlatList
          className='flex flex-row flex-wrap mx-auto'
            data={MenuList}
            renderItem={({item})=>(
              <MenuBlock name={item.Mname} link={item.linkname}/>
            )}
            numColumns={2}
    />
  );
}

export default Home;
