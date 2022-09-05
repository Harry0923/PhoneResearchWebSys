import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsnewViewremoveComponent } from './idsnew-viewremove.component';

describe('IdsnewViewremoveComponent', () => {
  let component: IdsnewViewremoveComponent;
  let fixture: ComponentFixture<IdsnewViewremoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdsnewViewremoveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdsnewViewremoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
