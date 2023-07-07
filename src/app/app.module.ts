import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CorpcenterComponent } from './corpcenter/corpcenter.component';
import { HomeComponent } from './home/home.component';
import { SibirComponent } from './sibir/sibir.component';
import { SigninComponent } from './signin/signin.component';
import { VolgaComponent } from './volga/volga.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from './search.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ContactsComponent,
    CorpcenterComponent,
    HomeComponent,
    SibirComponent,
    SigninComponent,
    VolgaComponent,
    SearchPipe
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'signin', component: SigninComponent},
            {path: 'corpcenter', component: CorpcenterComponent},
            {path: 'volga', component: VolgaComponent},
            {path: 'sibir', component: SibirComponent},
            {path: 'home', component: HomeComponent},
            {path: 'contacts', component: ContactsComponent},

        ]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
