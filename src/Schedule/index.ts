
import { firebase } from '../Firebase'
import AsyncStorage from "@react-native-community/async-storage";

export const getScheduleByGroup = async (group: string) => {
  try {
    const ref = await firebase.database()
      .ref(`Schedules/${group}`)

    const snapshot: object = await new Promise(resolve => ref
      .on('value', (snapshot) => resolve(snapshot.val())));

    return Object.values(snapshot)
  } catch (e) {
    alert('Проблеми з інтернетом')
  }
};

export const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}
