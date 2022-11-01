import * as fromUtils from './entities.util';
import { Entity, EntityAdapter, EntitySelectors, UpdateEntity } from './entity.model';

export class EntitiesService<T, K extends string | number>
  implements EntityAdapter<T, K>, EntitySelectors<T, K>
{
  constructor(private selectIdKey: keyof T) {}

  setAll(items: T[]): Entity<T> {
    return fromUtils.createEntities<T, K>(items, this.selectIdKey);
  }

  setOne(item: T, entities: Entity<T>): Entity<T> {
    return fromUtils.setOneToEntities<T, K>(item, entities, this.selectIdKey);
  }

  setMany(items: T[], entities: Entity<T>): Entity<T> {
    return fromUtils.setManyToEntities<T, K>(items, entities, this.selectIdKey);
  }

  removeOne(id: K, entities: Entity<T>): Entity<T> {
    return fromUtils.removeOneFromEntities<T, K>(id, entities);
  }

  removeMany(ids: K[], entities: Entity<T>): Entity<T> {
    return fromUtils.removeManyFromEntities<T, K>(ids, entities);
  }

  updateOne(update: UpdateEntity<T, K>, entities: Entity<T>): Entity<T> {
    return fromUtils.updateOneInEntities<T, K>(update, entities);
  }

  selectIds(entities: Entity<T>): K[] {
    return fromUtils.selectIdsFromEntities<T, K>(entities);
  }

  selectAll(entities: Entity<T>): T[] {
    return fromUtils.selectAllFromEntities<T, K>(entities);
  }

  selectOne(id: K, entities: Entity<T>): T | null {
    return entities[id] ?? null;
  }

  selectTotal(entities: Entity<T>): number {
    return fromUtils.selectTotalFromEntities<T, K>(entities);
  }
}
