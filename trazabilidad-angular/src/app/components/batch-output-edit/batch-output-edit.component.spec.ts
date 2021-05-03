import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOutputEditComponent } from './batch-output-edit.component';

describe('BatchOutputEditComponent', () => {
  let component: BatchOutputEditComponent;
  let fixture: ComponentFixture<BatchOutputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchOutputEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOutputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
