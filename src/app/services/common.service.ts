import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { LocationVM } from '../models/tour';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountryOption, CountryOption2 } from '../pages/test-page/test-page.component';
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

  // getCountryList() {
  //   let url = 'https://api.restcountries.com/countries/v5?response_fields=names.common,codes.alpha_2,flag.emoji&limit=3&pretty=1';
  //   const headers = new HttpHeaders({
  //     'Authorization': 'rc_live_0ee3942894fb4616ad9d54b26b6cef73'
  //   });
  //   return this.http.get(url, { headers: headers }).pipe(
  //     map((items : any) => {
        
  //         const options: CountryOption[] = [];
  //         for (const c of items) {
  //           const name = c.name?.common?.trim();
  //           const iso2 = c.cca2?.toUpperCase();
  //           const root = c.idd?.root?.trim();          // e.g., "+9"
  //           const suffixes = c.idd?.suffixes ?? [];    //  e.g., ["4"]
  //           if (!name || !iso2 || !root || suffixes.length === 0) continue;

  //           // Some countries have multiple suffixes → multiple full codes
  //           const composed = suffixes
  //             .filter((s: any) => !!s)
  //             .map((s: any) => (root + s).replace(/\s+/g, ''));

  //           // Heuristic: pick the shortest as a "primary" dialCode for display
  //           const dialCode = composed.slice().sort((a: any, b: any) => a.length - b.length)[0];

  //           options.push({
  //             name,
  //             iso2,
  //             dialCode,
  //             dialCodes: composed,
  //             flagPng: c.flags?.png
  //           });
  //         }

  //         // Sort by name for dropdown
  //         return options.sort((a, b) => a.name.localeCompare(b.name));

  //     })
  //   );
  // }

  // getCountryList() {
  //   let url = 'https://api.restcountries.com/countries/v5?response_fields=names.common,uuid,codes.alpha_2,calling_codes,flag.url_png';
  //   const headers = new HttpHeaders({
  //     'Authorization': 'rc_live_0ee3942894fb4616ad9d54b26b6cef73'
  //   });
  //   return this.http.get(url, { headers: headers }).pipe(
  //     map((res : any) => {
  //         var items = res.data.objects;
  //         const options: CountryOption2[] = [];
  //         for (const c of items) {
  //           const name = c.names?.common?.trim();
  //           const id = c.uuid;
  //           const flagPng = c.flag?.url_png;
  //           const dialCode = c.calling_codes?.[0]?.trim(); // e.g., "+94"

  //           options.push({
  //             name,
  //             id,
  //             dialCode,
  //             flagPng: flagPng
  //           });
  //         }

  //         // Sort by name for dropdown
  //         return options.sort((a, b) => a.name.localeCompare(b.name));

  //     })
  //   );
  // }

  getCountryList() {
    let url = 'https://countriesnow.space/api/v0.1/countries/info?returns=flag,unicodeFlag,dialCode,iso2';
    return this.http.get(url).pipe(
      map((res : any) => {
          var items = res.data;
          const options: CountryOption2[] = [];
          items.forEach((c: any, index: number) => {
            const name = c?.name?.trim();
            const id = index.toString(); // Use index as a unique ID since the API doesn't provide one
            const flagPng = c?.flag;
            const dialCode = c?.dialCode?.trim(); // e.g., "+94"
            const iso2 = c?.iso2?.trim(); // e.g., "LK"

            options.push({
              name,
              id,
              dialCode,
              flagPng: flagPng,
              iso2: iso2
            });
          });

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
