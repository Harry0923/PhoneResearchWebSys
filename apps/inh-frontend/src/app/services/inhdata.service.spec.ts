import { TestBed } from '@angular/core/testing';

import { InhdataService } from './inhdata.service';

describe('BasicdataService', () => {
  let service: InhdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InhdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
