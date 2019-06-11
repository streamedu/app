import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminUserServiceService } from '../../services/admin-user-service.service';
import { UserInterface } from '../../models/user';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor( public adminUser: AdminUserServiceService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  ngOnInit() {
  }

  onSaveUser(formUser: NgForm): void{
  
      //console.log('formUser.value.id',formUser.value.id);
      //console.log('formUser.value',formUser.value);
    // To add  new
  
      // this.adminUser.addUser(userForm.value);
  
      // Update
  
      this.adminUser.updateUser(formUser.value);
      formUser.resetForm();
      this.btnClose.nativeElement.click();
  }

}
