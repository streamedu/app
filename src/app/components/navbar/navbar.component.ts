import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GlobalService } from '../../services/global.service';
import { AdminUserServiceService } from '../../services/admin-user-service.service';
import { UserInterface } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // 
  constructor( private authService: GlobalService,
               private afsAuth: AngularFireAuth,
               private adminService : AdminUserServiceService) { }

  public isAuthenticated: boolean = false;
  public isAdmin: boolean = false;
  public isEditor = false;
  public user: UserInterface;

  ngOnInit() {
    // Cuando carga el componeto pregunto si esta logueado
    this.getUser();
  }

  getUser(){
    this.authService.isAuth().subscribe ( auth =>{
      if ( auth ) {
        //console.log('user logueado ', auth);
        this.isAuthenticated = true;
        const idUser = auth.uid;
        this.adminService.getOneUser(idUser).subscribe(user =>{
          //console.log('ususario recibido',user);
          if (user.roles.admin){
            this.isAdmin = true;
          }
          if (user.roles.editor){
            this.isEditor = true;
          }
        });
      } else {
        // console.log('user NO logueado ');
        this.isAuthenticated = false;
      }
    } )
  }

  logout(){
    this.afsAuth.auth.signOut();
  }

}
