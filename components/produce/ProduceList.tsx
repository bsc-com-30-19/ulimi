import { View } from 'react-native'
import React from 'react'
import { produce } from '@/types'
import InProduceList from './InProduceList'

const ProduceTypeList = ({produces}:{produces:produce[]}) => {
    return (
      <View>
        {produces.map((produce:produce)=>{
          return(
              <InProduceList key={produce.id} id={produce.id} date={produce.datecollected} amount={produce.amount} unit={produce.unit}/>
          )
        })}
        
      </View>
    )
}

export default ProduceTypeList