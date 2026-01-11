import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsTodoMainComponent } from './things-todo-main.component';

describe('ThingsTodoMainComponent', () => {
  let component: ThingsTodoMainComponent;
  let fixture: ComponentFixture<ThingsTodoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingsTodoMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThingsTodoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
