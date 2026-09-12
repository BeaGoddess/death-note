import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Victim } from '../../types/victim';
import { VictimsRepository } from './victims-repository.token';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'death-note-victims';

@Injectable()
export class LocalStorageVictimsRepository implements VictimsRepository {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readAll(): Victim[] {
    try {
      if (!this.isBrowser) return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  private writeAll(victims: Victim[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(victims));
  }

  load(): Promise<Victim[]> {
    return Promise.resolve(this.readAll());
  }

  add(name: string, causeOfDeath: string): Promise<Victim> {
    const newVictim: Victim = {
      id: crypto.randomUUID(),
      name,
      causeOfDeath,
      writtenAt: new Date(),
    };
    this.writeAll([...this.readAll(), newVictim]);
    return Promise.resolve(newVictim);
  }

  search(name: string): Promise<Victim[]> {
    return Promise.resolve(
      this.readAll().filter((v) => v.name.toLowerCase().includes(name.toLowerCase())),
    );
  }

  remove(id: string): Promise<void> {
    this.writeAll(this.readAll().filter((v) => v.id !== id));
    return Promise.resolve(void 0);
  }
}
