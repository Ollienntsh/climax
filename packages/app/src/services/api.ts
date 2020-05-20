import { ReportType, MeasurementType, Period, Country } from '../types';

const baseUrl = process.env.REACT_APP_ENDPOINT || '';

// TODO: implement response for Yugoslavia

const cache: Record<string, unknown> = {};

export const getReport = async (
  reportType: ReportType,
  measurementType: MeasurementType,
  { fromYear, toYear }: Period,
  { code }: Country,
  memoize = true,
) => {
  const url = `${baseUrl}${reportType}/${measurementType}/${fromYear}/${toYear}/${code}.json`;
  const cachedValue = cache[url];

  if (memoize && cachedValue) {
    return Promise.resolve(cache[url]);
  }

  const response = await fetch(url);
  const data = await response.json();

  if (memoize) {
    cache[url] = data;
  }

  return data;
};
