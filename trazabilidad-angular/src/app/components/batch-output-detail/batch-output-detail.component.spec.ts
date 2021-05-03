import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOutputDetailComponent } from './batch-output-detail.component';

describe('BatchOutputDetailComponent', () => {
  let component: BatchOutputDetailComponent;
  let fixture: ComponentFixture<BatchOutputDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchOutputDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOutputDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
