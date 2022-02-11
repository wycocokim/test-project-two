import React, { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadmore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const getAllPokemon = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadmore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name} `
        );
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
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
              paginate={paginate}
            />
          }
        />
      </Routes>
    </Router>
  );

  // <Gallery allPokemons={allPokemons} />;
}

export default App;
