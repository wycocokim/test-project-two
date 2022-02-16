import React from "react";
import { allPokemon } from "../features/pokemonSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favourite = () => {
  const allPokemonsList = useSelector(allPokemon);
  const allPokemons = allPokemonsList.pokemon;

  return (
    <div className="container">
      <Link to="/gallery">
        <button className="button-favourites">go to gallery page</button>
      </Link>
      <div className="grid">
        {allPokemons ? (
          allPokemons.map((pokemon, key) => (
            // return if allPokemons is defined
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
        ) : (
          <h1>no favourites</h1>
        )}
      </div>
    </div>
  );
};

export default Favourite;
