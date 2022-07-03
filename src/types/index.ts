import { RootState } from './RootState';
export enum Timeframe {
  HOURS_24 = 'HOURS_24',
  DAYS_7 = 'DAYS_7',
  MONTHS_1 = 'MONTHS_1',
}

export function getLabel(timeframe: Timeframe) {
  switch (timeframe) {
    case Timeframe.HOURS_24:
      return '24 Hours';
    case Timeframe.DAYS_7:
      return '7 Days';
    case Timeframe.MONTHS_1:
      return '1 Month';
    default:
      return 'UNKNOWN';
  }
}

export type { RootState };
