import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Checkbox from 'expo-checkbox'
import Checklist from '@/components/reports/checklist'
import CustomInput from '@/components/forms/CustomInput'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type DateInputs = {
    Date1:string,
    Date2:string,
}

const livestock = () => {
    const {bottom} = useSafeAreaInsets();
    const [isChecked, setChecked] = useState(false);
    const {control, register, handleSubmit, watch, formState:{errors}} = useForm<DateInputs>(
        {defaultValues:{
          Date1:'',
          Date2:'',
        }}
      )
  return (
    <View>
        <Checklist text='Feed Consumption' isChecked={isChecked} setChecked={setChecked}/>
        <Checklist text='Produce Output' isChecked={isChecked} setChecked={setChecked}/>
        
        <View>
        <Text>Start Date:</Text>
        <CustomInput control={control} placeholder='DD/MM/YYYY' name='date1'/>
        <Text>End Date:</Text>
        <CustomInput control={control} placeholder='DD/MM/YYYY' name='date2'/>
        </View>

        <View style={{paddingBottom: bottom }}>
        <Button
            title='Generate Report'
            color='#37520B'
        />
        </View>
    </View>
  )
}

export default livestock