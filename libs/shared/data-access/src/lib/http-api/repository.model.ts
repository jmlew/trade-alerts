/**
 * Base interface to define the structure of common CRUD implementations. Use as a means
 * to implement the Repository Pattern and insulate againt future datastore or DTO
 * changes.
 */

import { Observable } from 'rxjs';

export interface Repository<T, P extends Partial<T>, K extends string | number> {
  readAll(): T[];
  read(id: K): T;
  create(params: P): T;
  update(id: K, params: P): T;
  delete(id: K): { id: K };
}

export interface RepositoryObservable<
  T,
  P extends Partial<T>,
  K extends string | number
> {
  readAll(): Observable<T[]>;
  read(id: K): Observable<T>;
  create(params: P): Observable<T>;
  update(id: K, params: P): Observable<T>;
  delete(id: K): Observable<K>;
}
