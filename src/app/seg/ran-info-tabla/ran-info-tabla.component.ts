import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ran-info-tabla',
  templateUrl: './ran-info-tabla.component.html',
  styleUrls: ['./ran-info-tabla.component.scss']
})
export class RanInfoTablaComponent implements OnInit {

  @Input('ds')
  dataSource
  
  @Input('cols')
  displayedColumns

  constructor() { }

  ngOnInit(): void {
    
  }

}
