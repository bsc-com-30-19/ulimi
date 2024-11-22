import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const ReportButtonNext = ({link,text}:{link:any,text:any}) => {
  return (
    <Link className="w-full" href={link} asChild>
        <Pressable className='h-14 w-full flex justify-center'>
            <Text className='px-5 text-base font-medium'>{text}</Text>
        </Pressable>
    </Link>
  )
}

export default ReportButtonNext