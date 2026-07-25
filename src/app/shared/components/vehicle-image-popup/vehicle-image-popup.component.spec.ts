import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleImagePopupComponent } from './vehicle-image-popup.component';

describe('VehicleImagePopupComponent', () => {
  let component: VehicleImagePopupComponent;
  let fixture: ComponentFixture<VehicleImagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleImagePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
