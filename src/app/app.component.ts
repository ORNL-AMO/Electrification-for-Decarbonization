import { Component, ElementRef, HostListener, ViewChild, WritableSignal, inject  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { DataService } from './services/data.service';

// declare ga as a function to access the JS code in TS
declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  private dataService = inject(DataService);
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
  showEmissionRateInformation: WritableSignal<boolean> = this.dataService.showEmissionRateInformation;

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

  toggleEmissionRateInformation() {
    this.showEmissionRateInformation.set(!this.showEmissionRateInformation());
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
