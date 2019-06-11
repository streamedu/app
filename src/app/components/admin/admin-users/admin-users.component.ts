import { Component, OnInit } from '@angular/core';
import { AdminUserServiceService } from '../../../services/admin-user-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from './../../../models/user';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(public adminUser: AdminUserServiceService, 
              private route: ActivatedRoute) {                  
  }

  public users: UserInterface[];

  
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(){
    this.adminUser.getAllUsers().subscribe (users => {
      //console.log('USUARIOS:', users);
      this.users = users;
      
    })
  }

  onDeleteUser(idUser: string){
    //console.log('Delete user', idUser);
    const confirmacion = confirm ('Estas seguro que desea eliminar el usuario?');
    if (confirmacion) {
      this.adminUser.deleteUser(idUser);
    }
  }

  onPreUpdateUser(user: UserInterface){
    //console.log('Usuario a modificar', user);
    this.adminUser.selectedUser = Object.assign({}, user);
  }

}
