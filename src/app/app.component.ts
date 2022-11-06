import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qbittorrent-material-webui';
  dark=false;

  public toggle(){
    this.dark=!this.dark;
    console.log("changed to ",this.dark);
  }
}
