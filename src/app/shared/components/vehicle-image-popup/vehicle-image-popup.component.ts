import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vehicle-image-popup',
  templateUrl: './vehicle-image-popup.component.html',
  styleUrls: ['./vehicle-image-popup.component.scss']
})
export class VehicleImagePopupComponent implements AfterViewInit {
  showPopup = false;

  @Input() imageList: string[] = [];
  @Output() closeImagePopup: EventEmitter<void> = new EventEmitter<void>();

  images: string[] = [
    'assets/images/vehicle/prius1.jpg',
    'assets/images/vehicle/prius2.jpg',
    'assets/images/vehicle/prius3.jpg',
    'assets/images/vehicle/prius1.jpg',
  ];

  selectedImage: string | undefined;

  ngAfterViewInit(): void {
    this.selectedImage = this.imageList[0];
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.closeImagePopup.emit();
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

}
