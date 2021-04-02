import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnergyEquivalencyService } from '../services/energy-equivalency.service';

@Component({
  selector: 'app-energy-equivalency-help',
  templateUrl: './energy-equivalency-help.component.html',
  styleUrls: ['./energy-equivalency-help.component.css']
})
export class EnergyEquivalencyHelpComponent implements OnInit {

  currentFieldSub: Subscription;
  currentField: string;
  constructor(private energyEquivalencyService: EnergyEquivalencyService) { }

  ngOnInit() {
    this.currentFieldSub = this.energyEquivalencyService.currentField.subscribe(val => {
      this.currentField = val;
    });
  }

  ngOnDestroy() {
    this.currentFieldSub.unsubscribe();
  }

}
