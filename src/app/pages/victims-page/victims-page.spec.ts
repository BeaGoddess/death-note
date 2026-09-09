import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VictimsPage } from './victims-page';

describe('VictimsPage', () => {
  let component: VictimsPage;
  let fixture: ComponentFixture<VictimsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VictimsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(VictimsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
