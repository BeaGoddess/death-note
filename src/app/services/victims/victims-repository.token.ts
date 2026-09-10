import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Victim } from '../../types/victim';

export interface VictimsRepository {
  load(): Observable<Victim[]>;
  add(name: string, causeOfDeath: string): Observable<Victim>;
  remove(id: string): Observable<void>;
}

export const VictimsRepositoryToken = new InjectionToken<VictimsRepository>(
  'Victims Repository Token',
);
