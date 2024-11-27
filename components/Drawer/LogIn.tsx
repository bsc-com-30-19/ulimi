import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import {useForm} from 'react-hook-form';
import CustomInput from '../forms/CustomInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router';
import CustomButton from '../forms/CustomButton';

type Inputs ={
    email:string,
    password:string,
}

const onLoginPressed = (data:any) =>{
  console.log(data);
}
const LogIn = () => {
    const {bottom} = useSafeAreaInsets();
    const {control, register, handleSubmit, watch, formState:{errors}} = useForm<Inputs>(
        {defaultValues:{
          email:'',
          password:'',
        }}
      )
  return (
    <View className='mx-5' style={{paddingBottom: bottom + 40}}>
      
      <Text className="font-semibold text-base mb-2">Email</Text>
      <CustomInput
        textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
        name="email"
        placeholder="Isaac@com311.com"
        control={control}
        rules={{
          required:'Please enter your email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          },
        }}
      />

      <Text className="font-semibold text-base mb-2">Password</Text>
      <CustomInput
        textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
        name="password"
        placeholder="Enter your accounts password"
        control={control}
        secureTextEntry
        rules={{
          required:'Please enter your password',
        }}
      />

      <CustomButton onPress={handleSubmit(onLoginPressed)} text="LogIn"/>

      <Link href={'/signup'} className='mt-6 mb'>
        <Text>Don't have an account? Click to Sign Up</Text>
      </Link>
    </View>
  );
}

export default LogIn