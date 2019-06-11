import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../services/global.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from './../../../models/user';
import { VideoInterface } from '../../../models/video';
import { AdminUserServiceService } from 'src/app/services/admin-user-service.service';



declare var $:any;


@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  videos: VideoInterface[] = [];
  videoSel: any;
  // public isAdmin: any = null;
  public userUid: string = null;

  public isAuthenticated: boolean = false;
  public isAdmin: boolean = false;
  public isEditor = false;
  public user: UserInterface;



  constructor( public appService: GlobalService,
               private router: Router,
               private adminService : AdminUserServiceService ) { 
    
    
    this.appService.getVideos()
    .subscribe( videos => this.videos = videos );
      // console.log('Los videos recibidos son : ', videos);
  }
  ngOnInit() {
    this.getUser();
  }
  getUser(){
    this.appService.isAuth().subscribe ( auth =>{
      if ( auth ) {
       // console.log('user logueado ', auth);
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
  
  
  moreVideos() { this.appService.getVideos().subscribe ( videos => this.videos.push.apply(this.videos, videos) ); }

  // Funcion para ver el video
  verVideo(video:any){ return this.videoSel = video; }
   // console.log('El video recibido es :', video);

  // Funcion para editar el video
  editVideo(video:any){ return this.videoSel = video;  }
   // console.log('El video recibido es :', video);     
}
