import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-sibir',
  templateUrl: './sibir.component.html',
  styleUrls: ['./sibir.component.css']
})
export class SibirComponent implements OnInit {

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
