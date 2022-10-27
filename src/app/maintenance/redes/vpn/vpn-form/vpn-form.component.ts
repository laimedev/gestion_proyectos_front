import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpn-form',
  templateUrl: './vpn-form.component.html',
  styleUrls: ['./vpn-form.component.scss']
})
export class VpnFormComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
