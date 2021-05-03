import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDetailComponent } from './buyer-detail.component';

describe('BuyerDetailComponent', () => {
  let component: BuyerDetailComponent;
  let fixture: ComponentFixture<BuyerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
