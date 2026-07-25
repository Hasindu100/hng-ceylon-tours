import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideFeaturesComponent } from './ride-features.component';

describe('RideFeaturesComponent', () => {
  let component: RideFeaturesComponent;
  let fixture: ComponentFixture<RideFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
