import { Component, OnInit, ElementRef,ViewChild , OnChanges} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';

import { UserInterface } from '../../../models/user';


// Recuperar url imagen
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private storage: AngularFireStorage,
               private authService: GlobalService,
               private router: Router ) { }

  // Recoge del imput la url que se me devuelve cuando la imagen se ha subido
  @ViewChild('imageUser') inputImageUser: ElementRef;
  // @ViewChild('nameUser') inputNameUser: ElementRef;


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  user: UserInterface = {
    // editor: false,
    // admin: false,
    name: '',
    email: '',
    photoUrl: '',
  }

  public providerId: string = 'null';

  ngOnInit() {
    this.authService.isAuth().subscribe( user => {
      if(user) {
        this.user.name = user.displayName;
        if ( !user.displayName ){
          this.user.name = user.providerData[0].displayName;
        }
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
       // console.log('El usuario es ', user.photoURL);
        this.providerId = user.providerData[0].providerId;
      //  console.log('El providerId es ', this.providerId);

      }
    })
  }

  uploadImage(event){
    // console.log('subir', event.target.files[0]);
  
    // Generamos nombre unico (aleatorio) para evitar que existan diferentes imagenes con el mismo nombre
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // Recupero el porcentaje subido
    this.uploadPercent = task.percentageChanges();
    // Recupero la url del fichero subido
    task.snapshotChanges().pipe( finalize ( () => this.urlImage = ref.getDownloadURL())).subscribe();
    // TODO recoger urlImage y comparar con la de on init. Si hay cambio actualizarlo.
    // https://angular.io/guide/lifecycle-hooks#onchanges
    // https://victorroblesweb.es/2017/08/12/hooks-de-angular-4/
  }

  updateProfile(){
    this.authService.isAuth().subscribe ( user => {
      if(user){
       // console.log('user actual',user);
        user.updateProfile({
          displayName: '',
          photoURL: this.inputImageUser.nativeElement.value
        }).then ( () => { 
          // console.log('User updated', user );
          this.router.navigate(['user/profile']);
        }).catch( (error) => console.log('El error es ', error.message));

      }
    })
  }
  ngDoCheck(){

  }





}
