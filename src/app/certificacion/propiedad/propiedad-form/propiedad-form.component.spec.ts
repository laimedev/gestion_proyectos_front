import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadFormComponent } from './propiedad-form.component';

describe('PropiedadFormComponent', () => {
  let component: PropiedadFormComponent;
  let fixture: ComponentFixture<PropiedadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
