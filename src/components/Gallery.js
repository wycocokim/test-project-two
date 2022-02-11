import React from "react";
import "./Gallery.css";

const Gallery = ({ allPokemons, totalPosts, postsPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="grid">
        {allPokemons.map((pokemon, index) => {
          if (allPokemons) {
            return (
              <div key={index}>
                <div className="grid-item">
                  <div>
                    <img
                      src={pokemon.sprites.other.dream_world.front_default}
                      alt={pokemon.name}
                    />
                    <div className="name-wrapper">
                      <h3>{pokemon.name}</h3>
                      <h4>{pokemon.types[0].type.name}</h4>
                    </div>
                  </div>
                  <button>save pokemon</button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="pagination-wrapper">
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => {
                  paginate(number);
                }}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
