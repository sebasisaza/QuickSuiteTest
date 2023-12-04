export interface Movie{
    id: number;
    title: string;
    description: string;
    raiting: number;
    duration: string;
    genre: string;
    releasedDate: string;
    trailerLink: string;
    imgUrl: string;
    isWatchlist?: boolean;
}