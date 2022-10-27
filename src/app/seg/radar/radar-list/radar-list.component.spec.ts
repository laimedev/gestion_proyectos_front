import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarListComponent } from './radar-list.component';

describe('RadarListComponent', () => {
  let component: RadarListComponent;
  let fixture: ComponentFixture<RadarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
