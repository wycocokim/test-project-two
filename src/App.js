import React, { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Favourite from "./components/Favourite";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemon = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50").then(
      (res) => res.json()
    );

    function createPokemonObject(result) {
      setLoading(true);
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name} `
        );
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
        setLoading(false);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPokemons.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gallery"
          element={
            <Gallery
              allPokemons={currentPosts}
              postsPerPage={postsPerPage}
              totalPosts={allPokemons.length}
              loading={loading}
              paginate={paginate}
            />
          }
        />
        <Route path="/favourites" element={<Favourite />} />
      </Routes>
    </Router>
  );
}

export default App;
