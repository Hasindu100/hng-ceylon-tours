import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsComponent } from './terms-conditions.component';

describe('TermsConditionsComponent', () => {
  let component: TermsConditionsComponent;
  let fixture: ComponentFixture<TermsConditionsComponent>;

  beforeEach(async) {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 18 terms sections', () => {
    expect(component.termsSections.length).toBe(18);
  });

  it('should have last updated date', () => {
    expect(component.lastUpdated).toBeTruthy();
  });

  it('should filter sections with content and subsections', () => {
    const sectionsWithContent = component.termsSections.filter(s => s.content.length > 0 || s.subsections);
    expect(sectionsWithContent.length).toBeGreaterThan(0);
  });

  it('should scroll to section', () => {
    spyOn(document.getElementById('section-1'), 'scrollIntoView');
    component.scrollToSection(1);
    // Note: This is a simple spy test. In real scenarios, you might want to mock the scrollIntoView method
  });

  it('should have unique section IDs', () => {
    const ids = component.termsSections.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(component.termsSections.length);
  });

  it('should have proper section structure', () => {
    const firstSection = component.termsSections[0];
    expect(firstSection.id).toBeDefined();
    expect(firstSection.title).toBeDefined();
    expect(firstSection.content || firstSection.subsections).toBeTruthy();
  });
});
