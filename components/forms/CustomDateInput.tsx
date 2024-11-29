import { View, Text } from 'react-native'
import React from 'react'
import {Controller} from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker';

interface CustomInputProps { 
    control: any, 
    name: string, 
    textInputStyle?: string,
    }

const CustomDateInput : React.FC<CustomInputProps> = ({control, name, textInputStyle='bg-[#F1F7FF] rounded-md border-2 border-[#75787C] pl-2.5 h-[44px] text-[#36455A] text-sm mb-7 my-auto'}) => {
  return (
    <View  >
      <Controller
          control = {control}
          name = {name}
          rules={{required:'Please enter date'}}
          render = {({field:{onChange,value}, fieldState:{error}}) =>(
            <>
            <DateTimePicker
                value={new Date(value)}

                onChange={onChange}
                mode='date'
                >
            
            </DateTimePicker>
            {error && (
              <Text className='text-red-600'>{error.message || 'Error'} </Text>
            )}
           </>
          )}
        />

    </View>
  )
}

export default CustomDateInput