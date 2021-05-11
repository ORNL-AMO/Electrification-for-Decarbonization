import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  constructor() {

  }

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
