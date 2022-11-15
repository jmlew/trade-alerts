/**
 * Base interface to define the structure of common CRUD implementations. Use as a means
 * to implement the Repository Pattern and insulate againt future datastore or DTO
 * changes.
 */

import { Observable } from 'rxjs';

export interface Repository<T, K extends string | number> {
  readAll(): T[];
  read(id: K): T;
  create(params: Partial<T>): T;
  update(id: K, params: Partial<T>): T;
  delete(id: K): { id: K };
}

export interface RepositoryObservable<T, K extends string | number> {
  readAll(): Observable<T[]>;
  read(id: K): Observable<T>;
  create(params: Partial<T>): Observable<T>;
  update(id: K, params: Partial<T>): Observable<T>;
  delete(id: K): Observable<K>;
}
