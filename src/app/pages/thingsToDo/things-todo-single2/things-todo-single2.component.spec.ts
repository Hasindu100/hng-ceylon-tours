import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsTodoSingle2Component } from './things-todo-single2.component';

describe('ThingsTodoSingle2Component', () => {
  let component: ThingsTodoSingle2Component;
  let fixture: ComponentFixture<ThingsTodoSingle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingsTodoSingle2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThingsTodoSingle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
