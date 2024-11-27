import { View, Text } from 'react-native'
import React from 'react'
import { crops } from '@/types'
import CropList from './CropList'

const CropsList = ({crops}:{crops:crops[]}) => {
  
  return (
    <View>
      {crops.map((crop:crops)=>{
        return(
          <>
            <CropList cropName={crop.name} key={crop.id} id={crop.id}/>
          </>
        )
      })}
    </View>
  )
}

export default CropsList