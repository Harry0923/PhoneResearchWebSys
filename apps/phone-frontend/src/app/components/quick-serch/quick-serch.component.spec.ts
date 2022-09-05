import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSerchComponent } from './quick-serch.component';

describe('QuickSerchComponent', () => {
  let component: QuickSerchComponent;
  let fixture: ComponentFixture<QuickSerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickSerchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
