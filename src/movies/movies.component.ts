import { Component, OnInit } from '@angular/core';
import { data } from 'src/assets/data';
import { Movie } from './movies.model';
import { Router } from '@angular/router';


interface options{
  id: number;
  value: string;
}

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  
  data: Movie[] = [];

  options: options[] = [
    { id: 0, value: 'Title' },
    { id: 1, value: 'Release Date' },
  ];

  selectedOption = 'Title';
  selectedOptionId = 0;
  sortIsDown = true;

  constructor(private router:Router){}
  
  ngOnInit(): void {
    this.data = data.sort((a, b) => a.title.localeCompare(b.title));
    const storedIds = JSON.parse(localStorage.getItem('moviesIds') ?? '[]');
    this._getWatchList(storedIds);
  }

  onBtnClick():void{
    this.sortIsDown = this.sortIsDown ? false : true;
    this._sortData();
  }

  onChange(value: options):void{
    this.selectedOptionId = value.id;
    this._sortData();
  }
  
  onAddWatchList(id: number){
    const storedIds = JSON.parse(localStorage.getItem('moviesIds') ?? '[]');
    if(!storedIds.includes(id)){
      storedIds.push(id);
    }
    localStorage.setItem('moviesIds', `${JSON.stringify(storedIds)}`);

    this._getWatchList(storedIds);
  }

  onMovieClick(id: number):void{
    this.router.navigateByUrl(`detail/${id}`)
  }

  private _sortData():void{

    if(this.selectedOptionId === 0){
      this.data = this.sortIsDown ? 
        this.data.sort((a, b) => a.title.localeCompare(b.title)) :
        this.data.sort((a, b) => b.title.localeCompare(a.title))
    }

    if(this.selectedOptionId === 1){
      this.data = this.sortIsDown ? 
        this.data.sort((a, b) => a.releasedDate.localeCompare(b.releasedDate)) :
        this.data.sort((a, b) => b.releasedDate.localeCompare(a.releasedDate))
    }

  }

  private _getWatchList(storedIds: []):void{
    storedIds.forEach((id: number) => {
      const movieToSetWatchList = this.data.find(movie => movie.id === id);
      if(movieToSetWatchList){
        movieToSetWatchList.isWatchlist = true;
      }
      
    });
  }

}


