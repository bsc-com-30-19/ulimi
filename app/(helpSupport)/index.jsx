import { View, Text } from 'react-native';

export default function HelpScreen() {
  return (
    <View className="flex max-w-[390] mx-5 mt-[40px]">
      <View>
        <Text className="text-base font-medium ">
          Frequently Asked Questions
        </Text>
      </View>
      <View className="mt-9">
        <View>
          <Text className="text-base">
            How do I add a new crop or livestock entry?
          </Text>
        </View>
        <View>
          <Text className="text-[#3C4E67] mt-[12px]">
            To add a new crop or livestock entry, go to the "Dashboard" and
            select either "Crops" or "Livestock." Then, click on the "Add New"
            button and fill in the required details, such as the crop type,
            planting date, or livestock breed. Once completed, save the entry to
            start tracking it within the app.
          </Text>
        </View>

        <View className="">
          <View>
            <Text className="text-base mt-[15px] ">
              How can I view my income and expenses?
            </Text>
          </View>
          <View className="">
            <Text className="text-[#3C4E67] mt-[12px]">
              You can view your income and expenses by navigating to the
              "Finance" section. Here, you will see a list view that shows each
              entry by category, date, and amount.
            </Text>
          </View>
        </View>

        <View></View>
        <View></View>
      </View>
    </View>
  );
}
