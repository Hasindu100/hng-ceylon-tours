import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursSingleComponent } from './tours-single.component';

describe('ToursSingleComponent', () => {
  let component: ToursSingleComponent;
  let fixture: ComponentFixture<ToursSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
