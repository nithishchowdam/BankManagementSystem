import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassWordComponent } from './change-pass-word.component';

describe('ChangePassWordComponent', () => {
  let component: ChangePassWordComponent;
  let fixture: ComponentFixture<ChangePassWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePassWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
