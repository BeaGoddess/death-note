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

  load(): Observable<Victim[]> {
    return of(this.readAll());
  }

  add(name: string, causeOfDeath: string): Observable<Victim> {
    const newVictim: Victim = {
      id: crypto.randomUUID(),
      name,
      causeOfDeath,
      writtenAt: new Date(),
    };
    this.writeAll([...this.readAll(), newVictim]);
    return of(newVictim);
  }

  search(name: string): Observable<Victim[]> {
    return of(this.readAll().filter((v) => v.name.toLowerCase().includes(name.toLowerCase())));
  }

  remove(id: string): Observable<void> {
    this.writeAll(this.readAll().filter((v) => v.id !== id));
    return of(void 0);
  }
}
