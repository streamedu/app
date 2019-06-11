import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FaqServiceService } from '../../services/faq-service.service';
import { Pregunta } from '../../models/pregunta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-faq',
  templateUrl: './modal-faq.component.html',
  styleUrls: ['./modal-faq.component.css']
})
export class ModalFAQComponent implements OnInit {

  constructor( public adminFaq: FaqServiceService) { }

  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit() {
  }


  onSaveFaq(formFaq: NgForm): void{
  
    //console.log('formUser.value.id',formUser.value.id);
    //console.log('formUser.value',formUser.value);
    if(formFaq.value.id == null){
    // add  new
    this.adminFaq.addFaq(formFaq.value);
    }else {
      // Update
    this.adminFaq.updateFaq(formFaq.value);
    }
    formFaq.resetForm();
  this.btnClose.nativeElement.click();
  }
  onCloseFaq(formFaq: NgForm): void {
    formFaq.resetForm();
  }
}
