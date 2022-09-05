import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryModifyComponent } from './directory-modify.component';

describe('DirectoryModifyComponent', () => {
  let component: DirectoryModifyComponent;
  let fixture: ComponentFixture<DirectoryModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryModifyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectoryModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
