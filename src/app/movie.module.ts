export class Movie{
 public id: number;
 public Title: string;
 public Year: string;
 public Runtime: string;
 public Genre: string;
 public Director: string;
 public Poster: string;


 constructor(id: number, Title: string, Year: string, Runtime: string, Genre: string, Director: string, Poster: string){
   this.id = id;
   this.Title = Title;
   this.Year = Year;
   this.Runtime = Runtime;
   this.Genre = Genre;
   this.Director = Director;
   this.Poster = Poster;
 }
}
