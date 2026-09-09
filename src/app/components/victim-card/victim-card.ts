import { Component, input, output } from '@angular/core';
import { Victim } from '../../types/victim';

@Component({
  standalone: true,
  selector: 'app-victim-card',
  host: {
    class: 'block border-b border-ash-400/45 last:border-b-0',
  },
  styleUrl: './victim-card.scss',
  templateUrl: './victim-card.html',
})
export class VictimCard {
  victim = input.required<Victim>();
  revived = output<string>();

  onRevive() {
    this.revived.emit(this.victim().id);
  }
}
