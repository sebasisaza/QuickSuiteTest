import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { data } from 'src/assets/data';
import { Movie } from 'src/movies/movies.model';

@Component({
  selector: 'movie-details-root',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{ 

  movie: any;

  constructor(private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer){}

   ngOnInit(): void {

       const movieId = this._activatedRoute.snapshot.paramMap.get('movieId');

       this.movie = data.find(movie => movie.id === Number(movieId)) || undefined;

       this._checkWatchList(this.movie.id);
   }

   getUrlId(url: string): SafeUrl{
    const urlSafe = 'https://www.youtube.com/embed/'+url.split('=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlSafe);
   }

   onAddtoWatchList(id:number):void{
      const storedIds = JSON.parse(localStorage.getItem('moviesIds') ?? '[]');
      if(!storedIds.includes(id)){
        storedIds.push(id);
      }
      localStorage.setItem('moviesIds', `${JSON.stringify(storedIds)}`);

      this._checkWatchList(id)
   }

   private _checkWatchList(movieId: number):void{
    const storedIds = JSON.parse(localStorage.getItem('moviesIds') ?? '[]');

    if(storedIds?.includes(Number(movieId))){

      this.movie = {...this.movie, isWatchlist: true};
      
     }

   }


}


