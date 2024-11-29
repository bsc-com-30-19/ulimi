import { Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import AddButton from '@/components/forms/AddButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { harvest } from '@/types';
import StorageList from '@/components/storage/StorageList';
import HarvestList from '@/components/harvests/HarvestList';

type harvestInputs = {
    name: string;
    dateharvested: number;
    amountharvested: number;
}

export default function Harvest() {
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
  const [harvestItems, setHarvestItems] = useState<harvest[]>([])
  
  const MakeHarvestList = () =>{ 
    
    if (harvestItems.length == 0){
      return <Text className='text-center'>Add item in Harvest</Text>
    }
    else{
      return(
        <HarvestList harvests={harvestItems}/>
      )
    }
  }

  const refetchharvest = useCallback(()=>{
    async function refetch() {
      await db.withExclusiveTransactionAsync( async () =>{
      await setHarvestItems( await db.getAllAsync<harvest>(`SELECT * FROM harvest;`));
    });
    }
    refetch()
    .catch((e)=>{console.error(e)});
    }, 
  [harvestItems])
  
  useEffect(()=>{refetchharvest()},[])
  
  const {control, handleSubmit, formState:{errors}} = useForm<harvestInputs>(
    {defaultValues:{
      name:'',
      dateharvested: new Date('2002-12-25').getTime()/1000,
    }}
  )

  const insertData = async({db,data}:{db:SQLite.SQLiteDatabase,data:harvestInputs}) =>{

    db.withTransactionAsync(async() =>{
      await db.runAsync(
        `INSERT INTO harvest (name, dateharvested, amountharvested) VALUES (?, ?, ?);`, 
        [data.name, data.dateharvested, data.amountharvested, ])
    })
      .then(async()=>{
        await refetchharvest()
        SetModalOpen(false)})
      .catch((e)=>console.error(e))
  }

  return(<>
  <View className='w-full mx-4'>
      <MakeHarvestList/>  
          
      </View>
      
      <FormModal 
      title='Add Harvest' 
      isOpen={ModalOpen} 
      onPressB1={()=>SetModalOpen(false)} 
      onPressB2={handleSubmit((data)=>(insertData({db, data}) 
                                        .catch((e)=>console.error(e))))}
      > 
        <Text className="font-semibold text-base mb-2 text-left">Crop</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="name"
          placeholder="Name of Harvest"
          control={control}
          rules={{
            required:'Please enter crop Name',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Date Harvested</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="dateharvested"
          placeholder="dd/mm/yyyy"
          control={control}
          rules={{
            required:'Please enter date harvested',
          }}
        />
        
        <Text className="font-semibold text-base mb-2 text-left">Amount Harvested in Kilograms</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="amountharvested"
          placeholder="Amount in kilograms"
          control={control}
          rules={{
            required:'Please enter amount harvested',
          }}
        />
      </FormModal>
      </>)
}


