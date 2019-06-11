import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-details-video',
  templateUrl: './details-video.component.html',
  styleUrls: ['./details-video.component.css']
})
export class DetailsVideoComponent implements OnInit {

  videoId:string ;
  video: any[] = [];

  constructor( public appService: GlobalService, 
               private route: ActivatedRoute ) 
    {
      this.videoId = this.route.snapshot.params['id'];
      this.appService.getVideo(this.videoId)
      .subscribe( snippet => {
       // console.log('snipet in details',snippet);
        this.video = snippet;
        // console.log('Los videos recibidos son : ', this.video);
      })
      }
  ngOnInit() {}
}
