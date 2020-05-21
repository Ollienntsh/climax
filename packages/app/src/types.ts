export type ReportType = 'annualavg' | 'mavg';

export type MeasurementType = 'tas' | 'pr';

export interface Country {
  id: number;
  name: string;
  code: string | string[];
}

export interface Period {
  id: number;
  fromYear: number;
  toYear: number;
}

export interface BaseData {
  gcm: string;
  variable: MeasurementType;
  fromYear: number;
  toYear: number;
}

export interface AnnualAvg extends BaseData {
  annualData: [number];
}

export interface MonthlyAvg extends BaseData {
  monthVals: number[];
}
