import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VictimsService } from '../../services/victims/victims';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  victimsService = inject(VictimsService);

  readonly links = [
    { path: '/', label: 'Write', exact: true },
    { path: '/rules', label: 'Rules', exact: false },
    { path: '/victims', label: 'Victims', exact: false },
  ];
}
