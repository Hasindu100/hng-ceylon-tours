import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { animate, style, transition, trigger } from '@angular/animations';


export const slideLeft = trigger('slideLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const slideRight = trigger('slideRight', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);


@Component({
    selector: 'app-tour-hero2',
    templateUrl: './tour-hero2.component.html',
    styleUrls: ['./tour-hero2.component.scss'],
    animations: [slideLeft, slideRight],
    standalone: false
})
export class TourHero2Component {
  activeTab: string = 'airportpickup';
  showVehicleImagePopup: boolean = false;
  vehicleImagePopupImageList: any[] = [];

  constructor(private commonService: CommonService) {}

  get selectedVehicleType() {
    return this.commonService.selectedVehicleTypeId;
  }

  get user() {
    return this.commonService.user;
  }

  get isDataLoading() {
    return this.commonService.isDataLoading;
  }

  ngOnInit(): void {

  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onOpenVehicleImagePopup(imageList: any) {
    this.showVehicleImagePopup = true;
    this.vehicleImagePopupImageList = imageList;
  }

  onCloseVehicleImagePopup() {
    this.showVehicleImagePopup = false;
  }
}






