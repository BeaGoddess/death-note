import { Component, inject } from '@angular/core';
import { VictimCard } from '../../components/victim-card/victim-card';
import { VictimsService } from '../../services/victims/victims';

@Component({
  imports: [VictimCard],
  standalone: true,
  selector: 'app-victims-page',
  styleUrl: './victims-page.scss',
  templateUrl: './victims-page.html',
})
export class VictimsPage {
  victimsService = inject(VictimsService); // inject the victims service

  constructor() {
    // only load the victims once when the page is loaded
    // this service is used also on the write page, but is to insert, not to get all the list. So this is only for this page.
    this.victimsService.loadVictims();
  }
}
