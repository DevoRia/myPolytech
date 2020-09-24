
import { firebase } from '../Firebase'

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
