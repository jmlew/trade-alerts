/**
 * Extends data items to include numeric ids based on their index.
 */

type DataGridField<T> = T & { id: number };

export function normaliseGridData<T>(items: T[]): DataGridField<T>[] {
  const startFrom: number = items.length;
  return items.map(
    (item: T, index: number) =>
      ('id' in item ? item : { ...item, id: startFrom + index }) as DataGridField<T>
  );
}
