/**
 * Extends data items to include numeric ids based on their index.
 */

import { MuiGridData } from './dashboard-grid-data.model';

export function normaliseMuiGridData<T>(items: T[]): MuiGridData<T>[] {
  const startFrom: number = items.length;
  return items.map(
    (item: T, index: number) =>
      ('id' in item ? item : { ...item, id: startFrom + index }) as MuiGridData<T>
  );
}
