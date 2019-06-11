import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import swal from'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor( public contactService: ContactoService) { }
  alerta: string= 'Mensaje enviado correctamente';
  contactForm(form: NgForm) {
    this.contactService.sendMessage(form).subscribe(() => {
    swal.fire('Formulario de contacto', this.alerta, 'success');
    });
    form.resetForm();
    }

  ngOnInit() {
  }

}
