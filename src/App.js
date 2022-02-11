import React, { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadmore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=10"
  );

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

  // console.log(allPokemons);

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");

  //     setPosts(res.data);
  //     setLoading(false);

  //     console.log(posts);
  //   };

  //   fetchPosts();
  // }, []);

  // console.log(posts);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPost = posts.slice(indexOfFirstPost, indexOfFirstPost);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gallery"
          element={<Gallery allPokemons={allPokemons} />}
        />
      </Routes>
    </Router>
  );

  // <Gallery allPokemons={allPokemons} />;
}

export default App;
