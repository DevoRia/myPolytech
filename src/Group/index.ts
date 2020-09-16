import { api } from '../../config.json';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};


export const getGroups = async () => {
  return fetch(`${api}/group`).then((response) => response.json())
};
