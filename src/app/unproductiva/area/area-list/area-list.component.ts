import { Component, OnInit } from '@angular/core';
import { AreaService } from '../services/area.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {

  public data: any = [];


  constructor(public areaServices: AreaService) { }

  ngOnInit(): void {
    this.areaServices.getAreas().subscribe((data) => {
      this.data = data
      console.log(data);
    })
  }

}



