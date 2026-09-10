import { TestBed } from '@angular/core/testing';
import { VictimsService } from './victims';

describe('VictimsService', () => {
  let service: VictimsService;
  const victimName = 'Ricardo Costa';
  const victimCauseOfDeath = 'playing Genshin Impact with Rittachi';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a victim', () => {
    service.addVictim(victimName, victimCauseOfDeath);
    expect(service.victims().length).toBe(1);
    expect(service.victims()[0].name).toBe(victimName);
    expect(service.victims()[0].causeOfDeath).toBe(victimCauseOfDeath);
    expect(service.victims()[0].writtenAt).toBeInstanceOf(Date);
  });

  it('should remove a victim', () => {
    service.addVictim(victimName, victimCauseOfDeath);
    service.removeVictim(service.victims()[0].id);
    expect(service.victims().length).toBe(0);
  });
});
