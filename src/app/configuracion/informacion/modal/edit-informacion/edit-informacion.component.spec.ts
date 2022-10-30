import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformacionComponent } from './edit-informacion.component';

describe('EditInformacionComponent', () => {
  let component: EditInformacionComponent;
  let fixture: ComponentFixture<EditInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
