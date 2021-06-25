import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNewUserComponent } from './review-new-user.component';

describe('ReviewNewUserComponent', () => {
  let component: ReviewNewUserComponent;
  let fixture: ComponentFixture<ReviewNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewNewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
