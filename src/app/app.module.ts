import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './movie-list/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonEnglishPipe } from './non-english.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    ModalComponent,
    NonEnglishPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
