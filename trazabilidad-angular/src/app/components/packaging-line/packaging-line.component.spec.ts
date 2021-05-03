import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingLineComponent } from './packaging-line.component';

describe('PackagingLineComponent', () => {
  let component: PackagingLineComponent;
  let fixture: ComponentFixture<PackagingLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
