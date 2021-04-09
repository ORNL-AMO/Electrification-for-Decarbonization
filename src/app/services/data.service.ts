import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  operatingHours: BehaviorSubject<number>;
  constructor() { 
    this.operatingHours = new BehaviorSubject<number>(8760);
  }
}
