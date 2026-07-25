import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTourFormComponent } from './custom-tour-form.component';

describe('CustomTourFormComponent', () => {
  let component: CustomTourFormComponent;
  let fixture: ComponentFixture<CustomTourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTourFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
