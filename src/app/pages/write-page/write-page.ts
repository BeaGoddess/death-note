import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, map, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [FormsModule],
  selector: 'app-write-page',
  styleUrl: './write-page.scss',
  templateUrl: './write-page.html',
})
export class WritePage {
  name = '';
  causeOfDeath = '';
  hasWritten = signal(false);
  countdown = signal(40);

  constructor() {
    const seconds = 40;

    effect((onCleanup) => {
      if (!this.hasWritten()) {
        return;
      }

      const sub = interval(1000)
        .pipe(
          take(seconds), // number of times the observable will emit
          map((tick) => seconds - tick - 1), // emit the countdown in seconds
        )
        .subscribe({
          next: (secondsLeft) => {
            this.countdown.set(secondsLeft); // update the countdown signal
          },
          complete: () => {
            this.hasWritten.set(false); // reset the hasWritten signal
          },
        });

      onCleanup(() => {
        sub.unsubscribe();
        // reset the countdown signal
        this.countdown.set(seconds);
        this.hasWritten.set(false);
      });
    });
  }

  writeInNote() {
    if (!this.name.trim()) return;

    const causes = [
      'tripped over a rake while running from responsibilities',
      'laughing at their own joke',
      "defeated by a jar that wouldn't open",
      'by ambition (and a sandwich)',
      'lost a staring contest with the sun',
    ];
    this.causeOfDeath = causes[Math.floor(Math.random() * causes.length)];
    this.hasWritten.set(true);
  }

  reset() {
    this.name = '';
    this.causeOfDeath = '';
    this.hasWritten.set(false);
  }
}
