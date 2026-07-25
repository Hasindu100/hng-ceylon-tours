import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { LocationVM } from '../models/tour';
import { HttpClient } from '@angular/common/http';
import { CountryOption } from '../pages/test-page/test-page.component';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loadTourDetails$ = new BehaviorSubject<any>(null);
  selectedVehicleTypeId: number = 1;
  selectedVehicleTypeName: string = 'Car';
  loadUserData = new BehaviorSubject<any>(null);
  loadUserData$ = this.loadUserData.asObservable();
  user!: User;
  isDataLoading: boolean = false;

  constructor(private http: HttpClient) { }

  getCountryList() {
    let url = 'https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags';
    return this.http.get(url).pipe(
      map((items : any) => {
        
          const options: CountryOption[] = [];
          for (const c of items) {
            const name = c.name?.common?.trim();
            const iso2 = c.cca2?.toUpperCase();
            const root = c.idd?.root?.trim();          // e.g., "+9"
            const suffixes = c.idd?.suffixes ?? [];    // e.g., ["4"]
            if (!name || !iso2 || !root || suffixes.length === 0) continue;

            // Some countries have multiple suffixes → multiple full codes
            const composed = suffixes
              .filter((s: any) => !!s)
              .map((s: any) => (root + s).replace(/\s+/g, ''));

            // Heuristic: pick the shortest as a "primary" dialCode for display
            const dialCode = composed.slice().sort((a: any, b: any) => a.length - b.length)[0];

            options.push({
              name,
              iso2,
              dialCode,
              dialCodes: composed,
              flagPng: c.flags?.png
            });
          }

          // Sort by name for dropdown
          return options.sort((a, b) => a.name.localeCompare(b.name));

      })
    );
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
