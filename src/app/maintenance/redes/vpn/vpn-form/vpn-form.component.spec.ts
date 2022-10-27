import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnFormComponent } from './vpn-form.component';

describe('VpnFormComponent', () => {
  let component: VpnFormComponent;
  let fixture: ComponentFixture<VpnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
