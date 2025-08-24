import React from 'react'

const MovieCard = ({movie}) => {
    return (
        <div className="movie-card">
            <img src={movie["#IMG_POSTER"]} alt={movie["#TITLE"]} />
            <div className="mt-4">
                <h3>{movie["#AKA"]}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon" />
                        <p>Rank: {movie["#RANK"]}</p>
                    </div>
                </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">Actors: {movie["#ACTORS"]}</p>
        </div>
    )
}
export default MovieCard