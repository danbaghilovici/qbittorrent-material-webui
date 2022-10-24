import { TestBed } from '@angular/core/testing';

import { QbitService } from './qbit.service';

describe('QbitService', () => {
  let service: QbitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QbitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
