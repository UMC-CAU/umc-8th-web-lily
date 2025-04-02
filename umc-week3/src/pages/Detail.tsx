import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
}

export const Detail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [director, setDirector] = useState<Crew | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [detailRes, creditRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTFhNzM4ZDFlZTZlNjc3N2E1OTQ1YTI3OTc5ZDg5MSIsIm5iZiI6MTY4OTkyMjA3NS4yMjEsInN1YiI6IjY0YmEyYTFiMzAwOWFhMDBmZmJmOGJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wVUaA4lW5vsMB_GONHFKqJfMfUWzROmbsT-F9qi0Mbw',
              Accept: 'application/json',
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTFhNzM4ZDFlZTZlNjc3N2E1OTQ1YTI3OTc5ZDg5MSIsIm5iZiI6MTY4OTkyMjA3NS4yMjEsInN1YiI6IjY0YmEyYTFiMzAwOWFhMDBmZmJmOGJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wVUaA4lW5vsMB_GONHFKqJfMfUWzROmbsT-F9qi0Mbw',
              Accept: 'application/json',
            },
          }),
        ]);

        setMovie(detailRes.data);
        setCast(creditRes.data.cast.slice(0, 6)); // 상위 6명만
        const directorInfo = creditRes.data.crew.find((person: Crew) => person.job === 'Director');
        setDirector(directorInfo || null);
      } catch (err) {
        console.error(err);
        setError('영화 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchData();
  }, [movieId]);

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">불러오는 중...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <p className="text-gray-600">{movie.overview}</p>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre: Genre) => (
              <span
                key={genre.id}
                className="text-sm bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">개봉일: {movie.release_date}</p>
          <p className="text-sm text-gray-500">러닝타임: {movie.runtime}분</p>
          <p className="text-sm text-gray-500">평점: {movie.vote_average}</p>
          {director && (
            <p className="text-sm text-gray-500">감독: {director.name}</p>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">출연진</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cast.map((actor) => (
          <div key={actor.id} className="text-center">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg text-sm text-gray-500">
                No Image
              </div>
            )}
            <p className="mt-2 font-medium">{actor.name}</p>
            <p className="text-sm text-gray-500">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
