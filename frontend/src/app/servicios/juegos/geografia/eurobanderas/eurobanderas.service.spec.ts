import { TestBed } from '@angular/core/testing';

import { EurobanderasService } from './eurobanderas.service';

describe('EurobanderasService', () => {
  let service: EurobanderasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EurobanderasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
