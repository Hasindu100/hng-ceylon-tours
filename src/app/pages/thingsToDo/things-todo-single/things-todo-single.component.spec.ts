import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsTodoSingleComponent } from './things-todo-single.component';

describe('ThingsTodoSingleComponent', () => {
  let component: ThingsTodoSingleComponent;
  let fixture: ComponentFixture<ThingsTodoSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingsTodoSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThingsTodoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
