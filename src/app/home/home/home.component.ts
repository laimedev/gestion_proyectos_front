import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmpleadoService } from 'src/app/empleados/empleado/services/empleado.service';
import { ClienteService } from 'src/app/proyectos/cliente/services/cliente.service';
import { ProyectoService } from 'src/app/proyectos/proyecto/services/proyecto.service';
import { LoginService } from 'src/app/services/security/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  today = new Date()
  user: string
  typeUser
  idPersonal

  totalNuevo = 0;
  totalProceso = 0;
  totalCerrado = 0;

  totalCliente = 0;
  totalEmpleado = 0;


    valor
  constructor(protected loginService: LoginService,
    private docTitleService: Title,
    public proyectoService: ProyectoService,
    public clienteService: ClienteService,
    public empleadoService: EmpleadoService) {
    this.user = loginService.getLogin()?.user
    this.typeUser = this.loginService.getLogin()?.role
    this.idPersonal = loginService.getLogin()?.id


   }

  ngOnInit(): void {
    this.totalProyectos();
    this.totalMisProyectos();
    this.totalEmpleados();
    this.totalClientes();

    this.docTitleService.setTitle('Inicio - ' + environment.appTitle)
  }


  
  totalProyectos(){
    this.proyectoService.getByStatus({ "estado":  'Nuevo'}).subscribe(data => {
      this.totalNuevo = data['proyecto'].length;
    })

    this.proyectoService.getByStatus({ "estado":  'En curso'}).subscribe(data => {
      this.totalProceso = data['proyecto'].length;
    })

    this.proyectoService.getByStatus({ "estado":  'Cerrado'}).subscribe(data => {
      this.totalCerrado = data['proyecto'].length;
    })
  }


  totalMisProyectos(){
    this.proyectoService.getByPersonal(0, { "responsable":  this.idPersonal})
    .subscribe(({total, proyecto}) => {
        

    })
  }


  totalClientes(){
    this.clienteService.cargarClientes().subscribe(resp => {
      this.totalCliente = resp['cliente'].length;
    })
  }

  totalEmpleados(){
    this.empleadoService.cargarEmpleados().subscribe(resp => {
      this.totalEmpleado = resp['personal'].length;
    })
  }

  // openMenu() {
    
  //   if (this.sidebarContainer.nativeElement.classList.contains('open-sidebar')) {
  //     this.sidebarContainer.nativeElement.classList.remove('open-sidebar')
  //   } else {
  //     this.sidebarContainer.nativeElement.classList.add('open-sidebar')
  //   }
  // }

}
