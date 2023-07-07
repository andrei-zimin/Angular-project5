import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

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
