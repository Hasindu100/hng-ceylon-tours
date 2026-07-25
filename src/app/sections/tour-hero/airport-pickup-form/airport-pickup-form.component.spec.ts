import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportPickupFormComponent } from './airport-pickup-form.component';

describe('AirportPickupFormComponent', () => {
  let component: AirportPickupFormComponent;
  let fixture: ComponentFixture<AirportPickupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportPickupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportPickupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
