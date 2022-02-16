import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { useDispatch } from "react-redux";
import { addPokemon } from "../features/pokemonSlice";
import { Link } from "react-router-dom";

const Gallery = ({
  allPokemons,
  totalPosts,
  postsPerPage,
  paginate,
  loading,
}) => {
  const [favourites, setFavourites] = useState([]);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const dataList = localStorage.getItem("my-pokemon-list");
    if (dataList) {
      setFavourites(JSON.parse(dataList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my-pokemon-list", JSON.stringify(favourites));
  });

  const dispatch = useDispatch();

  const addFavouritePokemon = (pokemon) => {
    const newFavouriteList = [...favourites, pokemon];

    setFavourites(newFavouriteList);
    dispatch(
      addPokemon({
        pokemon: newFavouriteList,
      })
    );
    alert("pokemon added to favourites");
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/favourites">
        <button className="button-favourites">go to favourites page</button>
      </Link>
      <div className="grid">
        {allPokemons
          ? allPokemons.map((pokemon, index) => (
              //  retrun if allpokemons array are defined
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
                  <button onClick={() => addFavouritePokemon(pokemon)}>
                    save pokemon
                  </button>
                </div>
              </div>
            ))
          : null}
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
