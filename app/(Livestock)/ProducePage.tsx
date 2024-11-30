import { Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';
import AddButton from '@/components/forms/AddButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { produce } from '@/types';
import ProduceTypeList from '@/components/produce/ProduceTypeList';

type produceInputs = {
  type: string;
  amount: number;
  datecollected: number;
  unit: string;
}

export default function Produce() {
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
  const [produceItems, setProduceItems] = useState<produce[]>([])
  
  const MakeProduceList = () =>{ 
    
    if (produceItems.length == 0){
      return <Text className='text-center'>Add item in Produce</Text>
    }
    else{
      return(
        <ProduceTypeList produces={produceItems}/>
      )
    }
  }

  const refetchharvest = useCallback(()=>{
    async function refetch() {
      await db.withExclusiveTransactionAsync( async () =>{
      await setProduceItems( await db.getAllAsync<produce>(`SELECT * FROM produce GROUP BY type;`));
    });
    }
    refetch()
    .catch((e)=>{console.error(e)});
    }, 
  [produceItems])
  
  useEffect(()=>{refetchharvest()},[])
  
  const {control, handleSubmit, formState:{errors}} = useForm<produceInputs>(
    {defaultValues:{
      type:'Milk',
      datecollected: new Date('2002-12-25').getTime()/1000,
      amount:20,
      unit: 'ml',
    }}
  )

  const insertData = async({db,data}:{db:SQLite.SQLiteDatabase,data:produceInputs}) =>{

    db.withTransactionAsync(async() =>{
      await db.runAsync(
        `INSERT INTO produce (type, amount, datecollected, unit) VALUES (?, ?, ?, ?);`, 
        [data.type, data.amount, data.datecollected, data.unit])
    })
      .then(async()=>{
        await refetchharvest()
        SetModalOpen(false)})
      .catch((e)=>console.error(e))
  }

  return(<>
  <View className='w-full mx-4'>
      <MakeProduceList/>  
          
      </View>
      
      <FormModal 
      title='Add Produce' 
      isOpen={ModalOpen} 
      onPressB1={()=>SetModalOpen(false)} 
      onPressB2={handleSubmit((data)=>(insertData({db, data}) 
                                        .catch((e)=>console.error(e))))}
      > 
        <Text className="font-semibold text-base mb-2 text-left">Produce Type</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="type"
          placeholder="NMilk"
          control={control}
          rules={{
            required:'Please enter produce type',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Date collected</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="datecollected"
          placeholder="dd/mm/yyyy"
          control={control}
          rules={{
            required:'Please enter date collected',
          }}
        />
        
        <Text className="font-semibold text-base mb-2 text-left">Amount of produce</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="amount"
          placeholder="20"
          control={control}
          rules={{
            required:'Please enter amount of Produce',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">unit</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="unit"
          placeholder="ml"
          control={control}
          rules={{
            required:'Please enter unit',
          }}
        />
      </FormModal>
      </>)
}


