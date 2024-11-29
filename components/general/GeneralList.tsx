import { View, Text } from 'react-native'
import React from 'react'

const GeneralList = ({listItems,ListComponent}:{listItems:any[], ListComponent:any}) => {
  return (
    <View>
      {listItems.map((listItems:any)=>{
        return(
            <ListComponent />
        )
      })}
    </View>
  )
}

export default GeneralList