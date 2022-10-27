import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadListComponent } from './propiedad-list.component';

describe('PropiedadListComponent', () => {
  let component: PropiedadListComponent;
  let fixture: ComponentFixture<PropiedadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
