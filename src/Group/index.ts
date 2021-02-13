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

export const getGroupByName = async (name) => {
  try {
    const ref = await firebase.database()
      .ref('Groups')

    const snapshot: object = await new Promise(resolve => ref
      .on('value', (snapshot) => {
        const groupFiltered = snapshot.val().filter((group: any) => group.name === name);
        if (groupFiltered.length) {
          const result = {
            course: groupFiltered[0].course,
              name: groupFiltered[0].name,
            faculty: groupFiltered[0].faculty,
            courseTitle: groupFiltered[0].courseTitle,
          }

          resolve(result)
        } else {
          resolve(null);
        }
      }));

    return snapshot;
  } catch (e) {
    alert('Проблеми з інтернетом')
  }
};
