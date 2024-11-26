import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { Link } from 'expo-router'; // Import Link from expo-router
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddButton from '@/components/forms/AddButton';
import CropList from '@/components/livestock/CropList';
import FormModal from '@/components/forms/FormModal';
import CustomInput from '@/components/forms/CustomInput';
import CustomButton from '@/components/forms/CustomButton';

type cropInputs = {
  name:string;
  expectedyielddate:number;
  amountplanted:number;
  dateplanted:number;
}


export default function AboutScreen() {
  const {control, register, handleSubmit, watch, formState:{errors}} = useForm<cropInputs>(
    {defaultValues:{
      name:'',
      expectedyielddate:12/25/2002,
      amountplanted:0,
      dateplanted:0,
    }}
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {bottom} = useSafeAreaInsets();
  const buttonpressed =()=>{
    setModalOpen(true)
    console.log(modalOpen)
  }
  return (
    
    <View className='flex flex-1'>
      <View className='w-full mx-4'>
          <CropList cropName='Maize' link='/Maize'/>
          <CropList cropName='Tobacco' link='tobacco'/>
      </View>
      <AddButton onPress={()=>setModalOpen(true)}/>
      <FormModal title='Add Crop' isOpen={modalOpen} >
      
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
          onPress={()=>setModalOpen(false)}
        />
        </View>
        <View className='basis-1/2 '>
        <CustomButton 
          text='Add' 
          className='mx-auto bg-[#37520B] h-11 px-8 rounded-lg font-semibold'
        
        />
        </View>
      </View>
      </FormModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topBar: {
    width: '100%',
    backgroundColor: 'green',
    padding: 15,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600', // Semi-bold
  },
  listContainer: {
    marginTop: 80, // Adjust based on the height of the top bar
    marginLeft: 30, // Position the list a bit away from the left edge
    alignItems: 'flex-start',
  },
  listItem: {
    marginBottom: 40,
  },
  link: {
    color: 'black',
    fontSize: 45,
  },
});
