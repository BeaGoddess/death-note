import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RepositoryToken } from './services/global/repository-token';
import { HttpRepository } from './services/global/http-repository';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: RepositoryToken, useClass: HttpRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const reqs = httpMock.match(() => true);
    reqs.forEach((req) => req.flush([]));

    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Write');
    expect(compiled.textContent).toContain('Rules');
    expect(compiled.textContent).toContain('Victims');
  });
});
