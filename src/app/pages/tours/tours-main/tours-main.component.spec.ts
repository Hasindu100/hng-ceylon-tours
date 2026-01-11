import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursMainComponent } from './tours-main.component';

describe('ToursMainComponent', () => {
  let component: ToursMainComponent;
  let fixture: ComponentFixture<ToursMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
