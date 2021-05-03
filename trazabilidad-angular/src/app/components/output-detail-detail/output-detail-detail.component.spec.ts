import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDetailDetailComponent } from './output-detail-detail.component';

describe('OutputDetailDetailComponent', () => {
  let component: OutputDetailDetailComponent;
  let fixture: ComponentFixture<OutputDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputDetailDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
