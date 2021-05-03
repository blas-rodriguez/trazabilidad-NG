import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEditComponent } from './buyer-edit.component';

describe('BuyerEditComponent', () => {
  let component: BuyerEditComponent;
  let fixture: ComponentFixture<BuyerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
