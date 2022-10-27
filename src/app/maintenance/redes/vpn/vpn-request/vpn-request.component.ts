import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProducerService } from 'src/app/maintenance/producer/services/producer.service';

@Component({
  selector: 'app-vpn-request',
  templateUrl: './vpn-request.component.html',
  styleUrls: ['./vpn-request.component.scss']
})
export class VpnRequestComponent implements OnInit {

  listVPN: any [] = [];
  displayedColumns: string[] = ['request','customer', 'project', 'requested', 'responsabledas', 'assigment', 'execution', 'stateofre' ,'options'];
  dataSource = new MatTableDataSource(this.listVPN);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(public prodService: ProducerService,
              public router: Router) { }

  ngOnInit(): void {
    this.prodService.getAllVPN().subscribe(resp => {
      console.log(resp);
      this.dataSource = resp;
    })
  }



  irForm(){
    this.router.navigateByUrl(`admin/vpn.form`);
  }

}
