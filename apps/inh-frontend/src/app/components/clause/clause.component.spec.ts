import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseComponent } from './clause.component';

describe('ClauseComponent', () => {
  let component: ClauseComponent;
  let fixture: ComponentFixture<ClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClauseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
