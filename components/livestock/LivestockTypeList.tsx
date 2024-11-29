import { View } from 'react-native'
import React from 'react'
import { livestock } from '@/types'
import InLivestockTypeList from './InLivestockTypeList'

const livestocktypelist = ({livestocks}:{livestocks:livestock[]}) => {
  
    return (
      <View>
        {livestocks.map((livestock:livestock)=>{
          return(
              <InLivestockTypeList key={livestock.id} dob={livestock.dob} id={livestock.id}/>
          )
        })}
      </View>
    )
}

export default livestocktypelist