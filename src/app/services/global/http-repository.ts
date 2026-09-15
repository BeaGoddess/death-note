import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Repository } from './repository-token';

@Injectable()
export class HttpRepository<T> implements Repository<T> {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAll(path: string): Promise<T[]> {
    return firstValueFrom(this.http.get<T[]>(this.apiUrl + '/' + path));
  }

  findBy(path: string, query: string): Promise<T[]> {
    const [key, value] = query.split('=');
    if (!key || !value) {
      throw new Error('Invalid query');
    }
    const updatedQuery = `${key}:contains=${encodeURIComponent(value)}`;
    return firstValueFrom(this.http.get<T[]>(`${this.apiUrl}/${path}?${updatedQuery}`));
  }

  get(path: string, id: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(this.apiUrl + path + '/' + id));
  }

  post(path: string, body?: Partial<T>): Promise<T> {
    return firstValueFrom(this.http.post<T>(this.apiUrl + '/' + path, body));
  }

  put(path: string, id: string, body?: any): Promise<T> {
    return firstValueFrom(this.http.put<T>(this.apiUrl + '/' + path + '/' + id, body));
  }

  patch(path: string, id: string, body?: any): Promise<T> {
    return firstValueFrom(this.http.patch<T>(this.apiUrl + '/' + path + '/' + id, body));
  }

  delete(path: string, id: string): Promise<T> {
    return firstValueFrom(this.http.delete<T>(this.apiUrl + '/' + path + '/' + id));
  }
}
