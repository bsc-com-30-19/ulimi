import { View } from 'react-native'
import React from 'react'
import { harvest } from '@/types'
import InHarvestList from './InHarvestList'

const HarvestList = ({harvests}:{harvests:harvest[]}) => {
  
    return (
      <View>
        {harvests.map((harvest:harvest)=>{
          return(
              <InHarvestList key={harvest.id} amount={harvest.amountharvested} name={harvest.name} id={harvest.id}/>
          )
        })}
      </View>
    )
}

export default HarvestList