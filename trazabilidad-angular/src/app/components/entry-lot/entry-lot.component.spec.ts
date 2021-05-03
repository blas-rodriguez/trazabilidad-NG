import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLotComponent } from './entry-lot.component';

describe('EntryLotComponent', () => {
  let component: EntryLotComponent;
  let fixture: ComponentFixture<EntryLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
