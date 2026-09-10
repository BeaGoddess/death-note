import { computed, inject, Injectable, signal } from '@angular/core';
import { Victim } from '../types/victim';
import { VICTIMS_REPOSITORY } from './victims-repository.token';

@Injectable({
  providedIn: 'root',
})
export class VictimsService {
  private repository = inject(VICTIMS_REPOSITORY);
  private _victims = signal<Victim[]>([]);

  // readonly accessor for the victims signal, only this class can mutate it
  victims = this._victims.asReadonly();

  count = computed(() => this._victims().length);

  loadVictims() {
    this.repository.load().subscribe((victims) => {
      this._victims.set(victims);
    });
  }

  addVictim(name: string, causeOfDeath: string) {
    this.repository.add(name, causeOfDeath).subscribe((victim) => {
      this._victims.update((victims) => [...victims, victim]);
    });
  }

  removeVictim(id: string) {
    // if we do like this._victims.push(newVictim), we would be mutating the signal directly
    // like React, we needed to use the setState method to update the state
    this.repository.remove(id).subscribe(() => {
      this._victims.update((victims) => victims.filter((v) => v.id !== id));
    });
  }
}
