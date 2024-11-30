import { View, Text } from 'react-native'
import React, { useState, useCallback } from 'react'
import * as SQLite from 'expo-sqlite';



const Main = ({item, setItems, refetchQuery, refetchParams}:{item:any, setItems:any, refetchQuery:any, refetchParams:any[],}) => {
    const db = SQLite.useSQLiteContext();
    [item, setItems] = useState();

    const refetchLivestock = useCallback(()=>{
        async function refetch() {
          await db.withExclusiveTransactionAsync( async () =>{
          await setItems( await db.getAllAsync(refetchQuery, refetchParams));
        });
        }
    
        refetch()
        .catch((e)=>{console.error(e)});
        }, 
      [item])

      
  return (
    <View>
      <Text>Main</Text>
    </View>
  )
}



export default Main