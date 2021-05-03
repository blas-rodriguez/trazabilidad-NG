import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDetailEditComponent } from './output-detail-edit.component';

describe('OutputDetailEditComponent', () => {
  let component: OutputDetailEditComponent;
  let fixture: ComponentFixture<OutputDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputDetailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
