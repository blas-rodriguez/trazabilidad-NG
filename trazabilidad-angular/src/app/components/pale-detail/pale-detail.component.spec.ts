import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaleDetailComponent } from './pale-detail.component';

describe('PaleDetailComponent', () => {
  let component: PaleDetailComponent;
  let fixture: ComponentFixture<PaleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
