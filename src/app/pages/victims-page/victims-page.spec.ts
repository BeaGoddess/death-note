import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VictimsPage } from './victims-page';
import { RepositoryToken } from '../../services/global/repository-token';
import { HttpRepository } from '../../services/global/http-repository';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('VictimsPage', () => {
  let component: VictimsPage;
  let fixture: ComponentFixture<VictimsPage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VictimsPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RepositoryToken, useClass: HttpRepository },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VictimsPage);
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
