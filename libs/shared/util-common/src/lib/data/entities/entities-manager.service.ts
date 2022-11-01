import { EntitiesService } from './entities.service';
import { Entity } from './entity.model';

export class EntitiesManagerService<T, K extends string | number> {
  entityService: EntitiesService<T, K>;
  entities: Entity<T>;

  constructor(primaryKey: keyof T) {
    this.entityService = new EntitiesService<T, K>(primaryKey);
  }

  setEntities(items: T[]) {
    this.entities = this.entityService.setAll(items);
  }

  setEntity(item: T) {
    this.entities = this.entityService.setOne(item, this.entities);
  }

  updateEntity(id: K, changes: Partial<T>) {
    this.entities = this.entityService.updateOne({ id, changes }, this.entities);
  }

  removeEntity(id: K) {
    this.entities = this.entityService.removeOne(id, this.entities);
  }

  removeEntities(ids: K[]) {
    this.entities = this.entityService.removeMany(ids, this.entities);
  }

  selectOne(id: K): T | null {
    return this.entityService.selectOne(id, this.entities);
  }

  selectAll(): T[] {
    return this.entityService.selectAll(this.entities);
  }

  selectIds(): K[] {
    return this.entityService.selectIds(this.entities);
  }

  doesEntityExist(id: K): boolean {
    return this.entities[id] !== undefined;
  }
}
