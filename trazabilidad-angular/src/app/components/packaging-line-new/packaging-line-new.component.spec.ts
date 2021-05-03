import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingLineNewComponent } from './packaging-line-new.component';

describe('PackagingLineNewComponent', () => {
  let component: PackagingLineNewComponent;
  let fixture: ComponentFixture<PackagingLineNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingLineNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingLineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
