import { Component, inject } from '@angular/core';
import { VictimCard } from '../../components/victim-card/victim-card';
import { VictimsService } from '../../services/victims';

@Component({
  imports: [VictimCard],
  standalone: true,
  selector: 'app-victims-page',
  styleUrl: './victims-page.scss',
  templateUrl: './victims-page.html',
})
export class VictimsPage {
  victimsService = inject(VictimsService); // inject the victims service
}
