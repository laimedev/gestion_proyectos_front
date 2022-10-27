import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdModalEditComponent } from './threshold-modal-edit.component';

describe('ThresholdModalEditComponent', () => {
  let component: ThresholdModalEditComponent;
  let fixture: ComponentFixture<ThresholdModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdModalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
