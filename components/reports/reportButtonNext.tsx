import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const ReportButtonNext = ({link,text}:{link:any,text:any}) => {
  return (
    <Link href={link} asChild>
        <Pressable>
            <Text>{text}</Text>
        </Pressable>
    </Link>
  )
}

export default ReportButtonNext