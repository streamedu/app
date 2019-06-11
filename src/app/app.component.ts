import { Component } from '@angular/core';

import { GlobalService } from './services/global.service';
import { environment } from '../environments/environment';
declare var gapi;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor( public globalService: GlobalService) {
  
  // gapi.load('client', () => {
  //   console.log('loaded client')
  
  //   gapi.client.init({
  //     apiKey: environment.firebase.apiKey,
  //     clientId: environment.credencials.client_id,
  //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/some-api'],
  //     scope: 'https://www.googleapis.com/auth/some.scope'
  //   })
  // })
}

}
