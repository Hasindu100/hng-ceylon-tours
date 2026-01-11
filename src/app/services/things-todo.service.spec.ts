import { TestBed } from '@angular/core/testing';

import { ThingsTodoService } from './things-todo.service';

describe('ThingsTodoService', () => {
  let service: ThingsTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThingsTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
