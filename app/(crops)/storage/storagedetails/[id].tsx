import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { storage } from '@/types'
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';
import EditButton from '@/components/forms/EditButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { useForm } from 'react-hook-form';

type storageInputs = {
    name:string;
    amountinstorage:number;
  }

const StorageDetails = () => {
    const {id} = useLocalSearchParams()
    
  return (
    <View className='flex flex-col'>
         <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
            <Main id={id}/>
         </SQLite.SQLiteProvider>
    </View>
  )
}

const Main = ({id}:{id:string|string[]}) => {
    const [ModalOpen, OpenModal] = useState<boolean>(false)
    const [storageDeets, setStorageDeets] = useState<storage[]>([])
    const db = SQLite.useSQLiteContext()
    
    const EditCropModal = ({ModalOpen, CloseModal, storage, db}:{ModalOpen:boolean, CloseModal:any, storage:storage[], db:SQLite.SQLiteDatabase}) =>{
    
    const {control, handleSubmit, formState:{errors}} = useForm<storageInputs>(
          {defaultValues:{
            name:storage[0].name,
            amountinstorage:storage[0].amountinstorage.toLocaleString(),
          }}
        )
      const id = storage[0].id
  
      return(
        <FormModal 
        title='Edit Storage' 
        isOpen={ModalOpen} 
        B2text='Save'
        onPressB1={()=>OpenModal(false)} 
        onPressB2={handleSubmit((data)=>(editStoreData({db, data, id}) 
                                          .catch((e)=>console.error(e))))}
        > 
          <Text className="font-semibold text-base mb-2 text-left">Storage Name</Text>
          <CustomInput
            textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
            name="name"
            placeholder="Storage one"
            control={control}
            rules={{
              required:'Please enter crop Name',
            }}
          />
  
          <Text className="font-semibold text-base mb-2 text-left">Amount In storage in kilograms</Text>
          <CustomInput
            textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
            name="amountinstorage"
            placeholder="600.0"
            control={control}
            rules={{
              required:'Please enter amount in storage',
            }}
          />
        </FormModal>)
  }

    const editStoreData = async({db,data,id}:{db:SQLite.SQLiteDatabase,data:storageInputs,id:number}) =>{

      db.withTransactionAsync(async() =>{
        await db.runAsync(
          `UPDATE storage SET name=?, amountinstorage=? WHERE id=?;`, 
          [data.name, data.amountinstorage ,id])
      })
        .then(async()=>{
          await refetchstorage()
          OpenModal(false)
        })
        .catch((e)=>console.error(e))
  }

  const refetchstorage = useCallback(()=>{
    async function refetch() {
      await db.withExclusiveTransactionAsync( async () =>{
      await setStorageDeets( await db.getAllAsync<storage>(`SELECT * FROM storage;`));
    });
    }
    refetch()
    .catch((e)=>{console.error(e)});
    }, 
  [storageDeets])

  useEffect(()=>{refetchstorage()},[])

    if (!storageDeets || storageDeets.length == 0){
        return <Text>Loading...</Text>
    }
    
    return(
        <>
        <View className='mx-4 flex flex-col h-full'>
            <Text className='text-4xl font-medium my-10'>{storageDeets[0].name}</Text>
            <Text className='text-2xl font-medium my-2'>Details</Text>
            <InformationRows detailName='Amount in storage' detail={`${storageDeets[0].amountinstorage} Kg`}/>
            <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
            <EditCropModal ModalOpen={ModalOpen} CloseModal={()=>OpenModal(false)} storage={storageDeets} db={db}/>
            </SQLite.SQLiteProvider>
            <EditButton onPress={()=>OpenModal(true)}/>
        </View>
        </>
    )

}

const InformationRows = ({detailName, detail}:{detailName:string, detail:any}) => {
    return(
        <View className='flex flex-row justify-between my-3 text-lg'>
            <Text>{detailName}</Text>
            <Text>{detail}</Text>
        </View>
    )
}


export default StorageDetails