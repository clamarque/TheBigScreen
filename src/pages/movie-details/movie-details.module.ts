import { DirectivesModule } from './../../directives/directives.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDetailsPage } from './movie-details';

@NgModule({
  declarations: [
    MovieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetailsPage),
    LazyLoadImageModule,
    DirectivesModule
  ],
  exports:[
    MovieDetailsPage
  ],
  providers:[TmdbProvider]
})
export class MovieDetailsModule {}
