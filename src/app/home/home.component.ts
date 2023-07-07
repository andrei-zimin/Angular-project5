import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
