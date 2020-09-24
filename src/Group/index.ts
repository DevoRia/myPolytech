import { firebase } from '../Firebase'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};


export const getGroups = async () => {
  try {
    const ref = await firebase.database()
      .ref('Groups')

    const snapshot: object = await new Promise(resolve => ref
      .on('value', (snapshot) => resolve(snapshot.val())));

    return Object.values(snapshot)
  } catch (e) {
    alert('Проблеми з інтернетом')
  }
};
