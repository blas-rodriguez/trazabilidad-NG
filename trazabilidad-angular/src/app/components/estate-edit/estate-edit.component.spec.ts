import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateEditComponent } from './estate-edit.component';

describe('EstateEditComponent', () => {
  let component: EstateEditComponent;
  let fixture: ComponentFixture<EstateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
