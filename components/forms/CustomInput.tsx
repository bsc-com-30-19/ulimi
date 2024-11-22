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

const CustomInput : React.FC<CustomInputProps> = ({control, name, placeholder, rules, secureTextEntry, textInputStyle}) => {
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