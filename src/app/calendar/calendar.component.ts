import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {DbService} from '../db.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() type: string;
  create = false;
  xtitle: any;
  xdates: any;
  xloading = false;
  xmessage: any;
  xdbv: any;
  xdbs: any;
  xdbc: any;
  xdb: any;
  range = [...Array(35).keys()];
  year = this.getNow().getFullYear();
  month = this.firstToUpper(this.getNow().toLocaleString('default', {month: 'long'}));
  dates = this.getMonth();
  toedit: any;
  edit: boolean;
  editTitle: any;
  editMessage: any;
  editDates: any;
  txt = '';

  constructor(private dataService: DataService, private dbService: DbService) {
  }

  ngOnInit(): void {
  }

  chk() {
    if (this.type === 'volga') {
      return this.dataService.data.volga;
    }
    if (this.type === 'sibir') {
      return this.dataService.data.sibir;
    }
    if (this.type === 'corpcenter') {
      return this.dataService.data.corpcenter;
    }
  }



  firstToUpper(a) {
    return a[0].toUpperCase() + a.substring(1);
  }

  getClassColor(dates) {
    const a = new Date().getDate();
    const b = Number(dates[0].slice(0, 2));
    console.log(a, b);
    if (a === b) {
      return 'disappeared';
    }
    if (b - a < 0) {
      return 'disappeared';
    }
    if (b - a <= 2) {
      return 'task--danger';
    }
    if (b - a <= 7) {
      return 'task--warning';
    }
    return 'task--info';
  }

  getNow() {
    return new Date();
  }

  getMonth() {
    const D1 = new Date();
    const D1last = new Date(D1.getFullYear(), D1.getMonth() + 1, 0).getDate(); // последний день месяца
    const D1Nlast = new Date(D1.getFullYear(), D1.getMonth(), D1last).getDay(); // день недели последнего дня месяца
    const D1Nfirst = new Date(D1.getFullYear(), D1.getMonth(), 1).getDay(); // день недели первого дня месяца
    let calendar1 = [];
    const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    if (D1Nfirst !== 0) {
      for (let i = 1; i < D1Nfirst; i++) {
        calendar1.push('');
      }
    } else {
      for (let i = 0; i < 6; i++) {
        calendar1.push('');
      }
    }
    for (let i = 1; i <= D1last; i++) {
      calendar1.push(i);
    }
    if (D1Nlast !== 0) {
      for (let i = D1Nlast; i < 7; i++) {
        calendar1.push('');
      }
    }
    return calendar1;
  }

  editPublish() {
    // @ts-ignore
    const d = this.editDates.split(',');
    this.editMessage = this.dataService.edit(this.type, this.editTitle, d, this.chk()[this.toedit].id);
  }

  star(i) {
    this.dataService.star(this.type, this.chk()[i].id);
  }

  show(days) {
    const date1 = new Date(days[0].slice(6, 10) + '-' + days[0].slice(3, 5) + '-' + days[0].slice(0, 2));
    const date2 = new Date();
    return date1 >= date2;
  }

  exist(days, i) {
    let index;
    let a;
    for (index = 0; index < days.length; ++index) {
      a = Number(days[index].slice(0, 2));
      if (a === i) {
        if (Number(days[index].slice(3, 5)) === this.getNow().getMonth() + 1) {
          return Number(days[index].slice(6, 10)) === this.getNow().getFullYear();
        } else {
          return false;
        }
      }
    }
    return false;
  }

  toStr(days: any) {
    return String(days);
  }
  publish() {
    const d = this.xdates.split(',');
    if (this.type === 'volga') {
      this.dbService.getPostsVolga().subscribe((data) => {
        this.xmessage = this.dataService.create(this.type, this.xtitle, d, data[0]);
        if (this.xmessage === 'Изменения опубликованы!') {
          this.xtitle = '';
          this.xdates = '';
        }
      });
    }
    if (this.type === 'sibir') {
      this.dbService.getPostssibir().subscribe((data) => {
        this.xmessage = this.dataService.create(this.type, this.xtitle, d, data[0]);
        if (this.xmessage === 'Изменения опубликованы!') {
          this.xtitle = '';
          this.xdates = '';
        }
      });
    }
    if (this.type === 'corpcenter') {
      this.dbService.getPostskc().subscribe((data) => {
        this.xmessage = this.dataService.create(this.type, this.xtitle, d, data[0]);
        if (this.xmessage === 'Изменения опубликованы!') {
          this.xtitle = '';
          this.xdates = '';
        }
      });
    }
  }

}
