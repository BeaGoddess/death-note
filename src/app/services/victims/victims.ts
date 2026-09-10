import { computed, inject, Injectable, signal } from '@angular/core';
import { Victim } from '../../types/victim';
import { VictimsRepositoryToken } from './victims-repository.token';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VictimsService {
  private repository = inject(VictimsRepositoryToken);

  private _victims = signal<Victim[]>([]);
  // readonly accessor for the victims signal, only this class can mutate it
  victims = this._victims.asReadonly();
  count = computed(() => this._victims().length);

  searchTerm = signal('');
  searchedResults = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.repository.search(term)),
    ),
    { initialValue: [] },
  );

  displayedVictims = computed(() =>
    this.searchTerm() !== '' ? this.searchedResults() : this.victims(),
  );

  resetFilter() {
    this.searchTerm.set('');
  }

  loadVictims() {
    this.repository.load().subscribe({
      next: (victims) => this._victims.set(victims),
      error: (err) => console.error('Failed to load victims', err),
    });
  }

  addVictim(name: string, causeOfDeath: string) {
    this.repository.add(name, causeOfDeath).subscribe({
      next: (victim) => this._victims.update((victims) => [...victims, victim]),
      error: (err) => console.error('Failed to add victim', err),
    });
  }

  removeVictim(id: string) {
    this.repository.remove(id).subscribe({
      next: () => this._victims.update((victims) => victims.filter((v) => v.id !== id)),
      error: (err) => console.error('Failed to remove victim', err),
    });
  }
}
