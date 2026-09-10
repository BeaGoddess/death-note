import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { KeyboardShortcuts } from './services/keyboard-shortcuts/keyboard-shortcuts';

@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('death-note');
  private _keyboardShortcuts = inject(KeyboardShortcuts); // already initialized in the constructor inside the service
}
