import { Injectable } from '@angular/core';
import { Repository } from './repository-token';

interface Identifiable {
  id: string;
}

@Injectable()
export class FakeRepository<T extends Identifiable> implements Repository<T> {
  private store = new Map<string, T[]>();

  private getList(path: string): T[] {
    return this.store.get(path) ?? [];
  }

  private setList(path: string, list: T[]): void {
    this.store.set(path, list);
  }

  async getAll(path: string): Promise<T[]> {
    return [...this.getList(path)];
  }

  async get(path: string, id: string): Promise<T> {
    const item = this.getList(path).find((i) => i.id === id);
    if (!item) {
      throw new Error(`Item with id ${id} not found in ${path}`);
    }
    return item;
  }

  async findBy(path: string, query: string): Promise<T[]> {
    const list = this.getList(path);
    const [key, value] = query.split('=');
    if (!key || !value) {
      throw new Error('Invalid query');
    }
    return list.filter((item) => {
      const prop = (item as any)[key];
      return typeof prop === 'string' && prop.toLowerCase().includes(value.toLowerCase());
    });
  }

  async post(path: string, body?: Partial<T>): Promise<T> {
    const list = this.getList(path);
    const newItem = { ...body, id: crypto.randomUUID() } as T;
    this.setList(path, [...list, newItem]);
    return newItem;
  }

  async put(path: string, id: string, body?: Partial<T>): Promise<T> {
    const list = this.getList(path);
    const index = list.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in ${path}`);
    }
    const replaced = { ...body, id } as T;
    const updatedList = [...list];
    updatedList[index] = replaced;
    this.setList(path, updatedList);
    return replaced;
  }

  async patch(path: string, id: string, body?: Partial<T>): Promise<T> {
    const list = this.getList(path);
    const existing = list.find((i) => i.id === id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found in ${path}`);
    }
    const merged = { ...existing, ...body, id } as T;
    const updatedList = list.map((i) => (i.id === id ? merged : i));
    this.setList(path, updatedList);
    return merged;
  }

  async delete(path: string, id: string): Promise<T> {
    const list = this.getList(path);
    const existing = list.find((i) => i.id === id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found in ${path}`);
    }
    this.setList(
      path,
      list.filter((i) => i.id !== id),
    );
    return existing;
  }

  clear(): void {
    this.store.clear();
  }
}
