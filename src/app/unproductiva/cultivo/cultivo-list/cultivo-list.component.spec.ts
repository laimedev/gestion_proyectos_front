import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivoListComponent } from './cultivo-list.component';

describe('CultivoListComponent', () => {
  let component: CultivoListComponent;
  let fixture: ComponentFixture<CultivoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultivoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
