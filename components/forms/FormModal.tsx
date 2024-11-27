import { View, Text, Modal, ModalProps, KeyboardAvoidingView } from 'react-native'
import React from 'react'

type PROPS = ModalProps &{
    isOpen:boolean;
    title?:string;
}

const FormModal = ({title, isOpen, children, ...rest}:PROPS) => {
  return (
    <Modal
    visible={isOpen}
    transparent
    animationType='fade'
    statusBarTranslucent
    {...rest}
    className=''
    >
    <KeyboardAvoidingView className=' justify-center flex-1 mx-auto w-96 '>
    <View className='bg-[#D9D9D9] w-full p-3 rounded-2xl'>
    <Text className='text-center font-semibold text-2xl'>{title}</Text>
    {children}
    </View>
    </KeyboardAvoidingView>
    </Modal>
  )
}

export default FormModal