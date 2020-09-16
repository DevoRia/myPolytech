import { api } from '../../config.json';

export const getScheduleByGroup = async (group: string) => {
  return fetch(`${api}/schedule/?group=${group}`).then((response) => response.json())
};
