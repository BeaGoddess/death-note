import { Component, computed, inject, OnDestroy } from '@angular/core';
import { VictimCard } from '../../components/victim-card/victim-card';
import { VictimsService } from '../../services/victims/victims';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [VictimCard, FormsModule],
  standalone: true,
  selector: 'app-victims-page',
  styleUrl: './victims-page.scss',
  templateUrl: './victims-page.html',
})
export class VictimsPage implements OnDestroy {
  victimsService = inject(VictimsService); // inject the victims service

  // displayed victims are inside the service, so we don't need to compute it here

  constructor() {
    // only load the victims once when the page is loaded
    // this service is used also on the write page, but is to insert, not to get all the list. So this is only for this page.
    this.victimsService.loadVictims();

    // we could also reset inside the constructor when the page is loaded
  }

  // reset the filter when the page is destroyed
  ngOnDestroy() {
    this.victimsService.resetFilter();
  }
}
