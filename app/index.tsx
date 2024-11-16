import { useRouter } from 'expo-router';
import { ScrollView,FlatList, Text, View } from 'react-native';
import "../global.css"
import MenuBlock from '@/components/menus/MenuBlock';

const MenuList=[
  {Mname:'Crops', linkname:'/(stack)/(crops)'},
  {Mname:'Data Visualisation', linkname:'/(stack)/(data_viz)'},
  {Mname:'Weather', linkname:'/(stack)/(weather)'},
  {Mname:'Livestock', linkname:'/(stack)/(livestock)'},
]

export default function Index() {
  const router = useRouter();

  const handlePress = ({link}:{link:any}) =>{
    router.replace(link)
  }
  
  return (
      
      <ScrollView className='flex flex-row flex-wrap mx-auto' showsVerticalScrollIndicator={false}>
          <FlatList
            data={MenuList}
            renderItem={({item})=>(
              <MenuBlock name={item.Mname} link={item.linkname} OnPress={() => handlePress(item.linkname)}/>
            )}
            numColumns={2}
          />
      </ScrollView>
    
  );
}
