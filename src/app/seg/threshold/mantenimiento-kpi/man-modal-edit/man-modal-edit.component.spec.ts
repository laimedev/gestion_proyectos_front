import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManModalEditComponent } from './man-modal-edit.component';

describe('ManModalEditComponent', () => {
  let component: ManModalEditComponent;
  let fixture: ComponentFixture<ManModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManModalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
