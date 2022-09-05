import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCategoriesComponent } from './phone-categories.component';

describe('PhoneCategoriesComponent', () => {
  let component: PhoneCategoriesComponent;
  let fixture: ComponentFixture<PhoneCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
