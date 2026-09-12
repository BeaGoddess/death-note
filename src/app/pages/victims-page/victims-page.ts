import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class VictimsPage implements OnInit, OnDestroy {
  victimsService = inject(VictimsService); // inject the victims service

  ngOnInit() {
    // only load the victims once when the page is loaded
    // this service is used also on the write page, but is to insert, not to get all the list. So this is only for this page.
    this.victimsService.reload();
  }

  // reset the filter when the page is destroyed
  ngOnDestroy() {
    this.victimsService.resetFilter();
  }
}
