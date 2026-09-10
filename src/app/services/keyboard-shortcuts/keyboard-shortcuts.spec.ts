import { TestBed } from '@angular/core/testing';
import { KeyboardShortcuts } from './keyboard-shortcuts';

describe('KeyboardShortcuts', () => {
  let service: KeyboardShortcuts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardShortcuts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
