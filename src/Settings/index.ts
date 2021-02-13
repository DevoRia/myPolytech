import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from 'expo-notifications';
import {saveStudentData} from "../Students";
import {cancelAllScheduledNotificationsAsync} from "expo-notifications";

export const clearGroupData = async () => {
  await AsyncStorage.removeItem('group')
  await AsyncStorage.removeItem('schedule')
  await AsyncStorage.removeItem('subgroups')
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export const enablePushes = async () => {
  await AsyncStorage.setItem('pushTokenEnabled', 'yes')
}

export const isEnabledPushes = async () => {
  const item =  await AsyncStorage.getItem('pushTokenEnabled');
  return (item === 'yes')
}

export const disablePushes = async () => {
  await cancelAllScheduledNotificationsAsync();
  await AsyncStorage.removeItem('pushToken')
  await AsyncStorage.setItem('pushTokenEnabled', 'no')
}
