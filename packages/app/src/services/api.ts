import { ReportType, MeasurementType, Period, Country } from '../types';

const baseUrl = process.env.REACT_APP_ENDPOINT || '';

// TODO: use memoization
// TODO: implement response for Yugoslavia

export const getReport = (
  reportType: ReportType,
  measurementType: MeasurementType,
  { fromYear, toYear }: Period,
  { code }: Country,
) => {
  return fetch(
    `${baseUrl}${reportType}/${measurementType}/${fromYear}/${toYear}/${code}.json`,
  );
};
