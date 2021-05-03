import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLotDetailComponent } from './entry-lot-detail.component';

describe('EntryLotDetailComponent', () => {
  let component: EntryLotDetailComponent;
  let fixture: ComponentFixture<EntryLotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryLotDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
