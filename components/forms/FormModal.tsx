import { View, Text, Modal, ModalProps, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

type PROPS = ModalProps &{
    isOpen:boolean;
    title?:string;
    onPressB1:any;
    onPressB2:any;
    B1text?:string;
    B2text?:string;
}

const FormModal = ({title, isOpen, children, onPressB1, onPressB2, B1text='Cancel', B2text='Add', ...rest}:PROPS) => {
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
    <View className='flex flex-row'>
          <View className='basis-1/2 '>
          <CustomButton 
            text={B1text}
            className='mx-auto bg-[#B5B9AE] h-11 px-8 rounded-lg' 
            textStyle='text-[#0D1E35] text-base text-center my-auto font-semibold'
            onPress={onPressB1}
          />
          </View>
          <View className='basis-1/2 '>
          <CustomButton 
            text={B2text} 
            className='mx-auto bg-[#37520B] h-11 px-8 rounded-lg font-semibold'
          onPress={onPressB2}
          />
          </View>
        </View>
    </View>
    </KeyboardAvoidingView>
    </Modal>
  )
}

export default FormModal