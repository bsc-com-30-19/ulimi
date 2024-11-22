import { useRouter } from 'expo-router';
import { ScrollView,FlatList, Text, View } from 'react-native';
import "../../global.css"
import MenuBlock from '@/components/menus/MenuBlock';

const MenuList=[
  {Mname:'Crops', linkname:'../(crops)/CropHome'},
  {Mname:'Data Visualisation', linkname:'../(data_viz)/dataScreen'},
  {Mname:'Weather', linkname:'../(weather)/weather'},
  {Mname:'Livestock', linkname:'../(livestock)/liveStockMenu'},
  {Mname:'Reports', linkname:'../(reports)/reports'}
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
