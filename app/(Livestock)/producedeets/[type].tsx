import { View, Text, ScrollView} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import * as SQLite from 'expo-sqlite';
import { produce } from '@/types';
import ProduceList from '@/components/produce/ProduceList';
import { useLocalSearchParams } from 'expo-router';

const ProduceOfTypeN = () => {
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
    const [produceItems, setProduceItems] = useState<produce[]>([]);

    const MakeProduceItemList = ()=>{
        if (produceItems.length == 0){
            return <Text className='text-center'>No produce of this Type</Text>
          }
            return(
                <ProduceList produces={produceItems}/>
            )}

    const refetchProduce = useCallback(()=>{
        async function refetch() {
          await db.withExclusiveTransactionAsync( async () =>{
          await setProduceItems( await db.getAllAsync<produce>(`SELECT * FROM produce WHERE type = ?;`,[type]));
        });
        }
    
        refetch()
        .catch((e)=>{console.error(e)});
        }, 
      [produceItems])
    
      useEffect(()=>{refetchProduce()},[])
    
      return(
        <View>
            <MakeProduceItemList/>
        </View>
      )
      
}

export default ProduceOfTypeN