import { TestBed } from '@angular/core/testing';

import { Numinario1Service } from './numinario1.service';

describe('Numinario1Service', () => {
  let service: Numinario1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Numinario1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
