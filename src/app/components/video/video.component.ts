import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


import { GlobalService } from '../../services/global.service';
// TODO Usar la Interface de Mensaje
import { Mensaje } from '../../models/mensaje';

import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {

  mensaje: string = '';
  enlemento: any;
  public chats: Observable<any[]>;

  // videos: any[] = [];
  videoId:string ;
  mensajesRecibidos : any;
  
  constructor( public db: AngularFirestore,
               public appService: GlobalService, 
               private route: ActivatedRoute){
    this.chats = db.collection('chats').valueChanges();

   this.mensajesRecibidos  = this.appService.cargarMensajes()
        .subscribe( () => {
          setTimeout ( () =>  {
            // TODO Arreglar el scroll
            this.enlemento.scrollTop = this.enlemento.scrollHeight;
          },100);
        } );
  }

  ngOnInit() {
    this.enlemento = document.getElementById('app-mensajes');
    this.videoId = this.route.snapshot.params['videoSel'];
   // console.log('el videoId es : ', this.videoId);
  }

  enviar_mensaje() {
    
   console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }
     // Si tengo algo 
     this.appService.agregarMensaje( this.mensaje , this.videoId ) 
     // Si se envia corectamente eliminamos el texto
               .then( () => this.mensaje = '')
     // Si no se imprime el error
               .catch( (error) => console.error('No se envio el mensaje', error));
 
     this.mensaje = '';
   }
}
