import { isPlatformBrowser } from '@angular/common';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { defer, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private activeRequests = signal(0);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  readonly isLoading = computed(
    () => this.activeRequests() > 0
  );

  show(): void {
    this.activeRequests.update(count => count + 1);
  }

  hide(): void {
    this.activeRequests.update(
      count => Math.max(0, count - 1)
    );
  }

  trackObservable<T>(operation: () => Observable<T>): Observable<T> {
    return defer(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return defer(operation);
      }

      this.show();
      let loading = true;
      const finish = () => {
        if (loading) {
          loading = false;
          this.hide();
        }
      };

      return defer(operation).pipe(
        tap({
          next: finish,
          error: finish,
          complete: finish,
        }),
        finalize(finish)
      );
    });
  }

  trackPromise<T>(operation: () => Promise<T>): Promise<T> {
    if (!isPlatformBrowser(this.platformId)) {
      return operation();
    }

    this.show();
    try {
      return operation().finally(() => this.hide());
    } catch (error) {
      this.hide();
      throw error;
    }
  }
}
