import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "../data.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DbService} from '../db.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  loading = false;
  type: string;
  error: any;
  clientForm: FormGroup;
  dbv: any;
  dbs: any;
  dbc: any;
  db: any;


  constructor(
    private router: Router,
    private dataService: DataService,
    private dbService: DbService
  ) {
    this.logout();
  }

  ngOnInit(): void {
    this.dbService.getPostsVolga().subscribe((data) => {
      this.dbv = data[0];
    });
    this.dbService.getPostskc().subscribe((data) => {
      this.dbc = data[0];
    });
    this.dbService.getPostssibir().subscribe((data) => {
      this.dbs = data[0];
    });
    this.clientForm = new FormGroup({
      em: new FormControl(this.email, [
        Validators.required,
        Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
      ]),
      pw: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      sl: new FormControl(this.type, [
        Validators.required,
      ]),
    });
  }
  get em(){
    return this.clientForm.get('em');
  }

  get pw(){
    return this.clientForm.get('pw');
  }
  get sl(){
    return this.clientForm.get('sl');
  }
  logIn() {
    if (this.clientForm.valid) {
      if (this.type === 'volga' ){ this.db = this.dbv; }
      if (this.type === 'sibir' ){this.db = this.dbs; }
      if (this.type === 'corpcenter' ){ this.db = this.dbc; }
      const a = this.dataService.login( this.type, this.email, this.password, this.db );
      if (a === true) {
        localStorage.setItem('loggedUser', JSON.stringify({type: this.type, email: this.email, password: this.password}));
        this.router.navigateByUrl('/home');
      } else {
        this.error = a;
      }
    }
  }
  createAccount() {
    if (this.clientForm.valid) {
      if (this.type === 'volga' ){ this.db = this.dbv; }
      if (this.type === 'sibir' ){this.db = this.dbs; }
      if (this.type === 'corpcenter' ){ this.db = this.dbc; }
      const a = this.dataService.createaccount(this.type, this.email, this.password, this.db);
      if (a === true) {
        localStorage.setItem('loggedUser', JSON.stringify({type: this.type, email: this.email, password: this.password}));
        this.router.navigateByUrl('/home');
      } else {
        this.error = a;
      }
    }
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
