import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocationVM } from '../models/tour';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loadTourDetails$ = new BehaviorSubject<any>(null);
  selectedVehicleTypeId: number = 1;
  selectedVehicleTypeName: string = 'Car';

  constructor() { }
}
