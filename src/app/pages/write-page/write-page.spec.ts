import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritePage } from './write-page';
import { VictimsRepositoryToken } from '../../services/victims/victims-repository.token';
import { FakeVictimsRepository } from '../../services/victims/fake-victims-repository';

describe('WritePage', () => {
  let component: WritePage;
  let fixture: ComponentFixture<WritePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritePage],
      providers: [{ provide: VictimsRepositoryToken, useClass: FakeVictimsRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(WritePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
