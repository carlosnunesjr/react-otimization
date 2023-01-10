import { useMemo } from "react";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const ratingMedio = useMemo(() => {
    const totalRating = movies.reduce((total, movie) => {
      return total + Number(movie.Ratings[0].Value.split("/")[0]);
    }, 0);

    return totalRating / movies.length;
  }, [movies]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span> ( {movies.length} )
          Rating médio: {ratingMedio.toFixed(2)}
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
