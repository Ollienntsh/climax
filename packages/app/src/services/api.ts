import {
  AnnualAvg,
  BaseData,
  Country,
  MeasurementType,
  MonthlyAvg,
  Period,
  ReportType,
} from '../types';

const baseUrl = process.env.REACT_APP_ENDPOINT || '';
const cache: Record<string, AnnualAvg[] | MonthlyAvg[]> = {};

/** Fetches report and memoizes the response by default */
const getReportBase = async (
  reportType: ReportType,
  measurementType: MeasurementType,
  { fromYear, toYear }: Period,
  code: string,
  memoize = true,
): Promise<AnnualAvg[] | MonthlyAvg[]> => {
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

const isAnnualAvgArray = (
  _value: unknown,
  reportType: ReportType,
): _value is AnnualAvg[] => reportType === 'annualavg';

const isMonthlyAvgArray = (
  _value: unknown,
  reportType: ReportType,
): _value is MonthlyAvg[] => reportType === 'mavg';

export const getReport = async (
  reportType: ReportType,
  measurementType: MeasurementType,
  period: Period,
  country: Country,
  memoize = true,
): Promise<AnnualAvg[] | MonthlyAvg[]> => {
  const { code } = country;

  if (Array.isArray(code)) {
    const data = await Promise.all(
      code.map(isoCode =>
        getReportBase(reportType, measurementType, period, isoCode, memoize),
      ),
    );
    const flattenedData = data.flat();

    if (isAnnualAvgArray(flattenedData, reportType)) {
      const aggregatedData = flattenedData.reduce(
        (
          acc: Record<string, BaseData & { annualDatas: number[] }>,
          { gcm, variable, fromYear, toYear, annualData },
        ) => {
          const existingItem = acc[gcm];

          return {
            ...acc,
            [gcm]: {
              gcm,
              variable,
              fromYear,
              toYear,
              annualDatas: [
                ...(existingItem?.annualDatas || []),
                ...annualData,
              ],
            },
          };
        },
        {},
      );
      const annualAvgs: AnnualAvg[] = Object.values(aggregatedData).map(
        ({ gcm, variable, fromYear, toYear, annualDatas }) => ({
          gcm,
          variable,
          fromYear,
          toYear,
          annualData: [
            annualDatas.reduce((acc, annualData) => acc + annualData, 0) /
              annualDatas.length,
          ],
        }),
      );

      return annualAvgs;
    }

    if (isMonthlyAvgArray(flattenedData, reportType)) {
      const aggregatedData = flattenedData.reduce(
        (
          acc: Record<string, BaseData & { monthValsMatrix: number[][] }>,
          { gcm, variable, fromYear, toYear, monthVals },
        ) => {
          const existingItem = acc[gcm];

          return {
            ...acc,
            [gcm]: {
              gcm,
              variable,
              fromYear,
              toYear,
              monthValsMatrix: [
                ...(existingItem?.monthValsMatrix || []),
                monthVals,
              ],
            },
          };
        },
        {},
      );
      const monthlyAvgs: MonthlyAvg[] = Object.values(aggregatedData).map(
        ({ gcm, variable, fromYear, toYear, monthValsMatrix }) => ({
          gcm,
          variable,
          fromYear,
          toYear,
          monthVals: [...Array(12)].map(
            (_, i) =>
              monthValsMatrix
                .map(monthVals => monthVals[i])
                .reduce((acc, value) => acc + value, 0) /
              monthValsMatrix.length,
          ),
        }),
      );

      return monthlyAvgs;
    }
  }

  return getReportBase(
    reportType,
    measurementType,
    period,
    code as string,
    memoize,
  );
};
