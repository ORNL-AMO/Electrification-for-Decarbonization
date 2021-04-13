import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }


  resetData() {
    this.dataService.setDefaultData();
  }

  generateExample() {
    this.dataService.setExampleData();
  }


}
