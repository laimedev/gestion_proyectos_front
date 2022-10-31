import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/security/login.service'
import { UserLogin } from 'src/app/entities/security/user-login'
import { SessionStorageService } from 'src/app/services/session-storage.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { InformacionService } from 'src/app/configuracion/informacion/services/informacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new UserLogin()
  invalidUser = false
  disableButton = false;
  returnUrl: string

  typeLogin =  "Administrador"

  public informacion = JSON.parse(localStorage.getItem('informacion'))

  constructor(protected loginService: LoginService, 
    protected sessionStorage: SessionStorageService, 
    private route: ActivatedRoute,
    private router: Router,
    private docTitleService: Title,
    public configService: InformacionService) { }


  ngOnInit(): void {

    this.configService.cargarConfiguracion().subscribe(resp => {
      console.log(resp.configuracion[0])
      this.informacion = resp.configuracion[0];
      localStorage.setItem('informacion', JSON.stringify(resp.configuracion[0]))
    })


    this.docTitleService.setTitle('Iniciar Sesión - ' + environment.appTitle)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.login.email = 'latamcodev@gmail.com';
    this.login.password = '123456';
  }

  submit() {
    this.disableButton = true

    if(this.typeLogin === 'Administrador') {
      // console.log('admin')
      this.loginService.login(this.login).subscribe(e => {
      console.log(e)
        localStorage.setItem('token', e.token)
        this.sessionStorage.setSession(e)
        this.router.navigate([this.returnUrl]);
        this.disableButton = false
      }, (e: HttpErrorResponse) => {
        this.invalidUser = true
        this.disableButton = false
      })
    } else {
      // console.log('personal')
      this.loginService.loginPersonal(this.login).subscribe(e => {
        console.log(e)
          this.sessionStorage.setSession(e)
          this.router.navigate([this.returnUrl]);
          this.disableButton = false
        }, (e: HttpErrorResponse) => {
          this.invalidUser = true
          this.disableButton = false
        })
    }

    





  }


  onChange($event){
    console.log($event.target.value)
    this.typeLogin = $event.target.value;
  }

}
