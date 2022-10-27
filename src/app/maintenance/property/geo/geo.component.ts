import { Component, OnInit, Input } from '@angular/core';

import { Map, marker, polygon, tileLayer } from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducerService } from '../../producer/services/producer.service';

import * as L from 'leaflet';
import 'leaflet-draw';



@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnInit {

  public idDetail = this.actRouter.snapshot.paramMap.get('id');

  @Input() latitude: any  = '-12.046374';
  @Input() longitude: any = '-77.0427934';
  sizeMap:  number = 18;


  @Input() lat;
  @Input() long;


  

  constructor(public router: Router,
    private prodService: ProducerService,
    public actRouter: ActivatedRoute) { }

  ngOnInit(): void {



    this.prodService.showPropiedad({"_id": this.idDetail}).subscribe(resp => {
      const prod = resp['propiedad'][0];
      console.log(prod.area_trabajo)
    })


  }


  ngAfterViewInit(): void {
    const map = new Map('map').setView([ this.latitude , this.longitude ], this.sizeMap);
    tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(map);
    const latLngs: [number, number] [] = [
      [-11.04637, -77.0427934],
      [-12.03337, -73.0427634],
      [-10.04037, -72.0427034],
      [-9.04037, -72.0427034]
    ];

    polygon(latLngs, { color: 'orange'}).addTo(map);
    
    const markerItem =  marker([this.latitude , this.longitude ]).addTo(map).bindPopup("Sede Lima Centro - Amazonas Trading SAC").openPopup();
    map.fitBounds(latLngs );



   
  }


 


  regresar(){
    this.router.navigateByUrl(`admin/property.list`);
  }









  
  


}