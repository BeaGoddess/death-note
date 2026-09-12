import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { Victim } from '../../types/victim';
import { VictimsRepositoryToken } from './victims-repository.token';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VictimsService {
  private repository = inject(VictimsRepositoryToken);

  searchTerm = signal<string>('');
  debouncedSearchTerm = toSignal(
    toObservable(this.searchTerm).pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  victimsResource = resource({
    params: () => this.debouncedSearchTerm(),
    loader: ({ params: term }) => (term ? this.repository.search(term) : this.repository.load()),
    defaultValue: [] as Victim[],
  });

  victims = computed(() => this.victimsResource.value());
  isLoading = computed(() => this.victimsResource.isLoading());
  error = computed(() => this.victimsResource.error());

  resetFilter() {
    this.searchTerm.set('');
  }

  reload() {
    this.victimsResource.reload();
  }

  async addVictim(name: string, causeOfDeath: string) {
    try {
      await this.repository.add(name, causeOfDeath);
      this.reload();
    } catch (err) {
      console.error('Failed to add victim', err);
    }
  }

  async removeVictim(id: string) {
    try {
      await this.repository.remove(id);
      this.reload();
    } catch (err) {
      console.error('Failed to remove victim', err);
    }
  }
}
