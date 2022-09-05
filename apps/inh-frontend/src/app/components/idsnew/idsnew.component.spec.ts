import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsnewComponent } from './idsnew.component';

describe('IdsnewComponent', () => {
  let component: IdsnewComponent;
  let fixture: ComponentFixture<IdsnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdsnewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
