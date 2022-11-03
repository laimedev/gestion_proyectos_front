import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGraphComponent } from './reporte-graph.component';

describe('ReporteGraphComponent', () => {
  let component: ReporteGraphComponent;
  let fixture: ComponentFixture<ReporteGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
