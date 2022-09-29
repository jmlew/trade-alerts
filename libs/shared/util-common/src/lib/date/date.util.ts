import { DateTime, Duration } from 'luxon';

export function getUtcDateTime(): DateTime {
  return DateTime.now().toUTC();
}

export function getCurrentDateToIso(): string {
  return DateTime.now().toISO();
}

export function getCurrentDateTime(): DateTime {
  return DateTime.now();
}

export function getDateTimeFromIso(value: string): DateTime {
  return DateTime.fromISO(value);
}

export function getDateTimeFromFormat(value: string, format = 'MM/dd/yyyy'): DateTime {
  return DateTime.fromFormat(value, format);
}

export function getDurationFromTo(from: DateTime, to: DateTime): Duration {
  return to.diff(from);
}

export function getDurationAsDays(duration: Duration): number {
  return duration.as('days');
}

export function getDurationFromMills(dur: number): Duration {
  return Duration.fromMillis(dur);
}

export function getDurationFromMillsInDays(dur: number): number {
  return getDurationFromMills(dur).as('days');
}

export function getDateTimeFromMills(value: number): DateTime {
  return DateTime.fromMillis(value);
}

export function getDateTimeToMills(value: DateTime): number {
  return value.toMillis();
}
