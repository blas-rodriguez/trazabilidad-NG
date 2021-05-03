import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOutputNewComponent } from './batch-output-new.component';

describe('BatchOutputNewComponent', () => {
  let component: BatchOutputNewComponent;
  let fixture: ComponentFixture<BatchOutputNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchOutputNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOutputNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
