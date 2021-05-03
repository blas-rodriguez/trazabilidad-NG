import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLotEditComponent } from './entry-lot-edit.component';

describe('EntryLotEditComponent', () => {
  let component: EntryLotEditComponent;
  let fixture: ComponentFixture<EntryLotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryLotEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
