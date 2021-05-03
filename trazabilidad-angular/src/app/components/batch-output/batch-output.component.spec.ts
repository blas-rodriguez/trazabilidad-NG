import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOutputComponent } from './batch-output.component';

describe('BatchOutputComponent', () => {
  let component: BatchOutputComponent;
  let fixture: ComponentFixture<BatchOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
