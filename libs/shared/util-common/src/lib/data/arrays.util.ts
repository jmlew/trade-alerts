import { isNumber } from './validate.util';

interface EntityItem {
  id: string | number;
}

export function addToArray<T extends EntityItem>(item: T, items: T[]): T[] {
  return getArrayIds(items).includes(item.id) ? items : [...items, item];
}

export function removeFromArray<T extends EntityItem>(item: T, items: T[]): T[] {
  return getArrayIds(items).includes(item.id)
    ? items.filter((element: T) => element !== item)
    : items;
}

export function updateInArray<T extends EntityItem>(item: T, items: T[]): T[] {
  return items.map((element: T) => (element.id === item.id ? item : element));
}

export function removeIdFromArray<T extends EntityItem>(
  id: string | number,
  items: T[]
): T[] {
  return items.filter((element: T) => !isIdMatch(id, element));
}

export function removeIdsFromArray<T extends EntityItem>(
  ids: Array<string | number>,
  items: T[]
): T[] {
  return items.filter((element: T) => {
    const normalisedIds: Array<string | number> = isNumber(element.id)
      ? ids.map((id) => Number(id))
      : ids;
    return !normalisedIds.includes(element.id);
  });
}

export function getById<T extends EntityItem>(
  items: T[],
  id: string | number
): T | undefined {
  return items.find((item: T) => isIdMatch(id, item));
}

export function isIdMatch<T extends EntityItem>(id: string | number, item: T): boolean {
  return isNumber(item.id) ? item.id === Number(id) : item.id === id;
}

export function getArrayIds<T extends EntityItem>(items: T[]): Array<string | number> {
  return items.map((item: T) => item.id);
}

export function getNextArrayId<T extends EntityItem>(items: T[]): number {
  const ids: number[] = getArrayIds(items) as number[];
  return Math.max(...ids) + 1;
}
