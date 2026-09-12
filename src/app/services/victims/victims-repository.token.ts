import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Victim } from '../../types/victim';

export interface VictimsRepository {
  load(): Promise<Victim[]>;
  add(name: string, causeOfDeath: string): Promise<Victim>;
  remove(id: string): Promise<void>;
  search(name: string): Promise<Victim[]>;
}

export const VictimsRepositoryToken = new InjectionToken<VictimsRepository>(
  'Victims Repository Token',
);
