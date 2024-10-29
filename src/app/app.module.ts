import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BodyComponent } from './components/body/body.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavbarComponent, BodyComponent],
  imports: [BrowserModule, FormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
