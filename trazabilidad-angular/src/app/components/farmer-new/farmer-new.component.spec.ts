import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerNewComponent } from './farmer-new.component';

describe('FarmerNewComponent', () => {
  let component: FarmerNewComponent;
  let fixture: ComponentFixture<FarmerNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
