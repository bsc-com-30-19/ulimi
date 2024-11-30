import { View } from 'react-native'
import React from 'react'
import { produce } from '@/types'
import InProduceTypeList from './InProduceTypeList'

const ProduceTypeList = ({produces}:{produces:produce[]}) => {
  
    return (
      <View>
        {produces.map((produce:produce)=>{
          return(
              <InProduceTypeList key={produce.type} type={produce.type}/>
          )
        })}
      </View>
    )
}

export default ProduceTypeList