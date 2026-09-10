import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Victim } from '../../types/victim';
import { VictimsRepository } from './victims-repository.token';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpVictimsRepository implements VictimsRepository {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/victims';

  load(): Observable<Victim[]> {
    return this.http.get<Victim[]>(this.apiUrl);
  }

  add(name: string, causeOfDeath: string): Observable<Victim> {
    const newVictim = {
      id: crypto.randomUUID(),
      name,
      causeOfDeath,
      writtenAt: new Date(),
    };
    return this.http.post<Victim>(this.apiUrl, newVictim);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
