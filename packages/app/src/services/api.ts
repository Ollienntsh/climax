import { ReportType, MeasurementType, Period, Country } from '../types';

const baseUrl = process.env.REACT_APP_ENDPOINT || '';

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
