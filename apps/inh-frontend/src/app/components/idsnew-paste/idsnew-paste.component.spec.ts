import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsnewPasteComponent } from './idsnew-paste.component';

describe('IdsnewPasteComponent', () => {
  let component: IdsnewPasteComponent;
  let fixture: ComponentFixture<IdsnewPasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdsnewPasteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdsnewPasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
