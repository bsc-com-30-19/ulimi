import { Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import AddButton from '@/components/forms/AddButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { crops } from '@/types';
import CropsList from '@/components/crops/CropsList';

type cropInputs = {
  name:string;
  expectedyielddate:number;
  amountplanted:number;
  dateplanted:number;
}

export default function AboutScreen() {
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
  const [cropItems, setCropItems] = useState<crops[]>([]);

  const MakeCropList = () =>{ 
    
    if (cropItems.length == 0){
      return <Text className='text-center'>Add Crop</Text>
    }
    else{
      return(
        <CropsList crops={cropItems} />
      )
    }
  }

  const refetchcrop = useCallback(()=>{
    async function refetch() {
      await db.withExclusiveTransactionAsync( async () =>{
      await setCropItems( await db.getAllAsync<crops>(`SELECT * FROM crops;`));
      
    });
    }
    refetch()
    .catch((e)=>{console.error(e)});
    }, 
  [cropItems])

  useEffect(()=>{refetchcrop()},[])
   
  const {control, handleSubmit, formState:{errors}} = useForm<cropInputs>(
    {defaultValues:{
      name:'',
      expectedyielddate: new Date('2002-12-25').getTime()/1000,
      amountplanted: 100.5,
      dateplanted: new Date('2002-12-25').getTime()/1000,
    }}
  )
  
  const insertData = async({db,data}:{db:SQLite.SQLiteDatabase,data:cropInputs}) =>{

    db.withTransactionAsync(async() =>{
      await db.runAsync(
        `INSERT INTO crops (name, expectedyielddate, amountplanted, dateplanted) VALUES (?, ?, ?, ?);`, 
        [data.name, data.expectedyielddate, data.amountplanted, data.dateplanted])
    })
      .then(async()=>{
        await refetchcrop()
        SetModalOpen(false)})
      .catch((e)=>console.error(e))
  }
  if (!cropItems){
    return <Text className='text-center'>Loading..</Text>
  }
  return(<>
  <View className='w-full mx-4'>
      <MakeCropList/>  
          
      </View>
      
      <FormModal 
      title='Add Crop' 
      isOpen={ModalOpen} 
      onPressB1={()=>SetModalOpen(false)} 
      onPressB2={handleSubmit((data)=>(insertData({db, data}) 
                                        .catch((e)=>console.error(e))))}
      >
        
        <Text className="font-semibold text-base mb-2 text-left">Crop</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="name"
          placeholder="Maize"
          control={control}
          rules={{
            required:'Please enter crop Name',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Expected Yield date</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="expectedyielddate"
          placeholder="25/12/2002"
          control={control}
          rules={{
            required:'Please enter expected yield date',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Amount planted in acres</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="amountplanted"
          placeholder="100.2"
          control={control}
          rules={{
            required:'Please enter amount planted',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Date Planted</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="dateplanted"
          placeholder="25/12/2002"
          control={control}
          rules={{
            required:'Please enter Date planted',
          }}
        />
      </FormModal>
      
      </>)
}

