// Chat service

import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mensaje } from '../models/mensaje';

// Auth Service 

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from './../models/user';



// YouTube Service

import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUserServiceService } from './admin-user-service.service';


@Injectable({
    providedIn: 'root'
  })


  export class GlobalService implements OnInit {
    
    ngOnInit()  {
    }

    private itemsCollection: AngularFirestoreCollection<Mensaje>;       // ChatService
    public chats: Mensaje[] =  [];                                      // ChatService

    public usuario: any = {};                                           // Auth Service 

    private apiKey: string = '';                                        // YouTube Service
    private urlYoutube: string = '';                                    // YouTube Service
    private playList: string ='';                                       // YouTube Service
    private nextPageToken: string = '';                                 // YouTube Service

    private paramsGetVideos = new HttpParams();                                    // YouTube Service
    private paramsGetVideo = new HttpParams();                                    // YouTube Service


    constructor(
        public afs: AngularFirestore,                                   // ChatService 
        public afsAuth: AngularFireAuth,                                // Auth Service 
        public http: HttpClient,                                         // YouTube Service  
        public adminService: AdminUserServiceService
        ) {

      this.apiKey = environment.youtube.key;                          // YouTube Service
      this.urlYoutube = environment.youtube.url;                      // YouTube Service
      this.playList = environment.youtube.playList;                   // YouTube Service
      

      // Me subscribo al observable de firebase auth para recibir cualquier cambio en el estado de la authentificacion 
      // Recibo un user
      this.afsAuth.authState.subscribe( user => {
        //console.log(user);
        
        // Si no existe el usuario haz un return para no romper la app
        if (! user ){
          return;
        }
        // Si existe el usuario voy llendo el objeto usuario
        if ( user.displayName ) {
            //console.log('El nombre es :' , user.displayName);
            
          this.usuario.nombre = user.displayName;
        } else {
          this.usuario.nombre = user.providerData[0].displayName;

        }
        this.usuario.uid = user.uid;
      })
    } // Constructor 

  // Metodo que me carga los mensajes
  cargarMensajes(){                                                    // ChatService

    // Recibo la colecion de chats de Firebase
        this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref. orderBy('fecha','desc'));
    // Si es subscribe es un observable al que me subscribo en otro lugar
        return this.itemsCollection.valueChanges()
                        .pipe(map( ( mensajes: Mensaje[] ) => {
                           // console.log( ' Mensajes desde appService : ' , mensajes);
                            this.chats = mensajes;

                            // Vacio la ventana de chats
                            this.chats = [];
                            for ( let mensaje of mensajes ) {
                              // vuelvo a crear el arreglo de chats en orden inverso
                              this.chats.unshift(mensaje);
                            }
                             return this.chats;
                          }));
    } // cargarMensajes()

  // Metodo que anade un mensaje al chat
  agregarMensaje( texto: string, video: string) { // ChatService

        // TODO Añadir el videoId 
        let mensaje: Mensaje = {
            nombre : this.usuario.nombre,
            mensaje: texto,
            fecha: new Date().getTime(),
            uid: this.usuario.uid,
            videoId  : video
        }

        // Add mensaje a firebase y me devuelve un then y un catch
        return this.itemsCollection.add( mensaje );
    } // agregarMensaje( texto: string, video: string)

  // Metodo que registra un nuevo usuario con email y pass
  // TODO => Hecho : Añadir nombre en el momento en que se registra el usuario
  // Igual que en el upload photo
  registerUser(email: string, pass: string,  name?: string){          // Auth Service 
    return new Promise ( (resolve , reject )  => {
      this.afsAuth.auth.createUserWithEmailAndPassword( email, pass )
        .then ( userData => {
          resolve ( userData ),
          this.updateUserData(userData.user)
        }).catch(err => console.log(  reject (err)))
    } )
  } // registerUser(email: string, pass: string,  name?: string)

  // Metodo que incia session a los  usuarios con email y pass directamente creados.
  loginEmailUser( email: string, password: string) {                  // Auth Service 
      return new Promise (( resolve, reject ) => {
        this.afsAuth.auth.signInWithEmailAndPassword(email, password)
        .then( userData => resolve(userData),
        err => reject(err))
      })  
  } // loginEmailUser( email: string, password: string)

  // Metodo que incia session mediante la authenticacion con Google
  loginGoogleUser() {                                                   // Auth Service 

    return this.afsAuth.auth.signInWithPopup( new auth.GoogleAuthProvider())
              .then (  credentials  => {
                let checkUser = credentials.user.uid;
                let exist = this.adminService.getOneUser(checkUser);
                if (!exist) {
                this.updateUserData(credentials.user);
              }
              })
  } //loginGoogleUser()

  // Metodo que finaliza la session del usuario
  logoutUser(){                                                       // Auth Service 
    this.usuario= {};  
    return this.afsAuth.auth.signOut();
  } // logoutUser()

  // Metodo que comprueba si el usuario esta autentificado en nuestra aplicacion
  isAuth(){                                                             // Auth Service 
    return this.afsAuth.authState.pipe( map ( auth => auth ) );
  } // isAuth()

 // TODO Crear un metodo que solo el Admin pueda modificar los permisos de los usuarios
  private updateUserData(userRecibido) {           
                                  // Auth Service
    //console.log('updateUserData cuando se crea el usuario', userRecibido.uid);
    //console.log('updateUserData cuando se crea el usuario', userRecibido);
    //console.log('updateUserData tipo de user que recibo se crea el usuario', typeof(userRecibido));
    //console.log('updateUserData tipo de user que recibo se crea el usuario ' + userRecibido.displayName + ' y el otro display name es: ' + userRecibido.providerData[0].displayName);


    // Definimos una constante que contendra el doc de firestrore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userRecibido.uid}`);
    const data: UserInterface = {
      id: userRecibido.uid,
      name: userRecibido.displayName,
      email: userRecibido.email,
      roles : {
        editor: false,
        admin: false
      }
      // editor: false,
      // admin: false
    }
    return userRef.set( data , { merge: true} )
    
  } // updateUserData(user)

  // Metodo que comprueba si el usuario es administrador
  // TODO -> Extrapolar a diferentes usuarios
  isUserAdmin(userUid){
      return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
    } // isUserAdmin(userUid)
  
  
  // Metodo que me devuelve todos los videos de un canal de youtube
  getVideos()  {                                                        // YouTube Service

    this.paramsGetVideos = this.paramsGetVideos.set('part', 'snippet');
    this.paramsGetVideos = this.paramsGetVideos.set('maxResults', '1');
    this.paramsGetVideos = this.paramsGetVideos.set('playlistId', this.playList);
    this.paramsGetVideos = this.paramsGetVideos.set('key', this.apiKey);
    
    if (this.nextPageToken) {

      // TODO Comprobar el nextPageToken 
      // Asegurar que no se cargan los video de forma repetida
      this.paramsGetVideos = this.paramsGetVideos.set('pageToken',this.nextPageToken );
    } 
    else {
      this.paramsGetVideos = this.paramsGetVideos.set('pageToken', '' );

    }

    return this.http.get(`${ this.urlYoutube }/playlistItems` , {params: this.paramsGetVideos})
    // TODO Definir una Interface para el "data" que recibo.
            .pipe( map( (data: any) => {
              //console.log(data);
              this.nextPageToken = data.nextPageToken;
              // console.log('el token es ', this.nextPageToken);

              let videos: any[] = [];

              for (let video of data.items){
                let snippet = video.snippet;
                videos.push(snippet);
              }
              return videos; 
    })
    )
  } // getVideos() 

  getVideo (video) {

   // console.log('el video recibido es :', video);
    

    this.paramsGetVideo = this.paramsGetVideo.set('part', 'snippet');
    this.paramsGetVideo = this.paramsGetVideo.set('id', video );
    this.paramsGetVideo = this.paramsGetVideo.set('key', this.apiKey);


    return this.http.get(`${ this.urlYoutube }/videos` , {params: this.paramsGetVideo})
    // TODO Definir una Interface para el "data" que recibo.
            .pipe( map( (data: any) => {
             // console.log(data);
              //this.nextPageToken = data.nextPageToken;
              // console.log('el token es ', this.nextPageToken);

              let snippet = data.items[0].snippet;
             // console.log('snippet',snippet);
              
              return snippet; 


  })
  )
}

  addVideo( ){                                                       // YouTube Service 
    
    

  } // addVideo()

  updateVideo(){                                                       // YouTube Service 
    
    
  } // updateVideo()

  deleteVideo(id): Observable<any>{                                                       // YouTube Service 
    return 
    
  } // deleteVideo()
    

    
  }
