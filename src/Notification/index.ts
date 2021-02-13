import * as Notifications from "expo-notifications";
import moment from 'moment';
import {isEnabledPushes} from "../Settings";

const getValidTime = (time: string) => {
  switch (time) {
    case '8:30-9:50': return {hour:8,minute:30,second:0,millisecond:0}
    case '10:00-11:20': return {hour:10,minute:0,second:0,millisecond:0}
    case '11:40-13:00': return {hour:11,minute:40,second:0,millisecond:0}
    case '13:30-14:50': return {hour:13,minute:30,second:0,millisecond:0}
    case '15:00-16:20': return {hour:15,minute:0,second:0,millisecond:0}
    case '16:30-17:50': return {hour:16,minute:30,second:0,millisecond:0}
  }
  return {hour:8,minute:30,second:0,millisecond:0}
}

export const setCurrentDayNotifications = async (item: any) => {
  const permission = await isEnabledPushes();
  if (permission) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: item.name,
        body: `${item.type}. ауд. ${item.room} \n ${item.teacher}`,
        data: { ...item },
      },
      trigger: moment().set(getValidTime(item.time)).toDate(),
    });
  }

}
