import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { produce } from '@/types'
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';
import EditButton from '@/components/forms/EditButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { useForm } from 'react-hook-form';

type produceInputs = {
    type: string;
    amount: number;
    datecollected: number;
    unit: string;
  }

const ProduceDetails = () => {
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
    const [produceDeets, setProduceDeets] = useState<produce[]>([])
    const [ModalOpen, OpenModal] = useState<boolean>(false)
    useEffect(()=>{refetchProduceInfo()},[])

    const editProduceData = async({db,data,id}:{db:SQLite.SQLiteDatabase,data:produceInputs,id:number}) =>{

      db.withTransactionAsync(async() =>{
        await db.runAsync(
          `UPDATE produce SET type=?, datecollected=?, amount=?, unit=? WHERE id=${id};`, 
          [data.type, data.datecollected, data.amount, data.unit])
      })
        .then(async()=>{
          await refetchProduceInfo()
          OpenModal(false)
        })
        .catch((e)=>console.error(e))
  }

    const EditProduceModal = ({ModalOpen, CloseModal, produce, db}:{ModalOpen:boolean, CloseModal:any, produce:produce[], db:SQLite.SQLiteDatabase}) =>{
        const {control, handleSubmit, formState:{errors}} = useForm<produceInputs>(
              {defaultValues:{
                type:produce[0].type,
                amount:produce[0].amount.toLocaleString(),
                datecollected:produce[0].datecollected,
                unit:produce[0].unit,
              }}
            )
          const id = produce[0].id
      
          return(
          <FormModal 
              title='Edit Produce' 
              isOpen={ModalOpen} 
              onPressB1={CloseModal} 
              onPressB2={
                  handleSubmit(async(data)=>{
                  await editProduceData({db,data,id})
                  .catch((e)=>console.error(e))})}
              B2text='Save'>
              <EditProduceModalForm control={control}/>
          </FormModal>)
      }

      const refetchProduceInfo = useCallback(()=>{
        
        async function refetch() {
          await db.withExclusiveTransactionAsync( async () =>{
          await setProduceDeets( await db.getAllAsync(`SELECT * FROM produce WHERE id=${id};`));
          
        });
        }
    
        refetch()
        .catch((e)=>{console.error(e)});
        }, 
      [produceDeets])

    if (!produceDeets || produceDeets.length == 0){
        return <Text>Loading...</Text>
    }
      console.log(produceDeets)
    return(
        <View className='mx-4 flex flex-col h-full'>
            <Text className='text-4xl font-medium my-10'>{produceDeets[0].type}</Text>
            <Text className='text-2xl font-medium my-2'>Details</Text>
            <InformationRows detailName='Date Collected' detail={produceDeets[0].datecollected}/>
            <InformationRows detailName='Amount of Produce Collected' detail={`${produceDeets[0].amount} ${produceDeets[0].unit}`}/>
            <EditProduceModal ModalOpen={ModalOpen} CloseModal={()=>OpenModal(false)} produce={produceDeets} db={db}/>
            <EditButton onPress={()=>OpenModal(true)}/>
        </View>
    )
}

const EditProduceModalForm =({control}:{control:any}) =>{
  return(
      <>
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

export default ProduceDetails