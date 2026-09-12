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

    fixture.componentRef.setInput('victim', {
      id: crypto.randomUUID(),
      name: 'Ricardo Costa',
      causeOfDeath: 'playing Genshin Impact with Rittachi',
      writtenAt: new Date(),
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
