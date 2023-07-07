import {Injectable} from '@angular/core';
import {DbService} from './db.service';

// @ts-ignore

@Injectable({
  providedIn: 'root'
})

export class DataService {
  user = null;
  area = null;
  db: any;
  num: any;
  numE: any;
  numId: any;
  userData: any;
  eventData: any;
  useremail: any;
  editImp: any;
  editTitle: any;
  editDates: any;
  data = {
    volga: [],
    sibir: [],
    corpcenter: [],
  };

  constructor(private dbService: DbService) {
    dbService.getPostsVolga().subscribe(value => {
      this.data.volga = this.sortData(value[0].events);
    });
    dbService.getPostssibir().subscribe(value => {
      this.data.sibir = this.sortData(value[0].events);
    });
    dbService.getPostskc().subscribe(value => {
      this.data.corpcenter = this.sortData(value[0].events);
    });
  }

  edit(type: string, editTitle: any, editDates: any, idx) {
    if (this.validatedate(editDates)) {
      let index;
      switch (type) {
        case 'volga':
          this.dbService.getPostsVolga().subscribe((data) => {
              this.db = data[0];
              for (index = 0; index < this.db.events.length; ++index) {
                if (this.db.events[index].id === idx) {
                  this.db.events[index].name = editTitle;
                  this.db.events[index].days = editDates;
                  // tslint:disable-next-line:no-shadowed-variable
                  this.dbService.updatePostVolga(this.db).subscribe((data2) => {
                      this.data.volga = this.sortData(this.db.events);
                    },
                    (error) => {
                      console.error('error');
                    }
                  );
                }
              }
            },
            (error) => {
              console.error('error');
            });
          break;
        case 'sibir':
          this.dbService.getPostssibir().subscribe((data) => {
              this.db = data[0];
              for (index = 0; index < this.db.events.length; ++index) {
                if (this.db.events[index].id === idx) {
                  this.db.events[index].name = editTitle;
                  this.db.events[index].days = editDates;
                  // tslint:disable-next-line:no-shadowed-variable
                  this.dbService.updatePostsibir(this.db).subscribe((data2) => {
                      this.data.sibir = this.sortData(this.db.events);
                    },
                    (error) => {
                      console.error('error');
                    }
                  );
                }
              }
            },
            (error) => {
              console.error('error');
            });
          break;
        case 'corpcenter':
          this.dbService.getPostskc().subscribe((data) => {
              this.db = data[0];
              for (index = 0; index < this.db.events.length; ++index) {
                if (this.db.events[index].id === idx) {
                  this.db.events[index].name = editTitle;
                  this.db.events[index].days = editDates;
                  // tslint:disable-next-line:no-shadowed-variable
                  this.dbService.updatePostkc(this.db).subscribe((data2) => {
                      this.data.corpcenter = this.sortData(this.db.events);
                    },
                    (error) => {
                      console.error('error');
                    }
                  );
                }
              }
            },
            (error) => {
              console.error('error');
            });
          break;
        default:
          return null;
      }
      return 'Изменения опубликованы!';
    } else {
      return 'Введите дату правильно';
    }
  }

  star(type: string, idx) {
    let index;
    switch (type) {
      case 'volga':
        this.dbService.getPostsVolga().subscribe((data) => {
            this.db = data[0];
            for (index = 0; index < this.db.events.length; ++index) {
              if (this.db.events[index].id === idx) {
                this.db.events[index].imp = !this.db.events[index].imp;
                // tslint:disable-next-line:no-shadowed-variable
                this.dbService.updatePostVolga(this.db).subscribe((data2) => {
                    this.data.volga = this.sortData(this.db.events);
                  },
                  (error) => {
                    console.error('error');
                  }
                );
              }
            }
          },
          (error) => {
            console.error('error');
          });
        break;
      case 'sibir':
        this.dbService.getPostssibir().subscribe((data) => {
            this.db = data[0];
            for (index = 0; index < this.db.events.length; ++index) {
              if (this.db.events[index].id === idx) {
                this.db.events[index].imp = !this.db.events[index].imp;
                // tslint:disable-next-line:no-shadowed-variable
                this.dbService.updatePostsibir(this.db).subscribe((data2) => {
                    this.data.sibir = this.sortData(this.db.events);
                  },
                  (error) => {
                    console.error('error');
                  }
                );
              }
            }
          },
          (error) => {
            console.error('error');
          });
        break;
      case 'corpcenter':
        this.dbService.getPostskc().subscribe((data) => {
            this.db = data[0];
            for (index = 0; index < this.db.events.length; ++index) {
              if (this.db.events[index].id === idx) {
                this.db.events[index].imp = !this.db.events[index].imp;
                // tslint:disable-next-line:no-shadowed-variable
                this.dbService.updatePostkc(this.db).subscribe((data2) => {
                    this.data.corpcenter = this.sortData(this.db.events);
                  },
                  (error) => {
                    console.error('error');
                  }
                );
              }
            }
          },
          (error) => {
            console.error('error');
          });
        break;
      default:
        return null;
    }
    return true;
  }

  validatedate(x) {
    let dd;
    let mm;
    let yy;
    for (let i = 0; i < x.length; i++) {
      dd = x[i].slice(0, 2);
      mm = x[i].slice(3, 5);
      yy = x[i].slice(6, 10);
      let date = new Date(yy + '/' + mm + '/' + dd);
      if ((date.getFullYear() === Number(yy) && date.getMonth() + 1 === Number(mm) && date.getDate() === Number(dd)) === false) {
        return false;
      }
    }
    return true;
  }

