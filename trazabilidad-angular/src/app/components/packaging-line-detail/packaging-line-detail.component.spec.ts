import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingLineDetailComponent } from './packaging-line-detail.component';

describe('PackagingLineDetailComponent', () => {
  let component: PackagingLineDetailComponent;
  let fixture: ComponentFixture<PackagingLineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingLineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
