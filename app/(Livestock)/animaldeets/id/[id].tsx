import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { livestock } from '@/types'
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';
import EditButton from '@/components/forms/EditButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { useForm } from 'react-hook-form';
import CustomPicker from '@/components/forms/CustomPicker'

type livestockInputs = {
    dob:number;
    vaccinationstat: 'Vaccinated' | 'Not Vaccinated' | 'Due For Vaccination';
  }

const AnimalDetails = () => {
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
    const [livestockDeets, setLiveStockDeets] = useState<livestock[]>([])
    const [ModalOpen, OpenModal] = useState<boolean>(false)
    useEffect(()=>{refetchLivestockInfo()},[])

    const editLivestockData = async({db,data,id}:{db:SQLite.SQLiteDatabase,data:livestockInputs,id:number}) =>{

      db.withTransactionAsync(async() =>{
        await db.runAsync(
          `UPDATE livestock SET dob=?, vaccinationstat=? WHERE id=?;`, 
          [data.dob, data.vaccinationstat,id])
      })
        .then(async()=>{
          await refetchLivestockInfo()
          OpenModal(false)
        })
        .catch((e)=>console.error(e))
  }

    const EditLivestockModal = ({ModalOpen, CloseModal, livestoc, db}:{ModalOpen:boolean, CloseModal:any, livestoc:livestock[], db:SQLite.SQLiteDatabase}) =>{
        const {control, handleSubmit, formState:{errors}} = useForm<livestockInputs>(
              {defaultValues:{
                dob:livestoc[0].dob,
                vaccinationstat:livestoc[0].vaccinationstat
              }}
            )
          const id = livestoc[0].id
      
          return(
          <FormModal 
              title='Edit Crops' 
              isOpen={ModalOpen} 
              onPressB1={CloseModal} 
              onPressB2={
                  handleSubmit(async(data)=>{
                  await editLivestockData({db,data,id})
                  .catch((e)=>console.error(e))})}
              B2text='Save'>
              <EditLivestockModalForm control={control}/>
          </FormModal>)
      }

      const refetchLivestockInfo = useCallback(()=>{
        async function refetch() {
          await db.withExclusiveTransactionAsync( async () =>{
          await setLiveStockDeets( await db.getAllAsync(`SELECT * FROM livestock WHERE id=${id};`));
          
        });
        }
    
        refetch()
        .catch((e)=>{console.error(e)});
        }, 
      [livestockDeets])

    if (!livestockDeets || livestockDeets.length == 0){
        return <Text>Loading...</Text>
    }
      
    return(
        <View className='mx-4 flex flex-col h-full'>
            <Text className='text-4xl font-medium my-10'>{`${livestockDeets[0].type} ${livestockDeets[0].id}`}</Text>
            <Text className='text-2xl font-medium my-2'>Details</Text>
            <InformationRows detailName='Date Of Birth:' detail={livestockDeets[0].dob}/>
            <InformationRows detailName='Vaccination Status:' detail={`${livestockDeets[0].vaccinationstat}`}/>
            <EditLivestockModal ModalOpen={ModalOpen} CloseModal={()=>OpenModal(false)} livestoc={livestockDeets} db={db}/>
            <EditButton onPress={()=>OpenModal(true)}/>
        </View>
    )
}


const EditLivestockModalForm =({control}:{control:any}) =>{
  return(
      <>
      <Text className="font-semibold text-base mb-2 text-left">Date Of Birth</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="dob"
          placeholder="25/12/2002"
          control={control}
          rules={{
            required:'Please enter date of birth',
          }}
        />

        <Text className="font-semibold text-base mb-2 text-left">Vaccination Status</Text>
        <CustomPicker control={control} name='vaccinationstat' />
        
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

export default AnimalDetails