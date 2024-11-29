import { View, Text } from 'react-native'
import React from 'react'
import {Controller} from 'react-hook-form'
import {Picker} from '@react-native-picker/picker'
interface CustomInputProps { 
    control: any, 
    name: string, 
    textInputStyle?: string,
    }

const CustomInput : React.FC<CustomInputProps> = ({control, name, textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7 my-auto'}) => {
  return (
   
    <View className='bg-[#F1F7FF] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7'>
      <Controller
          control = {control}
          name = {name}
          rules={{required:'Please enter Vaccination Status'}}
          render = {({field:{onChange,value}, fieldState:{error}}) =>(
            <>
            <Picker
                className={textInputStyle}
                selectedValue={value}
                onValueChange={onChange}
                >
            <Picker.Item label='Vaccinated' value='Vaccinated'/>
            <Picker.Item label='Not Vaccinated' value='Not Vaccinated'/>
            <Picker.Item label='Due For Vaccination' value='Due For Vaccination'/>
            </Picker>
            {error && (
              <Text className='text-red-600'>{error.message || 'Error'} </Text>
            )}
           </>
          )}
        />

    </View>
  )
}

export default CustomInput