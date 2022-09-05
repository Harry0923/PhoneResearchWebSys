import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsnewPasteeditComponent } from './idsnew-pasteedit.component';

describe('IdsnewPasteeditComponent', () => {
  let component: IdsnewPasteeditComponent;
  let fixture: ComponentFixture<IdsnewPasteeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdsnewPasteeditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdsnewPasteeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
