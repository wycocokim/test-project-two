import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemon: [],
  },
  reducers: {
    addPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

export const { addPokemon } = pokemonSlice.actions;

export const allPokemon = (state) => state.pokemon.pokemon;

export default pokemonSlice.reducer;
