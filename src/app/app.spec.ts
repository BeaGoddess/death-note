import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { VictimsRepositoryToken } from './services/victims/victims-repository.token';
import { FakeVictimsRepository } from './services/victims/fake-victims-repository';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: VictimsRepositoryToken, useClass: FakeVictimsRepository },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Write');
    expect(compiled.textContent).toContain('Rules');
    expect(compiled.textContent).toContain('Victims');
  });
});
