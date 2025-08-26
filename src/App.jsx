import React, {useEffect, useState} from 'react'
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";

const API_BASE_URL = "https://imdb.iamidiotareyoutoo.com";

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");
        if (query === '') return;
        try {
            const endpoint = `${API_BASE_URL}/search?q=${query}`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) throw Error("Failed to fetch movies.");

            const data = await response.json();
            console.log("API response:", data);

            if (!data.ok || !data.description) {
                setErrorMessage("No movies found.");
                setMovieList([]);
                return;
            }

            setMovieList(data.description);

        } catch (e) {
            console.error("Error fetching movies:", e);
            setErrorMessage("Error fetching movies");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    {isLoading ? (
                        <p className="text-white">Loading...</p>
                    ): errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ): (
                        <ul>
                            {movieList.map((movie, index) => (
                                <MovieCard key={movie["#IMDB_ID"] || index} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}

export default App
