import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentEquipment, ElectricalEquipment } from '../models/inputData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  operatingHours: BehaviorSubject<number>;
  currentEquipment: BehaviorSubject<CurrentEquipment>;
  electricalEquipment: BehaviorSubject<ElectricalEquipment>;
  constructor() {
    this.operatingHours = new BehaviorSubject<number>(8760);
    this.currentEquipment = new BehaviorSubject<CurrentEquipment>(undefined);
    this.electricalEquipment = new BehaviorSubject<ElectricalEquipment>(undefined);
  }


}
