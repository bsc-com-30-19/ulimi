import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import Checklist from '@/components/reports/checklist';

const Finances = () => {
    const [isChecked, setChecked] = useState(false);
  return (
    <View>
      <Checklist text='Profit and Loss Statement' isChecked={isChecked} setChecked={setChecked}/>
      <Checklist text='Cash Flow Summary' isChecked={isChecked} setChecked={setChecked}/>
    </View>
  )
}

export default Finances