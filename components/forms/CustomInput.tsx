import { View, Text, TextInput } from 'react-native'
import React from 'react'
import {Control, Controller} from 'react-hook-form'

interface CustomInputProps { 
    control: any, 
    name: string, 
    placeholder: string, 
    rules?: Object,
    secureTextEntry?: any,
    textInputStyle?: string,
    }

const CustomInput : React.FC<CustomInputProps> = ({control, name, placeholder, rules, secureTextEntry, textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7'}) => {
  return (
    <View>
      <Controller
          control = {control}
          name = {name}
          rules = {rules}
          render = {({field:{onChange,value}}) =>(
            <TextInput 
            className={textInputStyle}
            onChangeText={onChange} 
            value={value} 
            placeholder={placeholder} 
            secureTextEntry = {secureTextEntry}
            />
          )}
        />
    </View>
  )
}

export default CustomInput