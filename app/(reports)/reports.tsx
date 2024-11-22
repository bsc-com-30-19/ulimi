import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ReportButtonNext from '@/components/reports/reportButtonNext';
const reportList =[
    {reportType:'Finances', linkName:'/finances'},
    {reportType:'Livestock', linkName:'/livestock'},
    {reportType:'Crops', linkName:'/crops'},
]



const Reports = () => {
  return (
    <View>
      <Text className='text-xl font-medium'>What type of report would you like to create?</Text>
      <FlatList className=' w-full mt-16'
            data={reportList}
            renderItem={({item})=>(
              <ReportButtonNext text={item.reportType} link={item.linkName}/>
                
            )}
            numColumns={1}
        />
    </View>
  )
}

export default Reports