import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersbyAdminComponent } from './add-usersby-admin.component';

describe('AddUsersbyAdminComponent', () => {
  let component: AddUsersbyAdminComponent;
  let fixture: ComponentFixture<AddUsersbyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersbyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersbyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
