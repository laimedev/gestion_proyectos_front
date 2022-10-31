import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisProyectosListComponent } from './mis-proyectos-list.component';

describe('MisProyectosListComponent', () => {
  let component: MisProyectosListComponent;
  let fixture: ComponentFixture<MisProyectosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisProyectosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisProyectosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
