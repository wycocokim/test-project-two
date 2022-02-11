import React from "react";
import "./Gallery.css";

const Gallery = ({ allPokemons }) => {
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
    </div>
  );
};

export default Gallery;
