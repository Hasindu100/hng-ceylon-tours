import { TestBed } from '@angular/core/testing';
import { EMPTY, Subject } from 'rxjs';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('keeps the loader visible until each observable operation emits', () => {
    const first = new Subject<number>();
    const second = new Subject<number>();

    service.trackObservable(() => first).subscribe();
    service.trackObservable(() => second).subscribe();
    expect(service.isLoading()).toBeTrue();

    first.next(1);
    expect(service.isLoading()).toBeTrue();

    second.next(1);
    expect(service.isLoading()).toBeFalse();
  });

  it('hides the loader when an observable completes without emitting', () => {
    service.trackObservable(() => EMPTY).subscribe();

    expect(service.isLoading()).toBeFalse();
  });

  it('keeps the loader visible until a promise settles', async () => {
    let resolveOperation!: (value: number) => void;
    const operation = new Promise<number>(resolve => {
      resolveOperation = resolve;
    });
    const trackedOperation = service.trackPromise(() => operation);

    expect(service.isLoading()).toBeTrue();
    resolveOperation(1);
    await trackedOperation;

    expect(service.isLoading()).toBeFalse();
  });
});
