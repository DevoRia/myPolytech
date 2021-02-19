import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from 'expo-notifications';
import {cancelAllScheduledNotificationsAsync} from "expo-notifications";

export const clearGroupData = async () => {
  await AsyncStorage.removeItem('group')
  await AsyncStorage.removeItem('schedule')
  await AsyncStorage.removeItem('subgroups')
  await Notifications.cancelAllScheduledNotificationsAsync()
}
