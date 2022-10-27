import { Component, OnInit } from '@angular/core';

import {Menu} from 'src/app/entities/menu'

import {MenuService} from 'src/app/services/menu/menu.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: Menu[] = [
    {
      displayName: 'Administración',
      id: 1,
      url: '',
      subMenu: [
        {displayName: 'Usuarios', url: '/admin/users', id: 2},
        {displayName: 'Perfiles', url: '/admin/roles', id: 3}
      ]
    },
    {displayName: 'Vacío', id: 4, url: ''}
  ]

  menu$: Observable<Menu[]>

  constructor(protected menuService: MenuService) { }

  ngOnInit(): void {


    // this.menuService.getMenu().subscribe((data) => {
    //   this.menu = data
    // })

    this.menuService.getMenuJSON().subscribe((data) => {
      this.menu = data
    })

  }

}