  create(type, title: any, d: any, db: any) {
    if (this.validatedate(d)) {
      switch (type) {
        case 'volga':
          this.numId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
          const x = this.data.volga;
          x.push({
            id: this.numId,
            name: title,
            days: d
          });
          this.data.volga = x;
          this.data.volga = this.sortData(this.data.volga);
          this.useremail = JSON.parse(localStorage.getItem('loggedUser'));
          this.numE = db.events.length;
          this.eventData = {
            id: this.numId,
            imp: false,
            email: this.useremail.email,
            event: this.numE ? db.events[this.numE - 1].event + 1 : 1,
            name: title,
            days: d
          };
          db.events.push(this.eventData);
          // tslint:disable-next-line:no-shadowed-variable
          this.dbService.updatePostVolga(db).subscribe((data) => {
            },
            (error) => {
              console.error('error');
            }
          );
          break;
        case 'sibir':
          this.numId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
          const y = this.data.sibir;
          y.push({
            id: this.numId,
            name: title,
            days: d
          });
          this.data.sibir = y;
          this.data.sibir = this.sortData(this.data.sibir);
          this.useremail = JSON.parse(localStorage.getItem('loggedUser'));
          this.numE = db.events.length;
          this.eventData = {
            id: this.numId,
            imp: false,
            email: this.useremail.email,
            event: this.numE ? db.events[this.numE - 1].event + 1 : 1,
            name: title,
            days: d
          };
          db.events.push(this.eventData);
          // tslint:disable-next-line:no-shadowed-variable
          this.dbService.updatePostsibir(db).subscribe((data) => {
            },
            (error) => {
              console.error('error');
            }
          );
          break;
        case 'corpcenter':
          this.numId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
          const z = this.data.corpcenter;
          z.push({
            id: this.numId,
            name: title,
            days: d
          });
          this.data.corpcenter = z;
          this.data.corpcenter = this.sortData(this.data.corpcenter);
          this.useremail = JSON.parse(localStorage.getItem('loggedUser'));
          this.numE = db.events.length;
          this.eventData = {
            id: this.numId,
            imp: false,
            email: this.useremail.email,
            event: this.numE ? db.events[this.numE - 1].event + 1 : 1,
            name: title,
            days: d
          };
          db.events.push(this.eventData);
          // tslint:disable-next-line:no-shadowed-variable
          this.dbService.updatePostkc(db).subscribe((data) => {
            },
            (error) => {
              console.error('error');
            }
          );
          break;
        default:
          return null;

      }
      return 'Изменения опубликованы!';
    } else {
      return 'Введите дату правильно';
    }
  }
  sortData(x) {
    return x.sort((a, b) => {
      a = a.days[0];
      b = b.days[0];
      const date1 = new Date(a.slice(6, 10) + '-' + a.slice(3, 5) + '-' + a.slice(0, 2));
      const date2 = new Date(b.slice(6, 10) + '-' + b.slice(3, 5) + '-' + b.slice(0, 2));
      const date3 = new Date();
      return Math.abs(date3.getTime() - date1.getTime()) - Math.abs(date3.getTime() - date2.getTime());
    });
  }
  createaccount(type: string, email: string, password: string, db: any) {
    for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].login === email) {
        if (db.users[i].pass === password) {
          this.user = {
            login: email,
            pass: password
          };
          this.area = type;
          return true;
        } else {
          return 'Такой адрес почты уже зарегистрирован!';
        }
      }
    }
    this.area = type;
    this.user = {
      login: email,
      pass: password
    };
    if (type === 'volga') {
      this.num = db.users.length;
      this.userData = {
        user: this.num ? db.users[this.num - 1].user + 1 : 1,
        login: email,
        pass: password
      };
      db.users.push(this.userData);
      // tslint:disable-next-line:no-shadowed-variable
      this.dbService.updatePostVolga(db).subscribe((data) => {
        },
        (error) => {
          console.error('error');
        }
      );
    }
    if (type === 'sibir') {
      this.num = db.users.length;
      this.userData = {
        user: this.num ? db.users[this.num - 1].user + 1 : 1,
        login: email,
        pass: password
      };
      db.users.push(this.userData);
      // tslint:disable-next-line:no-shadowed-variable
      this.dbService.updatePostsibir(db).subscribe((data) => {
        },
        (error) => {
          console.error('error');
        }
      );
    }
    if (type === 'corpcenter') {
      this.num = db.users.length;
      this.userData = {
        user: this.num ? db.users[this.num - 1].user + 1 : 1,
        login: email,
        pass: password
      };
      db.users.push(this.userData);
      // tslint:disable-next-line:no-shadowed-variable
      this.dbService.updatePostkc(db).subscribe((data) => {
        },
        (error) => {
          console.error('error');
        }
      );
    }
    return true;
  }

  login(type: string, email: string, password: string, db: any) {
    for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].login === email) {
        if (db.users[i].pass === password) {
          this.user = {
            login: email,
            pass: password
          };
          this.area = type;
          return true;
        } else {
          return 'Неправильный пароль';
        }
      }
    }
    return 'Пользователь с такой почтой не существует в данном разделе';
  }
}
