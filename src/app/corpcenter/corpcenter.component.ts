import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-corpcenter',
  templateUrl: './corpcenter.component.html',
  styleUrls: ['./corpcenter.component.css']
})
export class CorpcenterComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  isAuth() {
    return this.dataService.user !== null;
  }
  logout() {
    localStorage.removeItem('loggedUser');

    this.dataService.user = null;
  }
  getSect() {
    return this.dataService.area;
  }
}
