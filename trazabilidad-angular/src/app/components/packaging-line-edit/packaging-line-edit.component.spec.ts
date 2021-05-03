import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingLineEditComponent } from './packaging-line-edit.component';

describe('PackagingLineEditComponent', () => {
  let component: PackagingLineEditComponent;
  let fixture: ComponentFixture<PackagingLineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingLineEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
