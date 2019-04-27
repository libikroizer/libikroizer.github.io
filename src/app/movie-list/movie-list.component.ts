import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.module';
import { ModalComponent } from './modal/modal.component';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],

})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  movieModal: Movie;
  movieEmpty: Movie = {id: this.movieService.genId()
    , Title: '', Year: '', Genre: '', Director: '', Poster: '', Runtime: ''};
  id = -1;

  constructor(private movieService: MovieService,
              private modalService: NgbModal) { }
  ngOnInit() {
      this.movieService.getMovies()
      .subscribe(res => {
        for (const movie of res) {
          this.movieService.AddMovie(
              this.id + 1,
              movie.Title,
              movie.Year,
              movie.Runtime,
              movie.Genre,
              movie.Director,
              movie.Poster);
          this.id = this.id + 1;
          this.movies = this.movieService.movies;
        }
      });
   }

  open(movieModal: Movie) {
    this.movieModal = movieModal;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = this.movieModal.Title;
    modalRef.componentInstance.year = this.movieModal.Year;
    modalRef.componentInstance.genre = this.movieModal.Genre;
    modalRef.componentInstance.director = this.movieModal.Director;
    modalRef.componentInstance.id = this.movieModal.id;
    if (movieModal.Title === '') {
      modalRef.componentInstance.editMode = false;
    }
  }
  onDelete(movie: Movie) {
    if (confirm( 'Are you sure you want to delete ' + movie.Title + '?')) {
    this.movieService.deleteMovie(movie.id);
    }
  }






}
