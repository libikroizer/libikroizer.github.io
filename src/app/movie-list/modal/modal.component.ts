import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MovieService } from '../../movie.service';
import { Movie } from 'src/app/movie.module';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title = '';
  @Input() id: number;
  @Input() editMode = true;
  movieForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              public movieService: MovieService,
              ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let titleMovie = '';
    let yearMovie = '';
    let genreMovie = '';
    let directorMovie = '';
    let runtimeMovie = '';
    let posterUrl = '';

    if (this.editMode === true) {
      const movie = this.movieService.getMovie(this.id);
      titleMovie = movie.Title;
      yearMovie = movie.Year;
      genreMovie = movie.Genre;
      directorMovie = movie.Director;
      runtimeMovie = movie.Runtime;
      posterUrl = movie.Poster;
    }
    this.movieForm = new FormGroup({
      title : new FormControl(titleMovie, [Validators.required, this.isExsits.bind(this)]),
      year : new FormControl(yearMovie),
      genre : new FormControl(genreMovie),
      director : new FormControl(directorMovie, Validators.required),
      runtime : new FormControl(runtimeMovie),
      poster: new FormControl(posterUrl)
    });
  }
  onSubmit(){
    if(this.editMode){
          const updatedMovie = new Movie(
            this.id,
            this.movieForm.value['title'],
            this.movieForm.value['year'],
            this.movieForm.value['runtime'],
            this.movieForm.value['genre'],
            this.movieForm.value['director'],
            this.movieForm.value['poster']);
          this.movieService.updateMovie(this.id, updatedMovie );
          } else {
          this.movieService.AddMovie(
            this.movieService.urlMovies.length,
            this.movieForm.value['title'],
            this.movieForm.value['year'],
            this.movieForm.value['runtime'],
            this.movieForm.value['genre'],
            this.movieForm.value['director'],
            this.movieForm.value['poster']
            );
          }
    this.activeModal.close();
  }
  closeModal(){
      this.activeModal.close();
   }
   isExsits(control: FormControl): {[s: string]: boolean} {
      const arr = this.movieService.movies.map((e) =>  e.Title);
      if(arr.indexOf(control.value) !== -1 ) {
            return {titleIsExists: true};
          }
      return null;
   }

}
