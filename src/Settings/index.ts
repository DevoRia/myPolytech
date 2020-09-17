import AsyncStorage from "@react-native-community/async-storage";


export const clearGroupData = async () => {
  await AsyncStorage.removeItem('group')
  await AsyncStorage.removeItem('schedule')
  await AsyncStorage.removeItem('subgroups')
}
