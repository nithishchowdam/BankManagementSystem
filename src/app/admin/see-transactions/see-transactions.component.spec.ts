import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTransactionsComponent } from './see-transactions.component';

describe('SeeTransactionsComponent', () => {
  let component: SeeTransactionsComponent;
  let fixture: ComponentFixture<SeeTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
