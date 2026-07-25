import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourHero2Component } from './tour-hero2.component';

describe('TourHero2Component', () => {
  let component: TourHero2Component;
  let fixture: ComponentFixture<TourHero2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourHero2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourHero2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
