import { TestBed } from '@angular/core/testing';
import { VictimsService } from './victims';
import { RepositoryToken } from '../global/repository-token';
import { ApplicationRef } from '@angular/core';
import { FakeRepository } from '../global/fake-repository';

describe('VictimsService', () => {
  let service: VictimsService;
  const victimName = 'Ricardo Costa';
  const victimCauseOfDeath = 'playing Genshin Impact with Rittachi';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RepositoryToken, useClass: FakeRepository }],
    });
    service = TestBed.inject(VictimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a victim', async () => {
    await service.addVictim(victimName, victimCauseOfDeath);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.victims().length).toBe(1);
    expect(service.victims()[0].name).toBe(victimName);
    expect(service.victims()[0].causeOfDeath).toBe(victimCauseOfDeath);
    expect(new Date(service.victims()[0].writtenAt)).toBeInstanceOf(Date);
  });

  it('should remove a victim', async () => {
    await service.addVictim(victimName, victimCauseOfDeath);
    await TestBed.inject(ApplicationRef).whenStable();

    await service.removeVictim(service.victims()[0].id);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.victims().length).toBe(0);
  });

  it('should search for a victim', async () => {
    await service.addVictim(victimName, victimCauseOfDeath);
    await service.addVictim('Beatriz Silva', 'learning Angular without resting');
    await TestBed.inject(ApplicationRef).whenStable();

    service.searchTerm.set('Beatriz');

    await new Promise((resolve) => setTimeout(resolve, 350));
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.victims().length).toBe(1);
    expect(service.victims()[0].name).toBe('Beatriz Silva');
  });
});
