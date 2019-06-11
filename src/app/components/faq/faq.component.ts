import { Component, OnInit } from '@angular/core';
import { FaqServiceService } from '../../services/faq-service.service';
import { Pregunta } from '../../models/pregunta';
import { NgForm } from '@angular/forms';

import { AdminUserServiceService } from '../../services/admin-user-service.service';
import { UserInterface } from '../../models/user';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private faqService : FaqServiceService,
              private adminService: AdminUserServiceService,
              private appService: GlobalService ) { }

  public faqs: Pregunta [];
  public isAdmin: boolean = false;
  public isEditor = false;
  public user: UserInterface;
  public isAuthenticated: boolean = false;

  ngOnInit() {
    this.getUser();
    this.getListFaqs(); 
  }

  getListFaqs(){
    this.faqService.getAllFaqs().subscribe (faqs => {
      this.faqs = faqs;
    })
  }
  onDeleteFaq(idFaq: string){
   // console.log('Delete faq', idFaq);
    const confirmacion = confirm ('Estas seguro que desea eliminar la pregunta?');
    if (confirmacion) {
     // console.log('id faq', idFaq);
    
      this.faqService.deleteFaq(idFaq);
    } else{
     // console.log('no se elimino');
      
    }
  }

  onPreUpdateFaq(faq: Pregunta){
    //console.log('Pregunta a modificar', faq);
    this.faqService.selectedFaq = Object.assign({}, faq);
  }
  getUser(){

    this.appService.isAuth().subscribe ( auth =>{
      if ( auth ) {
        //console.log('user logueado ', auth);
        this.isAuthenticated = true;
        const idUser = auth.uid;
        this.adminService.getOneUser(idUser).subscribe(user =>{
         // console.log('ususario recibido',user);
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

}
