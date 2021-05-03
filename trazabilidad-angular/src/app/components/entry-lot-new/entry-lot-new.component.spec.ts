import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLotNewComponent } from './entry-lot-new.component';

describe('EntryLotNewComponent', () => {
  let component: EntryLotNewComponent;
  let fixture: ComponentFixture<EntryLotNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryLotNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLotNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
