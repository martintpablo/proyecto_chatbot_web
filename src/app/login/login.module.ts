
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { CoreModule } from "../core/core.module";
import { NgModule } from "@angular/core";

import { LoginPage } from "./login.page";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
})
export class LoginPageModule { }
