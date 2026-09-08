import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-rules-page',
  styleUrl: './rules-page.scss',
  templateUrl: './rules-page.html',
})
export class RulesPage {
  rules = [
    'The human whose name is written in this note shall die.',
    'This note will not take effect unless a name is written.',
    'The writer cannot choose the cause of death. The note will decide it.',
    'Death will occur 40 seconds after the name is written.',
    'Once a name has been written, another may be written after the previous death, or the writer may begin again.',
  ];
}
