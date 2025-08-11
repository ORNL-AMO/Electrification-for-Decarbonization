import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 

// declare ga as a function to access the JS code in TS
declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'Electrification-For-Decarbonization';

  tabSelect: string = "results";
  @ViewChild('bannerElement', { static: false }) bannerElement: ElementRef;
  @ViewChild('contentContainer', { static: false }) contentContainer: ElementRef;
  containerHeight: number;
  formHeight: number;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.resizeTabs();
  }
  headerHeight: number;

  constructor(public router: Router){   
    this.router.events.subscribe(event => {
       if(event instanceof NavigationEnd){
           gtag('config', 'G-YNYS5F66B1', 
                 {
                   'page_path': event.urlAfterRedirects
                 }
                );
        }
     }
  )}

  ngOnInit() {
    setTimeout(() => {
      this.resizeTabs();
    }, 10);
  }


  setTab(str: string) {
    this.tabSelect = str;
  }

  resizeTabs() {
    if (this.contentContainer) {
      this.containerHeight = this.contentContainer.nativeElement.offsetHeight - this.bannerElement.nativeElement.offsetHeight;
    }
  }
}
