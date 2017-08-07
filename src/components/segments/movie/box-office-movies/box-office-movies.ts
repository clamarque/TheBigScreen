import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../../../providers/tmdb/tmdb';
import {
  Component,
  Input
} from "@angular/core";
import { Content, NavController } from "ionic-angular";


@Component({
  selector: "component-box-office-movies",
  templateUrl: "box-office-movies.html",
  providers: [TmdbProvider],
})
export class BoxOfficeMovies {
  page: number = 1;
  imageLink: string = "https://image.tmdb.org/t/p/w500/";
  @Input() myContent : Content;
  boxOfficeMovies: object[] = [];
  errorMessage: any = "";

  constructor(private tmdbProvider: TmdbProvider,private navCtrl: NavController) {}

  // Lifecycle
  ngAfterViewInit() {
    this.page = 1;
    this.boxOfficeMovies = [];
    this.getBoxOfficeMovies(this.page);
  }
  ionViewWillEnter() {}

  // REST
  getBoxOfficeMovies(page: number): Promise<any> {
    return new Promise((resolve) => {
      this.tmdbProvider.getNowInTheaterMovies(page).subscribe(result => {
      result.forEach(x => {
        this.boxOfficeMovies.push(x);
      });
      this.page++;
      resolve();
      }, error => (this.errorMessage = <any>error));
    });
    
  }
  getMovieDetails(movie: any) {
    console.log("Movie details for: "+movie.id+" "+movie.title);    
    this.navCtrl.push('MovieDetails',{movie : movie});
  }

  // REST + Animations

  movieWatched(movie: any, event){
    console.log("Movie watched: "+movie.title);
    event.target.style.color = event.target.style.color ? '' : 'red';
    // register and persist data about the user
    
  }
  movieFavorite(movie: any, event){
    console.log("Movie favorited: "+movie.title);  
    event.target.style.color = event.target.style.color ? '' : 'red';
    // register and persist data about the user
  }
  watchMovie(movie: any){
    console.log("Watching movie: "+movie.title);  
    // register and persist data about the user  

  }
  rateMovie(movie: any, event){
    console.log("Rate Movie "+movie.title);
    event.target.parentElement.children[0].style.color = event.target.parentElement.children[0].style.color ? '' : 'red';

    
  }

  // Populate the feed 

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
     this.getBoxOfficeMovies(this.page).then(()=>{
        console.log("Async operation has ended");
        setTimeout(() => {
          infiniteScroll.complete();
        }, 1000);
     });    
  }

}