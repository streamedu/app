import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private authService: GlobalService) { }


  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }

  loginEmail(): void {

    // console.log('EL mail ', this.email);
    // console.log('EL  passw ', this.password);

    this.authService.loginEmailUser( this.email, this.password )
    .then ( ( res ) => { 
     // console.log('respueta user',res);

      // this.router.navigate(['admin/list-videos']);

      this.redirectTo();
    }).catch ( err => console.log('error es :', err.message) );
  
  }

  loginGoogle(): void {

    this.authService.loginGoogleUser().then( ( res ) => {
      console.log('respuesta user',res);

      // this.router.navigate(['admin/list-videos']);

      this.redirectTo();
    }).catch ( err => console.log('err es :',err.message) );
  }

  logout(): void {

    this.authService.logoutUser();
    // TODO Redirigir a la pagina de login
    // TODO Borrar por ejemplo local storage
  }

  redirectTo( ruta : string = 'admin/list-videos') : void {

    this.router.navigate([ruta]);
    // TODO Definir una metodo que reciba una ruta y que realice la redirecion
  }


}
