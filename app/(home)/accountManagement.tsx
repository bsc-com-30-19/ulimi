import { View, Text } from 'react-native'
import React from 'react'
import {useForm} from 'react-hook-form';
import CustomInput from '@/components/forms/CustomInput'

type Inputs ={
    fullname:string,
    email:string,
    password:string,
    rpassword:string,
}

const accountManagement = () => {
    const {control, register, handleSubmit, watch, formState:{errors}} = useForm<Inputs>(
        {defaultValues:{
          fullname:'',
          email:'',
          password:'',
          rpassword:'',
        }}
      )
  return (
    <View className='mx-5 mt-10'>
       <Text className='font-semibold text-base mb-2'>Full Name</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7' name="fullname" placeholder="Joel Mwala" control={control}/>
      
      <Text className='font-semibold text-base mb-2'>Email</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7' name="email" placeholder="viwemimphalo@picket.com" control={control}/>
      
      <Text className='font-semibold text-base mb-2'>Old Password</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7' name="password" placeholder="Please enter password" control={control} secureTextEntry/>
      
      <Text className='font-semibold text-base mb-2'>New Password</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-14' name="rpassword" placeholder="Please re-enter password" control={control} secureTextEntry/>
      
    </View>
  )
}

export default accountManagement