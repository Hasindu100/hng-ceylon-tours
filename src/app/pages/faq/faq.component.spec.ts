import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async) {
    await TestBed.configureTestingModule({
      declarations: [ FaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default active category as general', () => {
    expect(component.activeCategory).toBe('general');
  });

  it('should toggle FAQ item open state', () => {
    const item = component.faqItems[0];
    expect(item.isOpen).toBe(false);
    component.toggleFAQ(item);
    expect(item.isOpen).toBe(true);
    component.toggleFAQ(item);
    expect(item.isOpen).toBe(false);
  });

  it('should filter FAQ items by category', () => {
    const generalItems = component.filterByCategory('general');
    expect(generalItems.length).toBeGreaterThan(0);
    expect(generalItems.every(item => item.category === 'general')).toBe(true);
  });

  it('should set active category', () => {
    component.setActiveCategory('booking');
    expect(component.activeCategory).toBe('booking');
  });

  it('should return correct category label', () => {
    const label = component.getCategoryLabel('general');
    expect(label).toBe('General Questions');
  });

  it('should contain multiple FAQ categories', () => {
    expect(component.categories.length).toBe(5);
    expect(component.categories).toContain('general');
    expect(component.categories).toContain('booking');
    expect(component.categories).toContain('payment');
    expect(component.categories).toContain('vehicles');
    expect(component.categories).toContain('tours');
  });

  it('should have multiple FAQ items', () => {
    expect(component.faqItems.length).toBeGreaterThan(0);
  });
});
