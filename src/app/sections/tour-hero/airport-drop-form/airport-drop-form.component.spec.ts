import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportDropFormComponent } from './airport-drop-form.component';

describe('AirportDropFormComponent', () => {
  let component: AirportDropFormComponent;
  let fixture: ComponentFixture<AirportDropFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportDropFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportDropFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
