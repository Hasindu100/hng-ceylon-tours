import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapPopupComponent } from './road-map-popup.component';

describe('RoadMapPopupComponent', () => {
  let component: RoadMapPopupComponent;
  let fixture: ComponentFixture<RoadMapPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadMapPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadMapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
