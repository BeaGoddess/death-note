import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritePage } from './write-page';
import { HttpRepository } from '../../services/global/http-repository';
import { RepositoryToken } from '../../services/global/repository-token';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('WritePage', () => {
  let component: WritePage;
  let fixture: ComponentFixture<WritePage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritePage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RepositoryToken, useClass: HttpRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(WritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const reqs = httpMock.match(() => true);
    reqs.forEach((req) => req.flush([]));

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
