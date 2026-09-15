import { computed, inject, Injectable, resource, Service, signal } from '@angular/core';
import { Victim } from '../../types/victim';
import { RepositoryToken } from '../global/repository-token';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Service()
export class VictimsService {
  private victimsPath = 'victims';
  private repository = inject(RepositoryToken);

  searchTerm = signal<string>('');
  debouncedSearchTerm = toSignal(
    toObservable(this.searchTerm).pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  victimsResource = resource({
    params: () => this.debouncedSearchTerm(),
    loader: ({ params: term }) =>
      term
        ? this.repository.findBy(this.victimsPath, `name=${term}`)
        : this.repository.getAll(this.victimsPath),
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
      await this.repository.post(this.victimsPath, { name, causeOfDeath });
      this.reload();
    } catch (err) {
      console.error('Failed to add victim', err);
    }
  }

  async removeVictim(id: string) {
    try {
      await this.repository.delete(this.victimsPath, id);
      this.reload();
    } catch (err) {
      console.error('Failed to remove victim', err);
    }
  }
}
