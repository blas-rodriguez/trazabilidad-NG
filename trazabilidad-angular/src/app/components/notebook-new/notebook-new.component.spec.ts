import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookNewComponent } from './notebook-new.component';

describe('NotebookNewComponent', () => {
  let component: NotebookNewComponent;
  let fixture: ComponentFixture<NotebookNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebookNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
