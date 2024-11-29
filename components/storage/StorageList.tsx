import { View } from 'react-native'
import React from 'react'
import { storage } from '@/types'
import InStorageList from './InStorageList'

const StorageList = ({storage, action}:{storage:storage[], action:any}) => {
  
    return (
      <View>
        {storage.map((storage:storage)=>{
          return(
              <InStorageList key={storage.id} name={storage.name} amountstorage={storage.amountinstorage} id={storage.id} />
          )
        })}
      </View>
    )
}

export default StorageList