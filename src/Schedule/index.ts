
import { firebase } from '../Firebase'

export const getScheduleByGroup = async (group: string) => {
  const ref = await firebase.database()
    .ref(`Schedules/${group}`)

  const snapshot: object = await new Promise(resolve => ref
    .on('value', (snapshot) => resolve(snapshot.val())));

  return Object.values(snapshot)
};
