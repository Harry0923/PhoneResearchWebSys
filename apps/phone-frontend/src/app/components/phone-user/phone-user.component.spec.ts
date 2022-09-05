import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneUserComponent } from './phone-user.component';

describe('PhoneUserComponent', () => {
  let component: PhoneUserComponent;
  let fixture: ComponentFixture<PhoneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
