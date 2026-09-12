import { of } from 'rxjs';
import { VictimsRepository } from './victims-repository.token';
import { Victim } from '../../types/victim';

export class FakeVictimsRepository implements VictimsRepository {
  private victims: Victim[] = [];

  load() {
    return of(this.victims);
  }

  add(name: string, causeOfDeath: string) {
    const victim: Victim = {
      id: crypto.randomUUID(),
      name,
      causeOfDeath,
      writtenAt: new Date(),
    };
    this.victims.push(victim);
    return of(victim);
  }

  remove(id: string) {
    this.victims = this.victims.filter((v) => v.id !== id);
    return of(void 0);
  }

  search(name: string) {
    const filtered = this.victims.filter((v) => v.name.toLowerCase().includes(name.toLowerCase()));
    return of(filtered);
  }
}
