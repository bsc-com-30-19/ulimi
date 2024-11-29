import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { harvest } from '@/types'
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';
import EditButton from '@/components/forms/EditButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { useForm } from 'react-hook-form';

type harvestInputs = {
    name: string;
    dateharvested: number;
    amountharvested: number;
}

const HarvestDetails = () => {
    const {id} = useLocalSearchParams()
    
  return (
    <View>
      <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
        <Main id={id}/>
      </SQLite.SQLiteProvider>
    </View>
  )
}

const Main = ({id}:{id:any}) =>{
    const db = SQLite.useSQLiteContext()
    const [harvestDeets, setHarvestDeets] = useState<harvest[]>([])
    const [ModalOpen, OpenModal] = useState<boolean>(false)
    useEffect(()=>{refetchharvest()},[])

    const editharvesttdeets = async({db,data,id}:{db:SQLite.SQLiteDatabase,data:harvestInputs,id:number}) =>{

      db.withTransactionAsync(async() =>{
        await db.runAsync(
          `UPDATE harvest SET name=?, dateharvested=? amountharvested=? WHERE id=?;`, 
          [data.name, data.dateharvested, data.amountharvested, id])
      })
        .then(async()=>{
          await refetchharvest()
          OpenModal(false)
        })
        .catch((e)=>console.error(e))
  }

    const EditLivestockModal = ({ModalOpen, CloseModal, harvest, db}:{ModalOpen:boolean, CloseModal:any, harvest:harvest[], db:SQLite.SQLiteDatabase}) =>{
        const {control, handleSubmit, formState:{errors}} = useForm<harvestInputs>(
              {defaultValues:{
                name: harvest[0].name,
                amountharvested:harvest[0].amountharvested.toLocaleString(),
                dateharvested: harvest[0].dateharvested,
              }}
            )
          const id = harvest[0].id
      
          return(
          <FormModal 
              title='Edit Harvest' 
              isOpen={ModalOpen} 
              onPressB1={CloseModal} 
              onPressB2={
                  handleSubmit(async(data)=>{
                  await editharvesttdeets({db,data,id})
                  .catch((e)=>console.error(e))})}
              B2text='Save'>
              <EditLivestockModalForm control={control}/>
          </FormModal>)
      }

      const refetchharvest = useCallback(()=>{
        async function refetch() {
          await db.withExclusiveTransactionAsync( async () =>{
          await setHarvestDeets( await db.getAllAsync<harvest>(`SELECT * FROM harvest WHERE id=${id};`));
        });
        }
        refetch()
        .catch((e)=>{console.error(e)});
        }, 
      [harvestDeets])

    if (!harvestDeets || harvestDeets.length == 0){
        return <Text>Loading...</Text>
    }
      
    return(
        <View className='mx-4 flex flex-col h-full'>
            <Text className='text-4xl font-medium my-10'>{` ${harvestDeets[0].name}`}</Text>
            <Text className='text-2xl font-medium my-2'>Details</Text>
            <InformationRows detailName='Amount:' detail={harvestDeets[0].amountharvested}/>
            <InformationRows detailName='Date:' detail={`${harvestDeets[0].dateharvested}`}/>
            <EditLivestockModal ModalOpen={ModalOpen} CloseModal={()=>OpenModal(false)} harvest={harvestDeets} db={db}/>
            <EditButton onPress={()=>OpenModal(true)}/>
        </View>
    )
}


const EditLivestockModalForm =({control}:{control:any}) =>{
  return(
      <>
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
          placeholder="200.0"
          control={control}
          rules={{
            required:'Please enter amount harvested',
          }}
        />
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

export default HarvestDetails