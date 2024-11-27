import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ScrollViewBase } from 'react-native';
import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import AddButton from '@/components/forms/AddButton';
import CropList from '@/components/crops/CropList';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import CustomButton from '@/components/forms/CustomButton';
import { crops } from '@/types';
import CropsList from '@/components/crops/CropsList';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type cropInputs = {
  name:string;
  expectedyielddate:number;
  amountplanted:number;
  dateplanted:number;
}



export default function AboutScreen() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {bottom} = useSafeAreaInsets();
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
  const db = SQLite.useSQLiteContext()

  const {control, register, handleSubmit, watch, formState:{errors}} = useForm<cropInputs>(
    {defaultValues:{
      name:'',
      expectedyielddate: new Date('2002-12-25').getTime()/1000,
      amountplanted: 100.5,
      dateplanted: new Date('2002-12-25').getTime()/1000,
    }}
  )
  
  return(<>
  <View className='w-full mx-4'>
          <GetAndMakeCropList db={db}/>
          
      </View>
      
      

      <FormModal title='Add Crop' isOpen={ModalOpen} >
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
        
        <View className='flex flex-row'>
          <View className='basis-1/2 '>
          <CustomButton 
            text='Cancel' 
            className='mx-auto bg-[#B5B9AE] h-11 px-8 rounded-lg' 
            textStyle='text-[#0D1E35] text-base text-center my-auto font-semibold'
            onPress={()=>SetModalOpen(false)}
          />
          </View>
          <View className='basis-1/2 '>
          <CustomButton 
            text='Add' 
            className='mx-auto bg-[#37520B] h-11 px-8 rounded-lg font-semibold'
          onPress={handleSubmit((data)=>insertData({db, data}))}
          />
          </View>
        </View>
      </FormModal>
      
      </>)
}
const GetAndMakeCropList= ({db}:{db:SQLite.SQLiteDatabase}) =>{
  
  const [crops, setCrops] = useState<crops[]>([]);
  useEffect(()=>{db.withTransactionAsync(async()=>{
    await getData()
      .then(()=>console.log(crops))
      .catch((e)=>console.error(e))
  })}, [db])
  
  async function getData() {
    const result = await db.getAllAsync<crops>(`SELECT * FROM crops;`)
    setCrops(result)
  }
  getData()
  return(
    <CropsList crops={crops} />
  )
}

const insertData= async({db,data}:{db:SQLite.SQLiteDatabase,data:cropInputs}) =>{

  db.withTransactionAsync(async() =>{
    await db.runAsync(
      `INSERT INTO crops (name, expectedyielddate, amountplanted, dateplanted) VALUES (?, ?, ?, ?);`, 
      [data.name, data.expectedyielddate, data.amountplanted, data.dateplanted])
  })
    .then(()=>console.log('hey'))
    .catch((e)=>console.error(exports))
}