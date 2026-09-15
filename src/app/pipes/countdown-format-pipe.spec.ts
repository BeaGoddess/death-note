import { CountdownFormatPipe } from './countdown-format-pipe';

describe('CountdownFormatPipe', () => {
  let pipe: CountdownFormatPipe;

  beforeEach(() => {
    pipe = new CountdownFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format the countdown when the total seconds is 60', () => {
    expect(pipe.transform(60)).toBe('1 minute');
  });

  it('should format the countdown when the total seconds is 120', () => {
    expect(pipe.transform(120)).toBe('2 minutes');
  });

  it('should format the countdown when the total seconds is 150', () => {
    expect(pipe.transform(150)).toBe('2 minutes and 30 seconds');
  });

  it('should format the countdown when the total seconds is 70', () => {
    expect(pipe.transform(70)).toBe('1 minute and 10 seconds');
  });
});
