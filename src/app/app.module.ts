import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
