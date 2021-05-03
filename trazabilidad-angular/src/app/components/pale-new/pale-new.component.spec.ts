import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaleNewComponent } from './pale-new.component';

describe('PaleNewComponent', () => {
  let component: PaleNewComponent;
  let fixture: ComponentFixture<PaleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaleNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
