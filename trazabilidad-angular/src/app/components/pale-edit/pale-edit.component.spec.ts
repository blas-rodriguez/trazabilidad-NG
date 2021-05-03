import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaleEditComponent } from './pale-edit.component';

describe('PaleEditComponent', () => {
  let component: PaleEditComponent;
  let fixture: ComponentFixture<PaleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
