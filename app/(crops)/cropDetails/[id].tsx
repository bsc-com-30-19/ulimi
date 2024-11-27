import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { crops } from '@/types'
import * as SQLite from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';
import EditButton from '@/components/forms/EditButton';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import { useForm } from 'react-hook-form';

type cropInputs = {
    name:string;
    expectedyielddate:number;
    amountplanted:number|any;
    dateplanted:number;
  }

const CropDetails = () => {
    const {id} = useLocalSearchParams()
    console.log(id)
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
    const db = SQLite.useSQLiteContext()
    let crop = getCropDetails({db, id})
    

    if (!crop || crop.length == 0){
        return <Text>Loading...</Text>
    }
    
    return(
        <>
        <View className='mx-4 flex flex-col h-full'>
            <Text className='text-4xl font-medium my-10'>{crop[0].name}</Text>
            <Text className='text-2xl font-medium my-2'>Details</Text>
            <InformationRows detailName='Expected Yield date:' detail={crop[0].expectedyielddate}/>
            <InformationRows detailName='Amount Planted:' detail={`${crop[0].amountplanted} Acres`}/>
            <InformationRows detailName='Date Planted:' detail={crop[0].dateplanted}/>
            <SQLite.SQLiteProvider databaseName='LocalStorage.db'>
            <EditCropModal ModalOpen={ModalOpen} CloseModal={()=>OpenModal(false)} crop={crop} db={db}/>
            </SQLite.SQLiteProvider>
            <EditButton onPress={()=>OpenModal(true)}/>
        </View>
        </>
    )

}

const getCropDetails = ({db,id}:{db:SQLite.SQLiteDatabase,id:string|string[]|number}) =>{
    const [crops, setCrops] = useState<crops[]>([]);
    
    useEffect(()=>{db.withTransactionAsync(async()=>{
        await getData()
        .then(()=>console.log(crops))
        .catch((e)=>console.error(e))
    })}, [db])
    
    async function getData() {
        const result = await db.getAllAsync<crops>(`SELECT * FROM crops WHERE id=${id};`)
        await setCrops(result)
        await console.log(result)
  }

  return crops
}

const InformationRows = ({detailName, detail}:{detailName:string, detail:any}) => {
    return(
        <View className='flex flex-row justify-between my-3 text-lg'>
            <Text>{detailName}</Text>
            <Text>{detail}</Text>
        </View>
    )
}

const EditCropModal = ({ModalOpen, CloseModal, crop, db}:{ModalOpen:boolean, CloseModal:any, crop:crops[], db:SQLite.SQLiteDatabase}) =>{
    
    const {control, register, handleSubmit, watch, formState:{errors}} = useForm<cropInputs>(
        {defaultValues:{
          name:crop[0].name,
          expectedyielddate: crop[0].expectedyielddate,
          amountplanted: crop[0].amountplanted,
          dateplanted: crop[0].dateplanted,
        }}
      )
    const id = crop[0].id

    return(
    <FormModal 
        title='Edit Crops' 
        isOpen={ModalOpen} 
        onPressB1={CloseModal} 
        onPressB2={
            handleSubmit(async(data)=>{
            editDatabaseCropData({db,data,id})
            .catch((e)=>console.error(e))
            CloseModal()})}
        B2text='Save'>
        <EditCropModalForm crop={crop} control={control}/>
    </FormModal>)
}

const EditCropModalForm =({crop, control}:{crop:crops[], control:any}) =>{
    return(
        <>
        <Text className="font-semibold text-base mb-2 text-left">Crop</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="name"
          placeholder="Maize"
          control={control}
        />

        <Text className="font-semibold text-base mb-2 text-left">Expected Yield date</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="expectedyielddate"
          placeholder="25/12/2002"
          control={control}
        />

        <Text className="font-semibold text-base mb-2 text-left">Amount planted in acres</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="amountplanted"
          placeholder="100.2"
          control={control}
        />

        <Text className="font-semibold text-base mb-2 text-left">Date Planted</Text>
        <CustomInput
          textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
          name="dateplanted"
          placeholder="25/12/2002"
          control={control}
        />
        </>
    )
}




const editDatabaseCropData = async({db,data,id}:{db:SQLite.SQLiteDatabase,data:cropInputs,id:number}) =>{

    db.withTransactionAsync(async() =>{
      await db.runAsync(
        `UPDATE crops SET name=?, expectedyielddate=?, amountplanted=?, dateplanted=? WHERE id=?;`, 
        [data.name, data.expectedyielddate, data.amountplanted, data.dateplanted,id])
    })
      .then(()=>console.log('Data Updated'))
      .catch((e)=>console.error(e))
}

export default CropDetails