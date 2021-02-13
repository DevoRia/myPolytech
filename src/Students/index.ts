
import { firebase } from '../Firebase'
import AsyncStorage from "@react-native-community/async-storage";

export const saveStudentData = async (student: any) => {
  try {
    const ref = await firebase.database()
      .ref('Students')
    ref.push(student)
  } catch (e) {
  }
};

export const logIn = async () => {
  await AsyncStorage.setItem('login', 'yes');
}

export const logOut = async () => {
  const isLogin = await isLoggedIn();
  if (isLogin) {
    await AsyncStorage.setItem('login', 'no');
  }
}

export const isLoggedIn = async () => {
  const item =  await AsyncStorage.getItem('login');
  return (item === 'yes')
}
