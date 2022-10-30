import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCargoComponent } from './edit-cargo.component';

describe('EditCargoComponent', () => {
  let component: EditCargoComponent;
  let fixture: ComponentFixture<EditCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
