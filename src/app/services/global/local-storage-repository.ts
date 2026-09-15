import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Repository } from './repository-token';

interface Identifiable {
  id: string;
}

@Injectable()
export class LocalStorageRepository<T extends Identifiable> implements Repository<T> {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readList(path: string): T[] {
    if (!this.isBrowser) return [];
    const value = localStorage.getItem(path);
    return value ? JSON.parse(value) : [];
  }

  private writeList(path: string, list: T[]): void {
    if (this.isBrowser) {
      localStorage.setItem(path, JSON.stringify(list));
    }
  }

  private getUpdatedItem(items: T[], id: string, body?: Partial<T>): T {
    const updatedItem = items.find((item) => item.id === id);
    if (!updatedItem) {
      throw new Error(`Item with id ${id} not found`);
    }
    const updated = { ...updatedItem, ...body, id } as T;
    return updated;
  }

  async getAll(path: string): Promise<T[]> {
    return this.readList(path);
  }

  async get(path: string, id: string): Promise<T> {
    const item = this.readList(path).find((item) => item.id === id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    return item;
  }

  async findBy(path: string, query: string): Promise<T[]> {
    const list = this.readList(path);
    const [key, value] = query.split('=');
    if (!key || !value) return [];
    return list.filter((item) => {
      const prop = (item as any)[key];
      return typeof prop === 'string' && prop.toLowerCase().includes(value.toLowerCase());
    });
  }

  async post(path: string, body?: Partial<T>): Promise<T> {
    const list = this.readList(path);
    const newItem = { ...body } as T;
    list.push(newItem);
    this.writeList(path, list);
    return newItem;
  }

  async put(path: string, id: string, body?: Partial<T>): Promise<T> {
    const list = this.readList(path);
    const existing = list.find((item) => item.id === id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found`);
    }
    const updated = this.getUpdatedItem(list, id, body);
    this.writeList(
      path,
      list.map((item) => (item.id === id ? updated : item)),
    );
    return updated;
  }

  async patch(path: string, id: string, body?: Partial<T>): Promise<T> {
    return this.put(path, id, body);
  }

  async delete(path: string, id: string): Promise<T> {
    const list = this.readList(path);
    const existing = list.find((item) => item.id === id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.writeList(
      path,
      list.filter((item) => item.id !== id),
    );
    return existing;
  }
}
