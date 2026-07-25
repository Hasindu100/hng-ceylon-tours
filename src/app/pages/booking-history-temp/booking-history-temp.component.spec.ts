import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryTempComponent } from './booking-history-temp.component';

describe('BookingHistoryTempComponent', () => {
  let component: BookingHistoryTempComponent;
  let fixture: ComponentFixture<BookingHistoryTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingHistoryTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHistoryTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
