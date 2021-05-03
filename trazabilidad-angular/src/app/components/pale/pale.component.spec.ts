import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaleComponent } from './pale.component';

describe('PaleComponent', () => {
  let component: PaleComponent;
  let fixture: ComponentFixture<PaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
