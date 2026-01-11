import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourHeroComponent } from './tour-hero.component';

describe('TourHeroComponent', () => {
  let component: TourHeroComponent;
  let fixture: ComponentFixture<TourHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourHeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
