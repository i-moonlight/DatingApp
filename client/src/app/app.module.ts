import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        AppComponent
    ],
    imports:[
        BrowserModule,
        RouterModule,
        NgModule
    ],
    providers:[]//,
    //bootstrap: [AppComponent]
})
export class AppModule { }