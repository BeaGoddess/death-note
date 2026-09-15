import { InjectionToken } from '@angular/core';

export interface Repository<T> {
  getAll(path: string): Promise<T[]>;
  get(path: string, id: string): Promise<T>;
  findBy(path: string, query: string): Promise<T[]>;
  post(path: string, body?: Partial<T>): Promise<T>;
  put(path: string, id: string, body?: Partial<T>): Promise<T>;
  patch(path: string, id: string, body?: Partial<T>): Promise<T>;
  delete(path: string, id: string): Promise<T>;
}

export const RepositoryToken = new InjectionToken<Repository<any>>('Repository Token');
