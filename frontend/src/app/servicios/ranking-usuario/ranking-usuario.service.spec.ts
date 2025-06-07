import { TestBed } from '@angular/core/testing';

import { RankingUsuarioService } from './ranking-usuario.service';

describe('RankingUsuarioService', () => {
  let service: RankingUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
