import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VictimsPage } from './victims-page';
import { VictimsRepositoryToken } from '../../services/victims/victims-repository.token';
import { FakeVictimsRepository } from '../../services/victims/fake-victims-repository';

describe('VictimsPage', () => {
  let component: VictimsPage;
  let fixture: ComponentFixture<VictimsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VictimsPage],
      providers: [{ provide: VictimsRepositoryToken, useClass: FakeVictimsRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(VictimsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
