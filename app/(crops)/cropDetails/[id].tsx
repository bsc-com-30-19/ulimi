import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { crops } from '@/types'
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';

const CropDetails = () => {
    const {id} = useLocalSearchParams()
    console.log(id)
  return (
    <View className='flex flex-col'>
         <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
            <Main id={id}/>
         </SQLite.SQLiteProvider>
    </View>
  )
}

const Main = ({id}:{id:string|string[]}) => {
    const db = SQLite.useSQLiteContext()
    const crop = getCropDetails({db, id})
    if (!crop || crop.length == 0){
        return <Text>Loading...</Text>
    }
    
    return(
        <View className='mx-4'>
            <Text className='text-4xl font-medium my-10'>{crop[0].name}</Text>
            <Text className='text-2xl font-medium my-2'>Details</Text>
            <InformationRows detailName='Expected Yield date:' detail={crop[0].expectedyielddate}/>
            <InformationRows detailName='Amount Planted:' detail={`${crop[0].amountplanted} Acres`}/>
            <InformationRows detailName='Date Planted:' detail={crop[0].dateplanted}/>
        </View>
    )

}

const getCropDetails = ({db,id}:{db:SQLite.SQLiteDatabase,id:string|string[]}) =>{
    const [crops, setCrops] = useState<crops[]>([]);
    
    useEffect(()=>{db.withTransactionAsync(async()=>{
        await getData()
        .then(()=>console.log(crops))
        .catch((e)=>console.error(e))
    })}, [db])
    
    async function getData() {
        const result = await db.getAllAsync<crops>(`SELECT * FROM crops WHERE id=${id};`)
        await setCrops(result)
        await console.log(result)
  }
  
  
  return crops
}

const InformationRows = ({detailName, detail}:{detailName:string, detail:any}) => {
    return(
        <View className='flex flex-row justify-between my-3 text-lg'>
            <Text>{detailName}</Text>
            <Text>{detail}</Text>
        </View>
    )
}

export default CropDetails