import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownFormat',
  standalone: true,
})
export class CountdownFormatPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      const minsText = minutes === 1 ? '1 minute' : `${minutes} minutes`;
      const secsText = seconds > 0 ? ` and ${seconds} second${seconds === 1 ? '' : 's'}` : '';
      return `${minsText}${secsText}`;
    } else {
      return `${seconds} second${seconds === 1 ? '' : 's'}`;
    }
  }
}
