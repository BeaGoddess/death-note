import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VictimCard } from './victim-card';

describe('VictimCard', () => {
  let component: VictimCard;
  let fixture: ComponentFixture<VictimCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VictimCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VictimCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
