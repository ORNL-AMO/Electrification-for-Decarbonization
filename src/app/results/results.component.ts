import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FuelEquipment, ResultsSummary } from '../models/calculationData';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  electricalEquipmentSub: Subscription;
  fuelEquipmentSub: Subscription;
  operatingHoursSub: Subscription;
  summarySub: Subscription;
  summary: ResultsSummary;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.summarySub =  this.dataService.summary.subscribe(val => {
      this.summary = val;
    })

    this.electricalEquipmentSub = this.dataService.electricalEquipment.subscribe(val => {
      if (val) {
        this.dataService.calculateResults();
      }
    });

    this.fuelEquipmentSub = this.dataService.fuelEquipment.subscribe(val => {
      if (val) {
        this.dataService.calculateResults();
      }
    });

    this.operatingHoursSub = this.dataService.operatingHours.subscribe(val => {
      if(val){
        this.dataService.calculateResults();
      }
    })
  }

  ngOnDestroy(){
    this.electricalEquipmentSub.unsubscribe();
    this.fuelEquipmentSub.unsubscribe();
    this.summarySub.unsubscribe();
  }

}
