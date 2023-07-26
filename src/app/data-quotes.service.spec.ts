import { TestBed } from '@angular/core/testing';

import { DataQuotesService } from './data-quotes.service';

describe('DataQuotesService', () => {
  let service: DataQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
