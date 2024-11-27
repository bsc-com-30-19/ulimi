import { View, Text } from 'react-native'
import React from 'react'
import { livestock } from '@/types'
import LivesStockList from './LivesStockList'

const LiveStocksList = ({livestocks}:{livestocks:livestock[]}) => {
  
  return (
    <View>
      {livestocks.map((livestock:livestock)=>{
        return(
            <LivesStockList livestocktype={livestock.type} key={livestock.id} id={livestock.id}/>
        )
      })}
    </View>
  )
}

export default LiveStocksList