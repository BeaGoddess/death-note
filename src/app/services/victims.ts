import { computed, Injectable, signal } from '@angular/core';
import { Victim } from '../types/victim';

@Injectable({
  providedIn: 'root',
})
export class VictimsService {
  private _victims = signal<Victim[]>([]);

  // readonly accessor for the victims signal, only this class can mutate it
  victims = this._victims.asReadonly();

  count = computed(() => this._victims().length);

  addVictim(name: string, causeOfDeath: string) {
    const newVictim: Victim = {
      id: crypto.randomUUID(),
      name,
      causeOfDeath,
      writtenAt: new Date(),
    };
    this._victims.update((victims) => [...victims, newVictim]);
  }

  removeVictim(id: string) {
    // if we do like this._victims.push(newVictim), we would be mutating the signal directly
    // like React, we needed to use the setState method to update the state
    this._victims.update((victims) => victims.filter((v) => v.id !== id));
  }
}
