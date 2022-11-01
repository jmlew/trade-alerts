import { Entity, UpdateEntity } from './entity.model';

export function createEntities<T, K extends string | number>(
  items: T[],
  selectIdKey: keyof T
): Entity<T> {
  return items.reduce(
    (entities: Entity<T>, item: T) => addOneToEntities<T, K>(item, entities, selectIdKey),
    {}
  );
}

export function createEntity<T, K extends string | number>(
  item: T,
  selectIdKey: keyof T
): Entity<T> {
  const id: unknown = item[selectIdKey];
  return { [id as K]: item };
}

export function addOneToEntities<T, K extends string | number>(
  item: T,
  entities: Entity<T>,
  selectIdKey: keyof T
): Entity<T> {
  const entitiy: Entity<T> = createEntity<T, K>(item, selectIdKey);
  return { ...entities, ...entitiy };
}

export function addManyToEntities<T, K extends string | number>(
  items: T[],
  entities: Entity<T>,
  selectIdKey: keyof T
): Entity<T> {
  const added: Entity<T> = createEntities<T, K>(items, selectIdKey);
  return { ...entities, ...added };
}

export function removeOneFromEntities<T, K extends string | number>(
  id: K,
  entities: Entity<T>
): Entity<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [id as K]: removed, ...remaining } = entities;
  return remaining;
}

export function removeManyFromEntities<T, K extends string | number>(
  ids: K[],
  entities: Entity<T>
): Entity<T> {
  return ids.reduce(
    (entities: Entity<T>, id: K) => removeOneFromEntities<T, K>(id, entities),
    entities
  );
}

export function updateOneInEntities<T, K extends string | number>(
  update: UpdateEntity<T, K>,
  entities: Entity<T>
): Entity<T> {
  const { id, changes } = update;
  if (entities[id]) {
    const entity: T = entities[id] as T;
    const updated: T = { ...entity, ...changes };
    return { ...entities, [id]: updated };
  }
  return entities;
}

export function upsertOneInEntities<T, K extends string | number>(
  item: T,
  entities: Entity<T>,
  selectIdKey: keyof T
): Entity<T> {
  const id: unknown = item[selectIdKey];
  return id
    ? { ...entities, [id as K]: item }
    : addOneToEntities<T, K>(item, entities, selectIdKey);
}

export function selectIdsFromEntities<T, K extends string | number>(
  entities: Entity<T>
): K[] {
  return Object.keys(entities) as K[];
}

export function selectAllFromEntities<T, K extends string | number>(
  entities: Entity<T>
): T[] {
  return selectIdsFromEntities<T, K>(entities).map((id: K) => entities[id] as T);
}

export function selectTotalFromEntities<T, K extends string | number>(
  entities: Entity<T>
): number {
  return selectIdsFromEntities<T, K>(entities).length;
}
