import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import AddButton from '@/components/forms/AddButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { livestock } from '@/types';
import LiveStocksList from '@/components/livestock/liveStocksList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type livestockInputs = {
  type:string;
  dob:number;
  vaccinationstat: 'Vaccinated' | 'Not Vaccinated' | 'Due For Vaccination';
}

export default function LivestockPage() {
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

  const {control, handleSubmit, formState:{errors}} = useForm<livestockInputs>(
    {defaultValues:{
      type:'',
      dob: new Date('2002-12-25').getTime()/1000,
      vaccinationstat:'Not Vaccinated',
    }}
  )
  
  return(<>
  <View className='w-full mx-4'>
          <GetAndMakelivestockList db={db}/>
          
      </View>
      
      <FormModal 
      title='Add Crop' 
      isOpen={ModalOpen} 
      onPressB1={()=>SetModalOpen(false)} 
      onPressB2={handleSubmit((data)=>(insertData({db, data}) 
                                        .catch((e)=>console.error(e))))}
      >
        <ModalForm  control={control}/>
      </FormModal>
      
      </>)
}

const GetAndMakelivestockList= ({db}:{db:SQLite.SQLiteDatabase}) =>{
  
  const [livestock, setLivestock] = useState<livestock[]>([]);

  async function getData() {
    const result = await db.getAllAsync<livestock>(`SELECT * FROM livestock;`)
    setLivestock(result)
  }

  useEffect(()=>{db.withTransactionAsync(async()=>{
    await getData()
      .then(()=>console.log('livestock recovered'))
      .catch((e)=>console.error(e))
  })}, [db])
  
  

  if (!livestock){
    return <Text className='text-center'>Add a crop</Text>
  }
  else if(livestock.length == 0){
    return <Text className='text-center'>Loading</Text>
  }
  return(
    <LiveStocksList livestocks={livestock} />
  )
}

const insertData = async({db,data}:{db:SQLite.SQLiteDatabase,data:livestockInputs}) =>{

  db.withTransactionAsync(async() =>{
    await db.runAsync(
      `INSERT INTO livestock (type, dob, vaccinationstat) VALUES (?, ?, ?);`, 
      [data.type, data.dob, data.vaccinationstat, ])
  })
    .then(()=>console.log('data inserted'))
    .catch((e)=>console.error(e))
}

const ModalForm =({control}:{control:any})=>{
  return(
    <>
    <Text className="font-semibold text-base mb-2 text-left">LiveStock Type</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="type"
          placeholder="type"
          control={control}
          rules={{
            required:'Please enter livestock type',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Date Of Birth</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="dob"
          placeholder="25/12/2002"
          control={control}
          rules={{
            required:'Please date of birth',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Vaccination Status</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="vacin"
          placeholder="100.2"
          control={control}
          rules={{
            required:'thehehehr',
          }}
        />
  </>
  )
}