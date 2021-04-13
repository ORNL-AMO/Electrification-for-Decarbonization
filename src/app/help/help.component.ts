import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {


  currentField: string;
  currentFieldSub: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.currentFieldSub = this.dataService.currentField.subscribe(val => {
      this.currentField = val;
    });
  }

  ngOnDestroy() {
    this.currentFieldSub.unsubscribe();
  }

}
