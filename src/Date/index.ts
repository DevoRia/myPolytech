
export function getWeekNumber(date: Date) {
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

export enum Days {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export const getDayTitle =(dayNumber: number) => {
  switch (dayNumber+1) {
    case Days.MONDAY : return 'Понеділок'
    case Days.TUESDAY : return 'Вівторок'
    case Days.WEDNESDAY : return 'Середа'
    case Days.THURSDAY : return 'Четвер'
    case Days.FRIDAY : return 'П\'ятниця'
    case Days.SATURDAY : return 'Субота'
    case Days.SUNDAY : return 'Неділя'
  }
}

