import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {DbService} from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dbv: any;
  dbs: any;
  dbc: any;
  db: any;
  constructor(private dataService: DataService, private dbService: DbService) {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (localStorage.getItem('loggedUser') !== null) {
      this.dbService.getPostsVolga().subscribe((data) => {
        this.dbv = data[0];
        if ( user.type === 'volga' ){
            this.login_log(this.dbv);
          }
        });
      this.dbService.getPostskc().subscribe((data) => {
        this.dbc = data[0];
        if (user.type === 'corpcenter'){
          this.login_log(this.dbc);
        }
      });
      this.dbService.getPostssibir().subscribe((data) => {
        this.dbs = data[0];
        if (user.type === 'sibir' ) {
          this.login_log(this.dbs);
        }
      });
    }
  }
  ngOnInit() {
  }

  login_log(db) {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const email = user.email;
    const password = user.password;
    const type = user.type;
    this.dataService.login(type, email, password, db);
  }
  getDate() {
    const date = new Date(Date.now()).getDate();
    const month = new Date(Date.now()).getMonth() + 1;
    const year = new Date(Date.now()).getFullYear();
    return String(date) + '/' + String(month) + '/' + String(year);
  }
}
