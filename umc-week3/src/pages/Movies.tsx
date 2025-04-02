import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Movie } from '../data/movie';
import { useNavigate } from 'react-router-dom';

export const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovies = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTFhNzM4ZDFlZTZlNjc3N2E1OTQ1YTI3OTc5ZDg5MSIsIm5iZiI6MTY4OTkyMjA3NS4yMjEsInN1YiI6IjY0YmEyYTFiMzAwOWFhMDBmZmJmOGJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wVUaA4lW5vsMB_GONHFKqJfMfUWzROmbsT-F9qi0Mbw',
            Accept: 'application/json',
          },
        }
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (err: any) {
      console.error(err);
      setError('에러가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const totalToShow = 5;
    let start = Math.max(1, currentPage - Math.floor(totalToShow / 2));
    let end = start + totalToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - totalToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="p-6">
      {isLoading && (
        <p className="text-center text-gray-500 text-lg">불러오는 중...</p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-6 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative bg-white rounded-xl shadow-md overflow-hidden group"
                onClick={()=>navigate(`${movie.id}/detail`)}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-full h-72 object-cover group-hover:blur-sm transition duration-300"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-300 flex items-center justify-center text-gray-700 text-sm">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center px-4 text-center">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {movie.original_title}
                  </h3>
                  <p className="text-gray-200 text-sm line-clamp-3">
                    {movie.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 UI */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              ←
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? 'bg-yellow-400 text-white font-semibold'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
