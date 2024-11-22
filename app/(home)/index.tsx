import { useRouter } from 'expo-router';
import { ScrollView,FlatList, Text, View } from 'react-native';
import "../../global.css"
import MenuBlock from '@/components/menus/MenuBlock';

const MenuList=[
  {Mname:'Crops', linkname:'../(crops)', route:"(crops)"},
  {Mname:'Data Visualisation', linkname:'/(data_viz)', route:"(data_viz)" },
  {Mname:'Weather', linkname:'/(weather)', route:"(weather)"},
  {Mname:'livestock', linkname:'/(Livestock)', route:"(livestock)"},
]

export default function Index() {
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
