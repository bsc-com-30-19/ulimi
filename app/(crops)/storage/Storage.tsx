import { Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import AddButton from '@/components/forms/AddButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { storage } from '@/types';
import StorageList from '@/components/storage/StorageList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

type storageInputs = {
  name:string;
  amountinstorage:number;
}

export default function Storage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  
  return (
    
    <View className='flex flex-1 w-full '>
      <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
        <Main ModalOpen={modalOpen} SetModalOpen={setModalOpen}/>
      </SQLite.SQLiteProvider>
      <AddButton onPress={()=>setModalOpen(true)} />
    </View>
    
  );
}

const Main = ({ModalOpen, SetModalOpen}:{ModalOpen:boolean, SetModalOpen:any}) =>{
  const db = SQLite.useSQLiteContext();
  const [storageItems, setStorageItems] = useState<storage[]>([])
  
  const MakeStorageList = () =>{ 
    
    if (storageItems.length == 0){
      return <Text className='text-center'>Add item in Storage</Text>
    }
    else{
      return(
        <StorageList storage={storageItems} action={()=>{SetModalOpen(true)}}/>
      )
    }
  }

  const refetchstorage = useCallback(()=>{
    async function refetch() {
      await db.withExclusiveTransactionAsync( async () =>{
      await setStorageItems( await db.getAllAsync<storage>(`SELECT * FROM storage;`));
    });
    }
    refetch()
    .catch((e)=>{console.error(e)});
    }, 
  [storageItems])
  
  useEffect(()=>{refetchstorage()},[])
  
  const {control, handleSubmit, formState:{errors}} = useForm<storageInputs>(
    {defaultValues:{
      name:'',
      amountinstorage:10
    }}
  )

  const insertData = async({db,data}:{db:SQLite.SQLiteDatabase,data:storageInputs}) =>{

    db.withTransactionAsync(async() =>{
      await db.runAsync(
        `INSERT INTO storage (name, amountinstorage) VALUES (?, ?);`, 
        [data.name, data.amountinstorage])
    })
      .then(async()=>{
        await refetchstorage()
        SetModalOpen(false)})
      .catch((e)=>console.error(e))
  }

  return(<>
  <View className='w-full mx-4'>
      <MakeStorageList/>  
          
      </View>
      
      <FormModal 
      title='Add Storage' 
      isOpen={ModalOpen} 
      onPressB1={()=>SetModalOpen(false)} 
      onPressB2={handleSubmit((data)=>(insertData({db, data}) 
                                        .catch((e)=>console.error(e))))}
      > 
        <Text className="font-semibold text-base mb-2 text-left">Crop</Text>
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
      </FormModal>
      </>)
}


