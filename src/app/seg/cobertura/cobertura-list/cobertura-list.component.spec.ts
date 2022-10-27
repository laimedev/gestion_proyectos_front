import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaListComponent } from './cobertura-list.component';

describe('CoberturaListComponent', () => {
  let component: CoberturaListComponent;
  let fixture: ComponentFixture<CoberturaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoberturaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoberturaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
