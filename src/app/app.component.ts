import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Electrification-For-Decarbonization';

  tabSelect: string = "results";


  constructor() {

  }


  setTab(str: string) {
    this.tabSelect = str;
  }
}
