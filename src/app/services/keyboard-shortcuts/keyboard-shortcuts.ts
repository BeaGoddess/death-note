import { afterNextRender, inject, Injectable } from '@angular/core';
import { DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class KeyboardShortcuts {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  version = 1;

  private shortcuts: Record<string, string> = {
    w: '/',
    v: '/victims',
    r: '/rules',
  };

  private handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
    if (isTyping) return;

    const shortcut = this.shortcuts[event.key];
    if (shortcut) {
      this.router.navigate([shortcut]);
    }
  }

  private boundHandleKeydown = this.handleKeydown.bind(this);

  constructor() {
    afterNextRender(() => {
      if (this.version === 1) {
        fromEvent<KeyboardEvent>(document, 'keydown')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((event) => this.handleKeydown(event));

        return;
      }

      if (this.version === 2) {
        document.addEventListener('keydown', this.boundHandleKeydown);

        this.destroyRef.onDestroy(() => {
          document.removeEventListener('keydown', this.boundHandleKeydown);
        });
      }
    });
  }
}
