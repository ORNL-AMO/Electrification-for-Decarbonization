import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { EnergyEquivalencyService } from './energy-equivalency.service';
import { FormGroup } from '@angular/forms';
import { EnergyEquivalencyElectric, EnergyEquivalencyElectricOutput, EnergyEquivalencyFuel, EnergyEquivalencyFuelOutput } from '../models/energyEquivalency';

@Component({
  selector: 'app-energy-equivalency',
  templateUrl: './energy-equivalency.component.html',
  styleUrls: ['./energy-equivalency.component.css']
})
export class EnergyEquivalencyComponent implements OnInit {
  @ViewChild('leftPanelHeader', { static: false }) leftPanelHeader: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeTabs();
  }

  headerHeight: number;

  tabSelect: string = 'results';
  constructor(private energyEquivalencyService: EnergyEquivalencyService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resizeTabs();
    }, 100);
  }

  resetData() {
    let electricData: EnergyEquivalencyElectric = this.energyEquivalencyService.getDefaultElectricData();
    this.energyEquivalencyService.electricData.next(electricData);
    let fuelData: EnergyEquivalencyFuel = this.energyEquivalencyService.getDefaultFuelData();
    this.energyEquivalencyService.fuelData.next(fuelData);
  }

  generateExample() {
    let electricData: EnergyEquivalencyElectric = this.energyEquivalencyService.getExampleElectricData();
    this.energyEquivalencyService.electricData.next(electricData);
    let fuelData: EnergyEquivalencyFuel = this.energyEquivalencyService.getExampleFuelData();
    this.energyEquivalencyService.fuelData.next(fuelData);
  }

  resizeTabs() {
    if (this.leftPanelHeader) {
      this.headerHeight = this.leftPanelHeader.nativeElement.clientHeight;
    }
  }

  setTab(str: string) {
    this.tabSelect = str;
  }
}
