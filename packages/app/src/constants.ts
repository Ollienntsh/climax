import { Country, Period } from './types';

export const YugoslaviaCodes: string[] = [
  'HRV',
  'SVN',
  'SRB',
  'BIH',
  'MNE',
  'MKD',
];

export const Countries: Country[] = [
  {
    id: 1,
    name: 'Croatia',
    code: 'HRV',
  },
  {
    id: 2,
    name: 'Slovenia',
    code: 'SVN',
  },
  {
    id: 3,
    name: 'Serbia',
    code: 'SRB',
  },
  {
    id: 4,
    name: 'Bosnia & Herzegovina',
    code: 'BIH',
  },
  {
    id: 5,
    name: 'Montenegro',
    code: 'MNE',
  },
  {
    id: 6,
    name: 'Macedonia',
    code: 'MKD',
  },
  {
    id: 7,
    name: 'Yugoslavia',
    code: YugoslaviaCodes,
  },
];

export const Periods: Period[] = [
  {
    id: 1,
    fromYear: 1920,
    toYear: 1939,
  },
  {
    id: 2,
    fromYear: 1940,
    toYear: 1959,
  },
  {
    id: 3,
    fromYear: 1960,
    toYear: 1979,
  },
  {
    id: 4,
    fromYear: 1980,
    toYear: 1999,
  },
];

export const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
