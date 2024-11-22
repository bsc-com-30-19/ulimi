import { View, Text, ScrollView, TextInput, Button, StyleSheet} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '@/components/forms/CustomInput';

type Inputs = {
    fullname:string,
    email:string,
    password:string,
    rpassword:string
};



const SignUp = () => {
    const {control, register, handleSubmit, watch, formState:{errors}} = useForm<Inputs>(
      {defaultValues:{
        fullname:'',
        email:'',
        password:'',
        rpassword:'',
      }}
    )

  return (
    <ScrollView className='bg-white'>
      <View className='px-8'>
      
      <Text className='font-semibold text-base mb-2'>Full Name</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7' name="fullname" placeholder="Joel Mwala" control={control}/>
      
      <Text className='font-semibold text-base mb-2'>Email</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7' name="email" placeholder="viwemimphalo@picket.com" control={control}/>
      
      <Text className='font-semibold text-base mb-2'>Password</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7' name="password" placeholder="Please enter password" control={control} secureTextEntry/>
      
      <Text className='font-semibold text-base mb-2'>Re-enter Password</Text>
      <CustomInput textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-14' name="rpassword" placeholder="Please re-enter password" control={control} secureTextEntry/>
      
      <Button
        title="Sign Up"
        color="#37520B"
        accessibilityLabel="Sign Up"
      />

      </View>
    </ScrollView>
  );
}

export default SignUp