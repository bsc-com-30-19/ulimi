import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import {useForm} from 'react-hook-form';
import CustomInput from '../forms/CustomInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router';

type Inputs ={
    email:string,
    password:string,
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
      />

      <Text className="font-semibold text-base mb-2">Password</Text>
      <CustomInput
        textInputStyle="bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7"
        name="password"
        placeholder="Enter your accounts password"
        control={control}
        secureTextEntry
      />

      <Button 
        
        title="Log In"
        color="#37520B"
        accessibilityLabel="Log In"
      />

      <Link href={'/signup'} className='mt-6 mb'>
        <Text>Don't have an account? Click to Sign Up</Text>
      </Link>
    </View>
  );
}

export default LogIn