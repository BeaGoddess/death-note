import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Victim } from '../../types/victim';
import { VictimsRepository } from './victims-repository.token';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpVictimsRepository implements VictimsRepository {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/victims';

  load(): Promise<Victim[]> {
    return firstValueFrom(this.http.get<Victim[]>(this.apiUrl));
  }

  add(name: string, causeOfDeath: string): Promise<Victim> {
    const newVictim = {
      id: crypto.randomUUID(),
      name,
      causeOfDeath,
      writtenAt: new Date(),
    };
    return firstValueFrom(this.http.post<Victim>(this.apiUrl, newVictim));
  }

  search(name: string): Promise<Victim[]> {
    return firstValueFrom(
      this.http.get<Victim[]>(`${this.apiUrl}${name ? `?name:contains=${name}` : ''}`),
    );
  }

  remove(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
