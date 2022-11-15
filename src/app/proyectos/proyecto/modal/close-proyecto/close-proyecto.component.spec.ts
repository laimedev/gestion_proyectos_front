import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseProyectoComponent } from './close-proyecto.component';

describe('CloseProyectoComponent', () => {
  let component: CloseProyectoComponent;
  let fixture: ComponentFixture<CloseProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
