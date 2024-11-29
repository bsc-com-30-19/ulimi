import { View, Text, ScrollView} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import * as SQLite from 'expo-sqlite';
import { livestock } from '@/types';
import LivestockTypeList from '@/components/livestock/LivestockTypeList';
import { useLocalSearchParams } from 'expo-router';

const AnimalsOfTypeN = () => {
    const {type} = useLocalSearchParams()
  return (
    <ScrollView>
      <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
        <Main type={type}/>
      </SQLite.SQLiteProvider>
    </ScrollView>
  )
}

const Main = ({type}:{type:any}) =>{
    const db = SQLite.useSQLiteContext()
    const [livestockItems, setLivestockItems] = useState<livestock[]>([]);

    const MakeLivestockTypeList = ()=>{
        console.log(livestockItems);
        if (livestockItems.length == 0){
            return <Text className='text-center'>No Livestock Of this Type</Text>
          }
          
            return(
                <LivestockTypeList livestocks={livestockItems}/>
            )}

    const refetchLivestock = useCallback(()=>{
        async function refetch() {
          await db.withExclusiveTransactionAsync( async () =>{
          await setLivestockItems( await db.getAllAsync<livestock>(`SELECT * FROM livestock WHERE type = ?;`,[type]));
        });
        }
    
        refetch()
        .catch((e)=>{console.error(e)});
        }, 
      [livestockItems])
    
      useEffect(()=>{refetchLivestock()},[])
    
      return(
        <View>
            <MakeLivestockTypeList/>
        </View>
      )
      
}

export default AnimalsOfTypeN