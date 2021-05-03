import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDetailNewComponent } from './output-detail-new.component';

describe('OutputDetailNewComponent', () => {
  let component: OutputDetailNewComponent;
  let fixture: ComponentFixture<OutputDetailNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputDetailNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
