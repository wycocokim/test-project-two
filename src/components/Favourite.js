import React from "react";
import { allPokemon } from "../features/pokemonSlice";
import { useSelector } from "react-redux";

const Favourite = () => {
  const allPokemons = useSelector(allPokemon);

  return (
    <div className="container">
      <a href="/gallery">
        <button className="button-favourites">go to gallery page</button>
      </a>
      <div className="grid">
        {!allPokemons.pokemon ? (
          <h1>no favourites</h1>
        ) : (
          allPokemons.pokemon.map((pokemon, key) => (
            <div key={key}>
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourite;
